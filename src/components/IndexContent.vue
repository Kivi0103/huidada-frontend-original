<template>
  <!--  根据个数确定行，每行4个卡片-->
  <div class="test-card-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="6" v-for="card in testCards">
        <el-card style="max-width: 240px" class="test-card">
          <template #header>{{ card.testName }}</template>
          <el-link :underline="false">
            <img
                :src="card.picUrl"
                style="width: 200px"
            />
          </el-link>
          <template #footer>
            <el-row>
              <el-col :span="12">
                <el-link :underline="false">{{ card.userName }}</el-link>
              </el-col>
              <el-col :span=12 justify="start">
                <el-text type="info" size="small">{{ card.createTime }} 创建</el-text>
              </el-col>
            </el-row>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const testCards = [
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
  },
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
  },
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
  },
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
  },
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: '../assets/logo.png',
  },
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: '../assets/logo.png',
  },
  {
    testName: '测试名称',
    userName: '创建人名称',
    createTime: '2022-01-01',
    picUrl: '../assets/logo.png',
  }
]

</script>

<style scoped>
.test-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

.test-card {
  margin-bottom: 10px;
}
</style>