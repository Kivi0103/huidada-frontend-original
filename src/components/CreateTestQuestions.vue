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
        <el-button @click="addOption(qIndex)" type="primary">添加一个选项</el-button>
      </el-form-item>
      <el-button @click="removeQuestion(qIndex)" type="danger">删除题目</el-button>
    </div>
    <el-button @click="addQuestion" type="primary">添加一道题目</el-button>
    <el-button type="primary" @click="submitForm">下一步</el-button>
  </el-form>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import router from "@/router";
import {useTestPaperStore} from "@/stores/testPaperStore";
import {addTestPaperUsingPost} from "@/api/testPaperController";


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

const form = reactive<Form>({
  questions: [{
    questionDesc: '',
    options: [{
      key: 'A',
      optionDesc: '',
      score: 0,
      result: ''
    }]
  }]
});

const testPaperStore = useTestPaperStore();
const testType = ref(testPaperStore.currentCreatingTestPaper.type);

const questionErrors = ref<QuestionErrors[]>([{}]);

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
