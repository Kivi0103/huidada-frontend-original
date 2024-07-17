<template>
  <el-row>
    <el-col :span="12">
      <h2 style="margin-top: 0"> 请选择一道测试题开始测试吧！ </h2>
    </el-col>
    <!--    TODO: 搜索功能-->
    <el-col :offset="6" :span="6">
      <el-pagination background layout="prev, pager, next" :total="totalTests"
                     v-model:current-page="currentPage"
                     v-model:page-size="pageSize"
                     @current-change="getCurrentPageTests"
      />
    </el-col>
  </el-row>
  <!--  根据个数确定行，每行4个卡片-->
  <div class="test-card-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="6" v-for="card in testCards">
          <el-card style="max-width: 240px" class="test-card">
              <template #header>
                {{ card.testName }}
              </template>
              <div @click="handleCardClick(card)">
                <el-link :underline="false">
                  <el-image v-if="card.bgPicture!==''" :src="card.bgPicture" style="width: 200px"/>
                  <el-image v-else style="width: 200px">
                    <template #error>
                      <div class="image-slot">
                        <el-icon>
                          <icon-picture/>
                        </el-icon>
                      </div>
                    </template>
                  </el-image>
                </el-link>
              </div>
            <template #footer>
              <el-row>
                <el-col :span="12">
                  <el-link :underline="false">{{ card.userName }}</el-link>
                </el-col>
                <el-col :span=12 justify="start">
                  <el-text type="info" size="small">{{ card.createTime?.split('T')[0] }} 创建</el-text>
                </el-col>
              </el-row>
            </template>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {Picture as IconPicture} from '@element-plus/icons-vue'
import {getCountUsingGet, listAppVoByPageUsingPost} from "@/api/testPaperController";
import {useTestPaperStore} from "@/stores/testPaperStore";
import router from "@/router";

const testCards = ref<API.TestPaperVO[]>()
const pageSize = ref(8)
const currentPage = ref(1)
const totalTests = ref(0)

// 挂载前调用后端接口请求数据
onBeforeMount(async () => {
  await getCurrentPageTests();
  const response = await getCountUsingGet();
  if (response.data.code === 0) {
    totalTests.value = response.data.data ? response.data.data : 0;
  } else {
    console.log("请求测试总数失败：", response.data.message)
  }
})

const getCurrentPageTests = (async () => {
  const pageQueryRequest = ref<API.TestPaperQueryRequestDTO>({
    pageSize: pageSize.value,
    current: currentPage.value
  })
  const response = await listAppVoByPageUsingPost(pageQueryRequest.value)
  if (response.data.code === 0) {
    testCards.value = response.data.data?.records;
    console.log("首页请求的数据：", testCards.value)
  } else {
    console.log("首页请求失败：", response.data.message)
  }
})

// 点击卡片跳转到测试详情页
const handleCardClick = (test: API.TestPaperVO) => {
  console.log("点击卡片跳转到测试详情页", test)
  useTestPaperStore().currentViewingTestPaper = test;
  router.push('/TestDetails')
}

</script>

<style scoped>
.test-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}


.test-card {
  margin-bottom: 10px;
}

.el-image {
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 100px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.image-slot .el-icon {
  font-size: 30px;
}
</style>