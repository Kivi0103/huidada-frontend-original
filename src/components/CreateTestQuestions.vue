<template>
  <h2> 请填写该测试的所有题目 </h2>
  <el-form :model="form" label-width="100px">
    <div v-for="(question, qIndex) in form.questions" :key="qIndex" class="question-section">
      <el-form-item :label="'题目 ' + (qIndex + 1)" :error="questionErrors[qIndex]?.description">
        <el-input v-model="question.description" placeholder="题目描述"></el-input>
      </el-form-item>
      <el-form-item label="选项">
        <div v-for="(option, oIndex) in question.options" :key="oIndex" class="option-row">
          <el-row :gutter="20">
            <el-col :span="2">
              <el-input v-model="option.key" :readonly="true"></el-input>
            </el-col>
            <el-col :span="6">
              <el-form-item :error="questionErrors[qIndex]?.options?.[oIndex]?.description">
                <el-input v-model="option.description" placeholder="选项描述"></el-input>
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
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from "@/router";

interface OptionItem {
  key: string;
  description: string;
  score?: number | null;
  result?: string | null;
}

interface QuestionItem {
  description: string;
  options: OptionItem[];
}

interface Form {
  questions: QuestionItem[];
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
    description: '',
    options: [{
      key: 'A',
      description: '',
      score: 0,
      result: ''
    }]
  }]
});

const testType = ref<number>(1);

const questionErrors = ref<QuestionErrors[]>([]);

const addQuestion = () => {
  form.questions.push({
    description: '',
    options: []
  });
  questionErrors.value.push({});
};

const removeQuestion = (qIndex: number) => {
  form.questions.splice(qIndex, 1);
  questionErrors.value.splice(qIndex, 1);
};

const addOption = (qIndex: number) => {
  const optionKey = String.fromCharCode(65 + form.questions[qIndex].options.length);  // A, B, C, ...
  form.questions[qIndex].options.push({
    key: optionKey,
    description: '',
    score: testType.value === 0 ? 0 : null,
    result: testType.value === 1 ? '' : null
  });

  if (!questionErrors.value[qIndex].options) {
    questionErrors.value[qIndex].options = [];
  }
  questionErrors.value[qIndex].options!.push({});
};

const removeOption = (qIndex: number, oIndex: number) => {
  form.questions[qIndex].options.splice(oIndex, 1);
  questionErrors.value[qIndex].options!.splice(oIndex, 1);
  // 更新选项键
  form.questions[qIndex].options.forEach((option, index) => {
    option.key = String.fromCharCode(65 + index);
  });
};

const submitForm = () => {
  let hasError = false;
  questionErrors.value = [];
  // 检查题目个数
  if (form.questions.length < 1) {
    ElMessage.error('至少需要一个题目');
    return;
  }else{
    for (let qIndex = 0; qIndex < form.questions.length; qIndex++) {
      const question = form.questions[qIndex];
      const qError: QuestionErrors = {};

      if (!question.description) {
        qError.description = '题目描述不能为空';
        hasError = true;
      }
      if (question.options.length === 0) {
        qError.description = '每个题目至少需要一个选项';
        hasError = true;
      }

      qError.options = [];

      for (let oIndex = 0; oIndex < question.options.length; oIndex++) {
        const option = question.options[oIndex];
        const oError: OptionErrors = {};

        if (!option.description) {
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

    // ElMessage.success('表单提交成功');
    // console.log(form.questions);  // 打印表单数据
    // 提交逻辑
    // 跳转到下一步页面
    router.push('/createTestResults')
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
