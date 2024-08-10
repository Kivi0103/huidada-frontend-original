<template>
  <h2 style="margin-top: 0"> 请填写该测试的所有题目 </h2>
  <el-form :model="form" label-width="100px">
    <div v-for="(question, qIndex) in form.questions" :key="qIndex" class="question-section">
      <el-form-item :label="'题目 ' + (qIndex + 1)" :error="questionErrors[qIndex]?.description">
        <el-input v-model="question.questionDesc" placeholder="题目描述"></el-input>
      </el-form-item>
      <el-form-item label="选项">
        <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-row">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-input v-model="option.key" :readonly="true"></el-input>
            </el-col>
            <el-col :span="6">
              <el-form-item :error="questionErrors[qIndex]?.options?.[oIndex]?.description">
                <el-input v-model="option.optionDesc" placeholder="选项描述"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="testType === 0" style="margin-bottom: 10px">
              <el-form-item :error="questionErrors[qIndex]?.options?.[oIndex]?.score">
                <el-input-number v-model="option.score" :min="0" placeholder="得分"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-else style="margin-bottom: 10px">
              <el-form-item :error="questionErrors[qIndex]?.options?.[oIndex]?.result">
                <el-input v-model="option.result" placeholder="结果"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click="removeOption(qIndex, oIndex)" type="danger">删除该选项</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-button @click="addOption(qIndex)" type="primary">添加一个选项</el-button>
      <el-button @click="removeQuestion(qIndex)" type="danger">删除该题目</el-button>
    </div>
    <el-button @click="addQuestion" type="primary">添加一道题目</el-button>
    <el-button type="success" @click="submitForm">下一步</el-button>
    <el-button type="primary" plain v-if="isAi === 1" @click="drawer = true">使用 AI 生成试题</el-button>
  </el-form>
  <el-drawer
      v-model="drawer"
      title="AI 生成测试题目"
      :direction="direction"
  >
    <el-row>
    <div class="item-content" style="margin-bottom: 10px">
      <el-text>
        测试名称：
      </el-text>
      <el-text class="content">{{ creatingTestPaper.testName }}</el-text>
    </div>
    </el-row>
    <el-row>
      <div class="item-content" style="margin-bottom: 10px">
        <el-text>
          请填写以下必要信息：
        </el-text>
      </div>
    </el-row>
    <el-form-item>
      <el-text>
        题目数：
      </el-text>
      <el-input-number v-model="questionCount" :min="1" placeholder="题目数"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-text>
        每道题选项数：
      </el-text>
      <el-input-number v-model="optionCount" :min="2" placeholder="每道题选项数"></el-input-number>
    </el-form-item>
    <el-button @click="generating" type="primary" :loading="generatingLoading">
      {{ generatingLoading ? '生成中...' : '一键生成' }}
    </el-button>
    <el-button @click="generatingWithSSE" type="primary" :loading="generatingLoading">
      {{ generatingLoading ? '生成中...' : '流式实时生成' }}
    </el-button>
  </el-drawer>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElLoading, ElMessage} from 'element-plus'
import router from "@/router";
import {useTestPaperStore} from "@/stores/testPaperStore";
import {addTestPaperUsingPost, aiGenerateQuestionUsingPost} from "@/api/testPaperController";
import type { DrawerProps } from 'element-plus'


interface Form {
  questions: API.QuestionItem[];
}

interface OptionErrors {
  description?: string;
  score?: string;
  result?: string;
}

interface QuestionErrors {
  description?: string;
  options?: OptionErrors[];
}

const testPaperStore = useTestPaperStore();
const creatingTestPaper = testPaperStore.currentCreatingTestPaper;
const testType = ref(testPaperStore.currentCreatingTestPaper.type);
const isAi = ref(testPaperStore.currentCreatingTestPaper.isAi);
const questionErrors = ref<QuestionErrors[]>([{}]);

const form = reactive<Form>({
  questions: creatingTestPaper.questionContent
});

const addQuestion = () => {
  form.questions.push({
    questionDesc: '',
    options: []
  });
  questionErrors.value.push({});
};

const removeQuestion = (qIndex: number) => {
  form.questions.splice(qIndex, 1);
  questionErrors.value.splice(qIndex, 1);
};

const addOption = (qIndex: number) => {// A, B, C, ...
  const optionKey = String.fromCharCode(65 + (form.questions[qIndex].options?.length || 0));

  form.questions[qIndex].options?.push({
    key: optionKey,
    optionDesc: '',
    score: testType.value === 0 ? 0 : undefined,
    result: testType.value === 1 ? '' : undefined
  });

  if (!questionErrors.value[qIndex].options) {
    questionErrors.value[qIndex].options = [];
  }
  questionErrors.value[qIndex].options!.push({});
};

const removeOption = (qIndex: number, oIndex: number) => {
  form.questions[qIndex].options?.splice(oIndex, 1);
  questionErrors.value[qIndex].options!.splice(oIndex, 1);
  // 更新选项键
  form.questions[qIndex].options?.forEach((option, index) => {
    option.key = String.fromCharCode(65 + index);
  });
};

const submitForm = async () => {
  let hasError = false;
  questionErrors.value = [];
  // 检查题目个数
  if (form.questions.length < 1) {
    ElMessage.error('至少需要一个题目');
    return;
  } else {
    for (let qIndex = 0; qIndex < form.questions.length; qIndex++) {
      const question = form.questions[qIndex];
      const qError: QuestionErrors = {};

      if (!question.questionDesc) {
        qError.description = '题目描述不能为空';
        hasError = true;
      }
      if (question.options?.length === 0) {
        qError.description = '每个题目至少需要一个选项';

        hasError = true;
      }

      qError.options = [];

      for (let oIndex = 0; oIndex < (question.options?.length || 0); oIndex++) {
        const option = question.options![oIndex];
        const oError: OptionErrors = {};
        if (!option.optionDesc) {
          oError.description = '选项描述不能为空';
          hasError = true;
        }
        if (testType.value === 0 && (option.score === null || option.score === undefined)) {
          oError.score = '得分不能为空';
          hasError = true;
        }
        if (testType.value === 1 && (option.result === null || option.result === undefined || option.result === '')) {
          oError.result = '结果不能为空';
          hasError = true;
        }

        qError.options[oIndex] = oError;
      }

      questionErrors.value[qIndex] = qError;
    }

    if (hasError) {
      return;
    }

    // 将表单中的信息存入store中
    testPaperStore.currentCreatingTestPaper.questionContent = form.questions;
    const response = await addTestPaperUsingPost(testPaperStore.currentCreatingTestPaper);
    if (response.data.code === 0) {
      // 成功创建试卷
      ElMessage.success('创建试卷成功');
      // 清空表单
      form.questions = [{
        questionDesc: '',
        options: [{
          key: 'A',
          optionDesc: '',
          score: 0,
          result: ''
        }]
      }];
      questionErrors.value = [{}];
      testPaperStore.currentCreatingTestPaperId = response.data.data;
      // 跳转到编辑试卷页面
      router.push('/createTestResults')
    } else {
      ElMessage.error('创建试卷失败, 请重试');
      router.push('/');
    }
  }

};
const drawer = ref(isAi.value === 1)
const direction = ref<DrawerProps['direction']>('rtl')
const questionCount = ref(1)
const optionCount = ref(2)
const generatingLoading = ref(false)

const generating = async () => {
  generatingLoading.value = true
  const aiGenerateQuestionRequest = ref<API.AiGenerateQuestionRequestDTO>({
    testName: creatingTestPaper.testName,
    description: creatingTestPaper.description,
    type: creatingTestPaper.type,
    questionCount: questionCount.value,
    optionCount: optionCount.value,
  })
  const loadingInstance = ElLoading.service({fullscreen: true, text: 'AI生成试题中，请稍候...'})
  const response = await aiGenerateQuestionUsingPost(aiGenerateQuestionRequest.value);
  loadingInstance.close()
  if(response.data.code === 0) {
    console.log(response.data.data?.questionContent);
    useTestPaperStore().currentCreatingTestPaper.questionContent = response.data.data?.questionContent;
    form.questions = response.data.data?.questionContent;
    ElMessage.success('生成试题成功, 请查看试题内容并自主修改');
    drawer.value = false;
  }else{
    ElMessage.error('生成试题失败!'+response.data.message);
  }
  generatingLoading.value = false
}


/**
 * 提交（实时生成）
 */
const generatingWithSSE = async () => {
  generatingLoading.value = true
  // 创建 SSE 请求
  const eventSource = new EventSource(
      "http://localhost:8101/api/testPaper/ai_generate/sse" +
      `?description=${creatingTestPaper.description}&optionCount=${optionCount.value}&questionCount=${questionCount.value}&testName=${creatingTestPaper.testName}&type=${creatingTestPaper.type}`
  );
  // 接收消息
  eventSource.onmessage = function (event) {
    console.log(event.data)
    const question = JSON.parse(event.data)
    form.questions.push(question);
  };
  // 报错或连接关闭时触发
  eventSource.onerror = function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      eventSource.close();
      ElMessage.success('生成试题成功, 请查看试题内容并自主修改');
      drawer.value = false;
      generatingLoading.value = false;
    } else {
      eventSource.close();
      ElMessage.error('生成试题失败!');
      generatingLoading.value = false;
    }
  };
};
</script>

<style scoped>
.question-section {
  margin-bottom: 20px;
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 5px;
}

.option-row {
  margin-bottom: 10px;
}
</style>
