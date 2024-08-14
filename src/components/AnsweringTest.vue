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
import {onBeforeMount, ref} from 'vue';
import {useTestPaperStore} from "@/stores/testPaperStore";
import {ElLoading, ElMessage} from "element-plus";
import {generateUserAnswerIdUsingGet, submitCustomAnswerUsingPost} from "@/api/userAnswerController";
import {useAnswerStore} from "@/stores/answerStore";
import router from "@/router";
const questions = useTestPaperStore().currentViewingTestPaper.questionContent;
const number = ref(0);
const choices = ref<string[]>([]); // 初始化为空数组

const answerId = ref()

onBeforeMount(async ()=>{
  const response = await generateUserAnswerIdUsingGet();
  if(response.data.code === 0){
    answerId.value = response.data.data
  }
})

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
      // 等待5秒
      const answer = ref<API.CommitUserChoiceRequestDTO>({
        id: answerId.value,
        choices: choices.value,
        scoringStrategyType: useTestPaperStore().currentViewingTestPaper.scoringStrategyType,
        testPaperId: useTestPaperStore().currentViewingTestPaper.id,
        type: useTestPaperStore().currentViewingTestPaper.type
      })
      // 遮掩加载层
      const loadingInstance = ElLoading.service({fullscreen: true, text: '测评中...'})
      const response = await submitCustomAnswerUsingPost(answer.value)
      loadingInstance.close();
      if (response.data.code === 0) {
        ElMessage.success("作答完成！");
        useAnswerStore().viewingAnswer = response.data.data
        await router.push("/OneAnswerShow")
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
