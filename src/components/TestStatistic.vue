<template>
  <el-text size="large" style="margin-left: 80px">热门应用统计</el-text>
  <v-chart :option="testCountOption" :style="{height: '300px'}"></v-chart>
  <el-select
      v-model="selectedTestId"
      placeholder="请选择你要查看的应用"
      size="small"
      style="width: 240px; margin-left: 80px"
      @change="handleSelectChange"
  >
    <el-option
        v-for="item in allCountTests"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <v-chart :option="appAnswerResultCountOptions" style="width:80%; padding-left: 80px"></v-chart>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import {computed, onBeforeMount, ref} from "vue";
import VChart from "vue-echarts";
import "echarts";
import {testCountTop10UsingGet} from "@/api/testPaperController";
import {ElMessage} from "element-plus";
import {userAnswerCuntByTestPaperIdUsingGet} from "@/api/userAnswerController";

onBeforeMount(async () => {
  const response = await testCountTop10UsingGet();
  if(response.data.code === 0){
    console.log("获取统计数据成功：", response.data.data);
    testAnswerCountList.value = response.data.data || [];
    allCountTests.value = response.data.data!.map((item) => {
      return {
        value: item.id,
        label: item.testName,
      };
    });
  } else {
    ElMessage.error("获取数据失败，" + response.data.message);
  }
})
const handleSelectChange = async () => {
  const response = await userAnswerCuntByTestPaperIdUsingGet({
    testPaperId: selectedTestId.value,
  });
  if (response.data.code === 0) {
    console.log("获取应用答案结果分布成功：", response.data.data);
    testAnswerResultCountList.value = response.data.data || [];
  } else {
    ElMessage.error("获取数据失败，" + response.data.message);
  }
}

const testAnswerCountList = ref<API.TestCountVO[]>([]);
const testAnswerResultCountList = ref<API.AppAnswerResultCountVO[]>([]);
const selectedTestId = ref<String>('')
const allCountTests = ref()

const testCountOption = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: "category",
      data: testAnswerCountList.value.map((item) => item.testName),
      name: "应用 id",
    },
    yAxis: {
      type: "value",
      name: "用户答案数",
    },
    series: [
      {
        data: testAnswerCountList.value.map((item) => item.testCount),
        type: "bar",
      },
    ],
  };
});

const appAnswerResultCountOptions = computed(() => {
  return {
    title: {
      text: '应用答案结果分布',
      left: 'center'
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: testAnswerResultCountList.value.map((item) => {
          return { value: item.resultCount, name: item.resultName };
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped>

</style>