<template>
  <div>
    <h2 style="margin-top: 0"> 请填写该测试的所有结果 </h2>
    <div v-for="(form, index) in forms" :key="index" class="form-container">
      <el-form :model="form" :rules="rules">
        <el-form-item :label="'结果'+ (index + 1) +'名称'" prop="resultName">
          <el-input v-model="form.resultName" placeholder="请输入结果名称"></el-input>
        </el-form-item>
        <el-form-item :label="'结果'+ (index + 1) +'描述'" prop="resultDesc">
          <el-input v-model="form.resultDesc" placeholder="请输入结果描述"></el-input>
        </el-form-item>
        <el-form-item :label="'上传结果'+ (index + 1) +'图片'" prop="resultPicture">
          <el-upload
              class="bgPicture-uploader"
              action=""
              :http-request="uploadBgPicture(index)"
              :show-file-list="false"
              :before-upload="beforeBgPictureUpload"
          >
            <img v-if="form.resultPicture" :src="form.resultPicture" class="bgPicture" alt=""/>
            <el-icon v-else class="bgPicture-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item
            v-if="testType === 0"
            label="结果得分范围"
            prop="resultScoreRange"
        >
          <el-input-number v-model.number="form.resultScoreRange" placeholder="请输入结果得分范围"></el-input-number>
        </el-form-item>
        <el-form-item
            v-if="testType === 1"
            label="结果属性集合"
            prop="resultProp"
        >
          <el-input v-model="form.resultProp" placeholder="请输入结果属性集合"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="removeResultForm(index)">删除该结果</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button @click="addResultForm">添加一个结果</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button type="default" @click="checkout">jijdoa</el-button>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElUpload,
  ElMessage, type UploadProps,
} from 'element-plus';
import router from "@/router";
import {Plus} from "@element-plus/icons-vue";
import {useTestPaperStore} from "@/stores/testPaperStore";
import {addScoringResultUsingPost} from "@/api/scoringResultController";
import {uploadFileUsingPost} from "@/api/fileController";

const checkout = () => {
  console.log("checkout:", testPaperStore.currentCreatingTestPaperScoringResults.scoringResults);
  console.log("checkout1111:", forms.value);
};

const testPaperStore = useTestPaperStore();

const testType = ref(testPaperStore.currentCreatingTestPaper.type);

const imgUrl = ref('')

interface CreateTestResultsProps {
  id: string;
  resultName: string;
  resultDesc: string;
  resultPicture: string;
  resultScoreRange: number;
  resultProp: string;
}

const forms = ref<CreateTestResultsProps[]>(useTestPaperStore().currentCreatingTestPaperScoringResults.scoringResults?.map(result=>{
  return {
    id: result.id,
    resultName: result.resultName,
    resultDesc: result.resultDesc,
    resultPicture: result.resultPicture,
    resultScoreRange: result.resultScoreRange,
    resultProp: result.resultProp.join(','),
  }
}));

const rules = {
  resultName: [{ required: true, message: '请输入结果名称', trigger: 'blur' }],
  resultScoreRange: [{ required: true, message: '请输入结果得分范围', trigger: 'blur' }],
  resultProp: [{ required: true, message: '请输入结果属性集合', trigger: 'blur' }],
};

const addResultForm = () => {
  forms.value.push({
    id: null,
    resultName: '',
    resultDesc: '',
    resultPicture: '',
    resultScoreRange: 0,
    resultProp: '',
  });
};

const handleUploadSuccess = (index: number) => {
  forms.value[index].resultPicture = imgUrl.value;
};

const handleTestTypeChange = (index: number) => {
  forms.value[index].resultScoreRange = 0;
  forms.value[index].resultProp = '';
};

const removeResultForm = (index: number) => {
  forms.value.splice(index, 1);
  console.log("删除后的表单：",forms.value);
};

const submitForm = async () => {
  let allValid = true;
  if(forms.value.length === 0){
    ElMessage.error('请至少添加一个结果');
    return;
  }
  for (let i = 0; i < forms.value.length; i++) {
    const form = forms.value[i];
    if (form) {
      const resultName = form.resultName;
      const resultDesc = form.resultDesc;
      const resultPicture = form.resultPicture;
      const resultScoreRange = form.resultScoreRange;
      const resultProp = form.resultProp;
      if (resultName === '')  {
        allValid = false;
        ElMessage.error(`第${i+1}个结果的名称不能为空`);
        break;
      }
      if (testType.value === 0 && (resultScoreRange === null || resultScoreRange === undefined)) {
        allValid = false;
        ElMessage.error(`第${i+1}个结果的得分范围不能为空`);
        break;
      }
      if (testType.value === 1 && (resultProp === '' ||resultProp === null || resultProp === undefined)) {
        allValid = false;
        ElMessage.error(`第${i+1}个结果的属性集合不能为空`);
        break;
      }
    }
  }
  if (allValid) {
    // console.log("提交表单中的数据",forms.value);
    forms.value.forEach((form, index) => {
      const result = {
        id: form.id,
        resultName: form.resultName,
        resultDesc: form.resultDesc,
        resultPicture: form.resultPicture,
        resultScoreRange: testType.value === 0 ? form.resultScoreRange :0,
        resultProp: testType.value === 1 ? form.resultProp.split(',') : [],
      }
      testPaperStore.currentCreatingTestPaperScoringResults.scoringResults!.push(result);
    })
    testPaperStore.currentCreatingTestPaperScoringResults.testPaperId = testPaperStore.currentCreatingTestPaperId;
    console.log("测试结果提交表单中的数据:",testPaperStore.currentCreatingTestPaperScoringResults);
    const response = await addScoringResultUsingPost(testPaperStore.currentCreatingTestPaperScoringResults);
    if(response.data.code === 0){
      ElMessage.success('测试结果提交成功');
    }else{
      ElMessage.error('测试结果提交失败，'+response.data.message);
    }
    // 将表单数据清空
    forms.value = [{
      resultName: '',
      resultDesc: '',
      resultPicture: '',
      resultScoreRange: 0,
      resultProp: '',
    }];
    // store中的数据清空
    testPaperStore.currentCreatingTestPaperScoringResults = {
      scoringResults: [],
      testPaperId: undefined,
    };
    await router.push('/');
  } else {
    ElMessage.error('表单验证失败，请检查输入');
  }
};

// 文件上传函数
const uploadBgPicture = (index) => async ({ file, onSuccess, onError }) => {
  try {
    const params = <API.uploadFileUsingPOSTParams>({biz: 'app_icon'}); // 根据需要设置请求参数
    const body = {}; // 根据需要设置请求体内容
    const options = {}; // 根据需要设置其他选项

    const response = await uploadFileUsingPost(params, body, file, options);
    console.log("上传照片返回的数据：", response.data)
    if (response.data.code === 0) {
      forms.value[index].resultPicture = response.data.data
      onSuccess(response.data);
      ElMessage.success('图片上传成功');
    }
  } catch (error) {
    onError(error);
    ElMessage.error('图片上传失败');
  }
};

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
.form-container {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
}
.picture-uploader .picture {
  width: 100px;
  height: 100px;
  display: block;
}

.bgPicture-uploader .bgPicture {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.picture-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.picture-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.picture-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
