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
import {submitCustomAnswerUsingPost} from "@/api/userAnswerController";
import {all} from "axios";
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

const nextQuestion = async () => {
  if (number.value < questions!.length - 1) {
    number.value++;
  } else {
    // 检查是否每道题都作答了
    let allAnswered = true;
    console.log("选择的所有答案:"+choices.value.length)
    if(choices.value.length < questions!.length){
      allAnswered = false;
      ElMessage.warning('请先作答所有题目');
    }
    // 若每道题都作答了，则提交答案
    if (allAnswered) {
      const answer = ref<API.CommitUserChoiceRequestDTO>({
        choices: choices.value,
        scoringStrategyType: useTestPaperStore().currentViewingTestPaper.scoringStrategyType,
        testPaperId: useTestPaperStore().currentViewingTestPaper.id,
        type: useTestPaperStore().currentViewingTestPaper.type
      })
      const response = await submitCustomAnswerUsingPost(answer.value)
      if (response.data.code === 0) {
        if(answer.value.type === 0){
          ElMessage.success('提交成功，你的得分为：'+response.data.data!.score);
        }
        ElMessage.success('被评为：'+response.data.data!.resultName+"，"+response.data.data!.resultDesc);
        console.log(response.data.data)
      }else{
        ElMessage.error("答案提交失败"+response.data.message);
      }
    }
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
