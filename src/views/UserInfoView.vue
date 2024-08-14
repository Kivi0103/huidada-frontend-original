<template>
  <el-row>
    <el-tooltip content="修改头像" placement="bottom" effect="light">
      <el-upload
          class="bgPicture-uploader"
          action=""
          :http-request="uploadBgPicture"
          :show-file-list="false"
          :before-upload="beforeBgPictureUpload"
      >
        <img v-if="loginUser.headPicture" :src="loginUser.headPicture" class="bgPicture" alt=""/>
        <el-icon v-else class="bgPicture-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-tooltip>
    <el-tooltip v-if="!ifModifyUserName" content="修改用户名" placement="bottom" effect="light" >
      <el-link :underline="false" style="margin-left: 20px;font-size: 16px" @click="ifModifyUserName = true">
        用户名：{{ loginUser.userName }}
      </el-link>
    </el-tooltip>
    <el-form v-else>
      <el-row style="margin-left: 20px; width: 300px;height: 30px;margin-top: 10px;">
        <el-form-item :error="userNameError">
          <el-input v-model="newUserName"
                    @input="validateUserName">
          </el-input>
        </el-form-item>
        <el-button @click="commitModifyUserName" type="primary">确认修改</el-button>
      </el-row>
    </el-form>
    <el-tooltip content="修改密码" placement="right">
      <el-button type="primary" plain style="margin-top: 35px;margin-left: 20px" @click="showModifyPasswordDialog">
        修改密码
      </el-button>
    </el-tooltip>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-col :span="12">
      <h3 style="margin-top: 0"> 我创建的测试 </h3>
    </el-col>
    <el-col :offset="6" :span="6">
      <el-pagination background layout="prev, pager, next" :total="totalTests"
                     v-model:current-page="currentPage"
                     v-model:page-size="pageSize"
                     @current-change="getCurrentPageTests"
      />
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="myTests" style="width: 100%" stripe border row-key="id">
      <el-table-column prop="testName" label="测试名称" sortable width="120" show-overflow-tooltip/>
      <el-table-column prop="description" label="测试描述" width="150" show-overflow-tooltip/>
      <el-table-column prop="questionContent" label="题目内容" width="150" show-overflow-tooltip/>
      <el-table-column prop="type" label="测试类型" width="100"/>
      <el-table-column prop="isAi" label="题目类型" width="100"/>
      <el-table-column prop="scoringStrategyType" label="评分策略" width="100"/>
      <el-table-column prop="createTime" label="创建时间" sortable width="120" show-overflow-tooltip/>
      <el-table-column prop="updateTime" label="修改时间" sortable width="120" show-overflow-tooltip/>
      <el-table-column prop="reviewStatus" label="审核状态" width="100"/>
      <el-table-column label="操作" min-width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="modifyTest(scope.row.id)">
            修改
          </el-button>
          <el-button link type="primary" size="small" @click="deleteTest(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
  <el-row style="margin-top: 20px">
    <el-col :span="12">
      <h3 style="margin-top: 0"> 我的作答记录 </h3>
    </el-col>
    <el-col :offset="6" :span="6">
      <el-pagination background layout="prev, pager, next" :total="totalAnswers"
                     v-model:current-page="currentAnswerPage"
                     v-model:page-size="pageSize"
                     @current-change="getCurrentPageAnswers"
      />
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="myAnswers" style="width: 100%" stripe border>
      <el-table-column prop="resultName" label="结果名称" width="120" show-overflow-tooltip/>
      <el-table-column prop="resultDesc" label="结果描述" width="150" show-overflow-tooltip/>
      <el-table-column prop="score" label="得分" width="100" show-overflow-tooltip/>
      <el-table-column prop="testName" label="测试名称" width="120" show-overflow-tooltip/>
      <el-table-column prop="description" label="测试描述" width="150" show-overflow-tooltip/>
      <el-table-column prop="questionContent" label="题目内容" width="150" show-overflow-tooltip/>
      <el-table-column prop="choices" label="我的答案" width="100" show-overflow-tooltip/>
      <el-table-column prop="type" label="题目类型" width="100"/>
      <el-table-column prop="scoringStrategyType" label="评分策略" width="100"/>
      <el-table-column prop="createTime" label="做答时间" width="120" show-overflow-tooltip sortable/>
    </el-table>
  </el-row>
  <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
    <el-form :model="modifyPasswordForm">
      <el-form-item label="原密码" label-width="140px">
        <el-input type="password" show-password v-model="modifyPasswordForm.oldPassword" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" label-width="140px" :error="passwordError">
        <el-input type="password" show-password v-model="modifyPasswordForm.newPassword" @input="validatePassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" label-width="140px" :error="checkPasswordError">
        <el-input type="password" show-password v-model="modifyPasswordForm.confirmPassword" @input="validateCheckPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="commitModifyPassword">
          确认修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { onBeforeMount, ref, watch } from "vue";
import {
  deleteTestPaperUsingPost,
  getTestPaperByIdUsingPost,
  getTestPaperCountUsingPost,
  listAppVoByPageUsingPost
} from "@/api/testPaperController";
import { getUserAnswerCountUsingPost, listUserAnswerVoByPageUsingPost } from "@/api/userAnswerController";
import {
  updateHeadPictureUsingPost,
  userUpdatePasswordUsingPost,
  userUpdateUserNameUsingPost
} from "@/api/userController";
import router from "@/router";
import {ElMessage, type UploadProps} from "element-plus";
import {useTestPaperStore} from "@/stores/testPaperStore";
import {listByTestId} from "@/api/scoringResultController";
import {Plus} from "@element-plus/icons-vue";
import {uploadFileUsingPost} from "@/api/fileController";

const loginUser = useUserStore().loginUser;
const myTests = ref();
const pageSize = ref(4);
const currentPage = ref(1);
const totalTests = ref(0);

onBeforeMount(async () => {
  await getCurrentPageTests();
  await getCurrentPageAnswers();
});

const getCurrentPageTests = async () => {
  console.log("当前主页的用户id：",loginUser.id)
  const pageQueryRequest = ref<API.TestPaperQueryRequestDTO>({
    pageSize: pageSize.value,
    current: currentPage.value,
    userId: loginUser.id,
    reviewStatus: 1,
  });
  const response = await listAppVoByPageUsingPost(pageQueryRequest.value);
  if (response.data.code === 0) {
    transFormat(response.data.data?.records);
    console.log("首页请求的数据：", myTests.value);
    const getCountRequest = ref<API.TestPaperQueryRequestDTO>({
      reviewStatus: 1,
    });
    const countResponse = await getTestPaperCountUsingPost(getCountRequest.value);
    if (countResponse.data.code === 0) {
      totalTests.value = countResponse.data.data ? countResponse.data.data : 0;
    } else {
      console.log("请求测试总数失败：", countResponse.data.message);
    }
  } else {
    console.log("首页请求失败：", response.data.message);
  }
};

const transFormat = (testPaperVoList: API.TestPaperVO[]) => {
  myTests.value = testPaperVoList.map((testPaperVo) => {
    return {
      id: testPaperVo.id,
      testName: testPaperVo.testName,
      description: testPaperVo.description,
      questionContent: JSON.stringify(testPaperVo.questionContent),
      type: testPaperVo.type === 0 ? "打分类" : "测评类",
      isAi: testPaperVo.isAi === 0 ? "自定义" : "AI",
      scoringStrategyType: testPaperVo.scoringStrategyType === 0 ? "自定义" : "AI",
      createTime: testPaperVo.createTime!.split('T')[0] + ' ' + testPaperVo.createTime!.split('T')[1].split('.')[0],
      updateTime: testPaperVo.updateTime!.split('T')[0] + ' ' + testPaperVo.updateTime!.split('T')[1].split('.')[0],
      reviewStatus: testPaperVo.reviewStatus === 0 ? "待审核" : testPaperVo.reviewStatus === 1 ? "通过" : "未通过"+testPaperVo.reviewMessage,
    };
  });
};

const myAnswers = ref();
const totalAnswers = ref(0);
const currentAnswerPage = ref(1);

const getCurrentPageAnswers = async () => {
  const answerQueryRequest = ref<API.UserAnswerQueryRequestDTO>({
    pageSize: pageSize.value,
    current: currentAnswerPage.value,
    userId: loginUser?.id?.toString(),
    sortField: "createTime",
  });
  const response = await listUserAnswerVoByPageUsingPost(answerQueryRequest.value);
  if (response.data.code === 0) {
    transFormatAnswers(response.data.data?.records);
    console.log("请求到的用户", myAnswers.value);
    const getCountRequest = ref<API.UserAnswerQueryRequestDTO>({
      userId: loginUser?.id?.toString(),
    });
    const countResponse = await getUserAnswerCountUsingPost(getCountRequest.value);
    if (countResponse.data.code === 0) {
      totalAnswers.value = countResponse.data.data ? countResponse.data.data : 0;
      console.log("请求到的总数", totalAnswers.value);
    } else {
      console.log("请求测试总数失败：", countResponse.data.message);
    }
  }
};

const transFormatAnswers = (userAnswerVoList: API.UserAnswerVO[]) => {
  myAnswers.value = userAnswerVoList.map((userAnswerVo) => {
    return {
      id: userAnswerVo.id,
      resultName: userAnswerVo.resultName,
      resultDesc: userAnswerVo.resultDesc,
      score: userAnswerVo.score === null ? "无" : userAnswerVo.score,
      choices: userAnswerVo.choices,
      createTime: userAnswerVo.createTime!.split('T')[0] + ' ' + userAnswerVo.createTime!.split('T')[1].split('.')[0],
      testName: userAnswerVo.testPaperName,
      description: userAnswerVo.testDesc,
      questionContent: userAnswerVo.questionContent,
      type: userAnswerVo.testPaperType === 0 ? "打分类" : "测评类",
      scoringStrategyType: userAnswerVo.scoringStrategyType === 0 ? "自定义" : "AI",
    };
  });
};

const dialogFormVisible = ref(false);
const modifyPasswordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const passwordMismatch = ref(false);
const passwordError = ref('');
const checkPasswordError = ref('');

const showModifyPasswordDialog = () => {
  dialogFormVisible.value = true;
  modifyPasswordForm.value.oldPassword = "";
  modifyPasswordForm.value.newPassword = "";
  modifyPasswordForm.value.confirmPassword = "";
};

const validatePassword = () => {
  const passwordValue = modifyPasswordForm.value.newPassword;
  if (passwordValue.length < 8 || passwordValue.length > 20) {
    passwordError.value = '密码长度必须在8-20个字符之间';
  } else if (!(/[a-zA-Z]/.test(passwordValue) && /\d/.test(passwordValue))) {
    passwordError.value = '密码必须同时含有数字和字母';
  } else {
    passwordError.value = '';
  }
};

const validateCheckPassword = () => {
  if (modifyPasswordForm.value.confirmPassword !== modifyPasswordForm.value.newPassword) {
    checkPasswordError.value = '两次输入的密码不一致';
  } else {
    checkPasswordError.value = '';
  }
};

const commitModifyPassword = async () => {
  validatePassword();
  validateCheckPassword();
  if (passwordError.value === '' && checkPasswordError.value === '') {
    const userUpdateRequest = ref<API.UserUpdateRequestDTO>({
      id: loginUser.id.toString(),
      newPassword: modifyPasswordForm.value.newPassword,
      oldPassword: modifyPasswordForm.value.oldPassword,
    })
    const response = await userUpdatePasswordUsingPost(userUpdateRequest.value);
    if (response.data.code === 0) {
      dialogFormVisible.value = false;
      // 回到首页并刷新页面
      await router.push("/");
      // 利用element-ui的提示组件显示成功信息
      ElMessage.success("修改密码成功！请重新登录！")
      window.location.reload();
    }else{
      alert("修改密码失败：" + response.data.message);
    }
  }
};

const userNameError = ref('');
const ifModifyUserName = ref(false);
const newUserName = ref(loginUser.userName);

const validateUserName = () => {
  const userNameValue = newUserName.value;
  if (userNameValue!.length < 5 || userNameValue!.length > 20) {
    userNameError.value = '账号长度必须在5-20个字符之间';
  } else if (/^\d+$/.test(<string>userNameValue)) {
    userNameError.value = '账号不能只含有数字';
  } else {
    userNameError.value = '';
  }
};

const commitModifyUserName = async () => {
  validateUserName();
  if (userNameError.value === '') {
    const userUpdateRequest = ref<API.UserUpdateRequestDTO>({
      id: loginUser.id.toString(),
      userName: newUserName.value,
    })
    const response = await userUpdateUserNameUsingPost(userUpdateRequest.value);
    if (response.data.code === 0) {
      ifModifyUserName.value = false;
      loginUser.userName = newUserName.value;
      // 回到首页并刷新页面
      await router.push("/");
      ElMessage.success("修改用户名成功！请重新登录")
      window.location.reload();
      ifModifyUserName.value = false;
    }else{
      alert("修改用户名失败：" + response.data.message);
    }
  }
};

const modifyTest =async (id: string) => {
  console.log("修改测试的id为：", id);
  const response = await getTestPaperByIdUsingPost({id:id})
  if (response.data.code === 0) {
    const testPaper = response.data.data;
    console.log("根据id查询到的", testPaper);
    useTestPaperStore().currentCreatingTestPaper.bgPicture = testPaper.bgPicture;
    useTestPaperStore().currentCreatingTestPaper.description = testPaper.description;
    useTestPaperStore().currentCreatingTestPaper.testName = testPaper.testName;
    useTestPaperStore().currentCreatingTestPaper.questionContent = testPaper.questionContent;
    useTestPaperStore().currentCreatingTestPaper.type = testPaper.type;
    useTestPaperStore().currentCreatingTestPaper.isAi = testPaper.isAi;
    useTestPaperStore().currentCreatingTestPaper.scoringStrategyType = testPaper.scoringStrategyType;
    useTestPaperStore().currentCreatingTestPaper.id = testPaper.id;
    useTestPaperStore().currentCreatingTestPaperId = testPaper.id;
    const response2 = await listByTestId({testId: testPaper.id});
    if (response2.data.code === 0) {
      console.log("根据测试id查询得分结果", response2.data.data);
      useTestPaperStore().currentCreatingTestPaperScoringResults = response2.data.data;
    }else{
      alert("评分策略查询失败：" + response2.data.message);
    }
    await router.push("/CreateTestBasicInfo");
  }else{
    alert("根据id查询测试失败：" + response.data.message);
  }
}

const deleteTest = async (id: string) => {
  const response = await deleteTestPaperUsingPost({id:id})
  if (response.data.code === 0) {
    ElMessage.success("删除测试成功！")
    // 重新请求当前页测试
    await getCurrentPageTests();
  }else{
    alert("删除测试失败：" + response.data.message);
  }
}

// 文件上传函数
const uploadBgPicture = async ({ file, onSuccess, onError }) => {
  try {
    const params = <API.uploadFileUsingPOSTParams>({biz: 'user_avatar'}); // 根据需要设置请求参数
    const body = {}; // 根据需要设置请求体内容
    const options = {}; // 根据需要设置其他选项

    const response = await uploadFileUsingPost(params, body, file, options);
    console.log("上传照片返回的数据：", response.data)
    if (response.data.code === 0) {
      loginUser.headPicture =response.data.data
      const userUpdateRequest = ref<API.UserUpdateRequestDTO>({
        id: loginUser.id.toString(),
        headPicture: loginUser.headPicture,
      })
      const response1 = await updateHeadPictureUsingPost(userUpdateRequest.value);
      if (response1.data.code === 0) {
        onSuccess(response.data);
        ElMessage.success('头像上传成功');
      }
    }
  } catch (error) {
    onError(error);
    ElMessage.error('头像上传失败');
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
.el-icon {
  margin-left: 10px;
}

.el-icon:hover {
  cursor: pointer;
}

.bgPicture-uploader .bgPicture {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
