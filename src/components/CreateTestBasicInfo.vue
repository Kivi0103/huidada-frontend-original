<template>
  <h2 style="margin-top: 0"> 请填写测试的基本信息 </h2>
  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
  >
    <el-form-item label="测试名称" prop="testName">
      <el-input v-model="ruleForm.testName"/>
    </el-form-item>
    <el-form-item label="测试描述" prop="description">
      <el-input v-model="ruleForm.description" type="textarea"/>
    </el-form-item>
    <el-form-item label="封面图片" prop="bgPicture">
      <el-upload
          class="bgPicture-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleBgPictureSuccess"
          :before-upload="beforeBgPictureUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="bgPicture" alt=""/>
        <el-icon v-else class="bgPicture-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="测评类型" prop="type">
      <el-radio-group v-model="ruleForm.type">
        <el-radio :value="0">打分类</el-radio>
        <el-radio :value="1">测评类</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="评分策略" prop="scoringStrategy">
      <el-radio-group v-model="ruleForm.scoringStrategy">
        <el-radio :value="0">自定义</el-radio>
        <el-radio :value="1">AI评测</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="题目是否AI生成" prop="isAi">
      <el-radio-group v-model="ruleForm.isAi">
        <el-radio :value="0">自定义</el-radio>
        <el-radio :value="1">AI生成</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="nextStep(ruleFormRef)">
        下一步
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'
import {type ComponentSize, ElMessage, type FormInstance, type FormRules, type UploadProps} from 'element-plus'
import router from "@/router";
import {useTestPaperStore} from "@/stores/testPaperStore";

interface RuleForm {
  testName: string,
  description: string,
  bgPicture: string,
  type: number,
  scoringStrategy: number,
  isAi: number
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  testName: '',
  description: '',
  bgPicture: '',
  type: 0,
  scoringStrategy: 0,
  isAi: 0
})


const rules = reactive<FormRules<RuleForm>>({
  testName: [
    {required: true, message: '请输入测试名称', trigger: 'blur'},
    {min: 3, max: 20, message: '名称长度在 3 到 20 个汉字', trigger: 'blur'},
  ],
  description: [
    {
      required: true,
      message: '请输入测试描述',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: '请选择测试类型',
      trigger: 'change',
    },
  ],
  scoringStrategy: [
    {
      required: true,
      message: '请选择评分策略',
      trigger: 'change',
    },
  ],
  isAi: [
    {
      required: true,
      message: '请选择是否使用AI生成测试',
      trigger: 'change',
    },
  ],
})

const nextStep = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
        const testPaperStore = useTestPaperStore();
        testPaperStore.currentCreatingTestPaper.testName = ruleForm.testName
        testPaperStore.currentCreatingTestPaper.description = ruleForm.description
        testPaperStore.currentCreatingTestPaper.bgPicture = ruleForm.bgPicture
        testPaperStore.currentCreatingTestPaper.type = ruleForm.type
        testPaperStore.currentCreatingTestPaper.scoringStrategyType = ruleForm.scoringStrategy
        testPaperStore.currentCreatingTestPaper.isAi = ruleForm.isAi
        await router.push('/CreateTestQuestions')
    } else {
      console.log('error submit!', fields)
    }
  })

  // TODO 此为测试临时代码，待等后续页面开发好后删除此处代码
  // if (true) {
  //   await router.push('/CreateTestQuestions')
  // }

}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const imageUrl = ref('')

const handleBgPictureSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeBgPictureUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片格式必须是 JPG 或 PNG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}
</script>

<style scoped>
.bgPicture-uploader .bgPicture {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.bgPicture-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.bgPicture-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.bgPicture-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
