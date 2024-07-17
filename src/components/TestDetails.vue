<template>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        测试名称：
      </el-text>
      <el-text class="content">{{ viewingTest.testName }}</el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        测试详细描述：
      </el-text>
        <el-text >{{ viewingTest.description }}</el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        创建人：
      </el-text>
      <el-text>
        {{ viewingTest.userName }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        最近修改时间：
      </el-text>
      <el-text>
        {{ viewingTest.updateTime?.split('T')[0] }} {{ viewingTest.updateTime?.split('T')[1].split('.')[0] }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        首次创建时间：
      </el-text>
      <el-text>
        {{ viewingTest.createTime?.split('T')[0] }} {{ viewingTest.createTime?.split('T')[1].split('.')[0] }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        结果是否由AI生成:
      </el-text>
        <el-text v-if="viewingTest.scoringStrategyType=== 1"> 是</el-text>
        <el-text v-else> 否（由测试创建者自定义）</el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        题目是否由AI生成:
      </el-text>
        <el-text v-if="viewingTest.isAi">是</el-text>
        <el-text v-else>否（由测试创建者自定义）</el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        题目数量：
      </el-text>
      <el-text>
        {{ viewingTest.questionContent?.length }}
      </el-text>
    </div>
  </el-row>
  <el-row>
    <div class="item-content">
      <el-text class="title" size="large">
        题目类型：
      </el-text>
        <el-text v-if="viewingTest.type===0">打分类</el-text>
        <el-text v-else>测评类</el-text>
    </div>
  </el-row>
  <el-row>
    <el-button type="primary" @click="router.push('/AnsweringTest')">开始测试</el-button>
  </el-row>
</template>
<script setup lang="ts">
import {useTestPaperStore} from "@/stores/testPaperStore";
import router from "@/router";

const viewingTest = useTestPaperStore().currentViewingTestPaper;

</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>