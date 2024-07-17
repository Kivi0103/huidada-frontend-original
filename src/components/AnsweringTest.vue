<template>
  <div class="question-page">
    <el-card>
      <div class="question-container">
        <h2>{{ number + 1 }}. {{ questions![number].questionDesc }}</h2>
        <div v-for="(option, index) in questions![number].options" :key="index" class="option-container">
          <el-radio v-model="choices[number]" :label="option.key">{{ option.key }}. {{ option.optionDesc }}</el-radio>
        </div>
        <div class="mb-4">
          <el-button v-if="number >= 0" type="primary" @click="beforeQuestion">上一题</el-button>
          <el-button v-if="number < questions!.length - 1" type="primary" @click="nextQuestion">下一题</el-button>
          <el-button v-else type="primary" @click="nextQuestion">提交答案</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useTestPaperStore} from "@/stores/testPaperStore";
import {ElMessage} from "element-plus";
const questions = useTestPaperStore().currentViewingTestPaper.questionContent;
const number = ref(0);
const choices = ref<string[]>([]); // 初始化为空数组

const beforeQuestion = () => {
  if (number.value > 0) {
    number.value--;
  }else{
    ElMessage.warning('已经是第一题了');
  }
}

const nextQuestion = () => {
  if (number.value < questions!.length - 1) {
    number.value++;
  } else {
    // TODO: 提交答案
    ElMessage.success('答卷提交成功: ' + choices.value.toString());
  }
}
</script>

<style scoped>
.question-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.el-card {
  padding: 20px;
  width: 100%;
}

.question-container {
  display: flex;
  flex-direction: column;
}

.option-container {
  margin: 10px 0;
}
</style>
