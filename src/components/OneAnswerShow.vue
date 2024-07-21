<template>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        测试名称：
      </el-text>
      <el-text class="content">{{ currentViewingTestPaper.testName }}</el-text>
    </div>
  </el-row>
  <el-row v-if="currentViewingTestPaper.type === 0 && currentViewingTestPaper.scoringStrategyType === 0">
    <div class="item-content">
      <el-text class="title" size="large">
        该测试得分：
      </el-text>
      <el-text >{{ viewingAnswer.score }}</el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        结果名称：
      </el-text>
      <el-text >{{ viewingAnswer.resultName }}</el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        结果描述：
      </el-text>
      <el-text >
        {{ viewingAnswer.resultDesc===""?"暂无":viewingAnswer.resultDesc }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        作答人：
      </el-text>
      <el-text>
        {{ loginUser.userName }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        作答时间：
      </el-text>
      <el-text>
        {{ viewingAnswer.createTime?.split('T')[0] }} {{ viewingAnswer.createTime?.split('T')[1].split('.')[0] }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        结果是否由AI生成:
      </el-text>
      <el-text v-if="currentViewingTestPaper.scoringStrategyType=== 1"> 是</el-text>
      <el-text v-else> 否（由测试创建者自定义）</el-text>
    </div>
  </el-row>
  <el-row>
    <el-button type="primary" @click="router.push('/')">回到首页</el-button>
  </el-row>
</template>
<script setup lang="ts">

import {useAnswerStore} from "@/stores/answerStore";
import router from "@/router";
import {useTestPaperStore} from "@/stores/testPaperStore";
import {useUserStore} from "@/stores/userStore";

const viewingAnswer = useAnswerStore().viewingAnswer;
const currentViewingTestPaper = useTestPaperStore().currentViewingTestPaper;
const loginUser = useUserStore().loginUser;

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

</style>