declare namespace API {
  type AiGenerateQuestionRequestDTO = {
    description?: string;
    optionCount?: number;
    questionCount?: number;
    testName?: string;
    type?: number;
  };

  type aiGenerateQuestionSSEUsingGETParams = {
    description?: string;
    optionCount?: number;
    questionCount?: number;
    testName?: string;
    type?: number;
  };

  type AppAnswerResultCountVO = {
    resultCount?: string;
    resultName?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListAppAnswerResultCountVO_ = {
    code?: number;
    data?: AppAnswerResultCountVO[];
    message?: string;
  };

  type BaseResponseListTestCountVO_ = {
    code?: number;
    data?: TestCountVO[];
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageTestPaperVO_ = {
    code?: number;
    data?: PageTestPaperVO_;
    message?: string;
  };

  type BaseResponsePageUserAnswerVO_ = {
    code?: number;
    data?: PageUserAnswerVO_;
    message?: string;
  };

  type BaseResponseQuestionContentVO_ = {
    code?: number;
    data?: QuestionContentVO;
    message?: string;
  };

  type BaseResponseScoringResultAddRequestDTO_ = {
    code?: number;
    data?: ScoringResultAddRequestDTO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseTestPaperVO_ = {
    code?: number;
    data?: TestPaperVO;
    message?: string;
  };

  type BaseResponseTestResultVO_ = {
    code?: number;
    data?: TestResultVO;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type CommitUserChoiceRequestDTO = {
    choices?: string[];
    id?: number;
    scoringStrategyType?: number;
    testPaperId?: number;
    type?: number;
  };

  type DeleteTestPaperDTO = {
    id?: number;
  };

  type GetScoringResultByIdRequestDTO = {
    testId?: number;
  };

  type GetTestPaperByIdDTO = {
    id?: number;
  };

  type Option = {
    key?: string;
    optionDesc?: string;
    result?: string;
    score?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageTestPaperVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: TestPaperVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserAnswerVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserAnswerVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type QuestionContentVO = {
    questionContent?: QuestionItem[];
    testPaperId?: number;
  };

  type QuestionItem = {
    options?: Option[];
    questionDesc?: string;
  };

  type ScoringResultAddRequestDTO = {
    scoringResults?: ScoringResultItem[];
    testPaperId?: number;
  };

  type ScoringResultItem = {
    id?: number;
    resultDesc?: string;
    resultName?: string;
    resultPicture?: string;
    resultProp?: string[];
    resultScoreRange?: number;
  };

  type SseEmitter = {
    timeout?: number;
  };

  type TestCountVO = {
    id?: number;
    testCount?: number;
    testName?: string;
  };

  type TestPaperAddRequestDTO = {
    bgPicture?: string;
    description?: string;
    id?: number;
    isAi?: number;
    questionContent?: QuestionItem[];
    scoringStrategyType?: number;
    testName?: string;
    type?: number;
  };

  type TestPaperQueryRequestDTO = {
    current?: number;
    description?: string;
    id?: number;
    isAi?: number;
    pageSize?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    scoringStrategyType?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    testName?: string;
    type?: number;
    userId?: number;
  };

  type TestPaperUpdateRequestDTO = {
    bgPicture?: string;
    description?: string;
    id?: number;
    isAi?: number;
    isDelete?: number;
    questionContent?: QuestionItem[];
    scoringStrategyType?: number;
    testName?: string;
    type?: number;
  };

  type TestPaperVO = {
    bgPicture?: string;
    createTime?: string;
    description?: string;
    id?: number;
    isAi?: number;
    isDelete?: number;
    questionContent?: QuestionItem[];
    reviewMessage?: string;
    reviewStatus?: number;
    scoringStrategyType?: number;
    testName?: string;
    type?: number;
    updateTime?: string;
    userId?: number;
    userName?: string;
  };

  type TestResultVO = {
    createTime?: string;
    resultDesc?: string;
    resultName?: string;
    resultPicture?: string;
    score?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    headPicture?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    password?: string;
    role?: string;
    unionId?: string;
    updateTime?: string;
    userName?: string;
  };

  type UserAddRequestDTO = {
    headPicture?: string;
    password?: string;
    passwordConfirm?: string;
    userName?: string;
  };

  type userAnswerCuntByTestPaperIdUsingGETParams = {
    /** testPaperId */
    testPaperId: number;
  };

  type UserAnswerQueryRequestDTO = {
    current?: number;
    id?: number;
    pageSize?: number;
    scoringResultId?: number;
    scoringType?: number;
    sortField?: string;
    sortOrder?: string;
    testPaperId?: number;
    userId?: number;
  };

  type UserAnswerVO = {
    answeredUserName?: string;
    choices?: string;
    createTime?: string;
    id?: number;
    questionContent?: string;
    resultDesc?: string;
    resultName?: string;
    score?: number;
    scoringResultId?: number;
    scoringStrategyType?: number;
    scoringType?: number;
    testDesc?: string;
    testPaperId?: number;
    testPaperName?: string;
    testPaperType?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserLoginRequestDTO = {
    password?: string;
    userName?: string;
  };

  type UserUpdateRequestDTO = {
    headPicture?: string;
    id?: number;
    newPassword?: string;
    oldPassword?: string;
    userName?: string;
  };

  type UserVO = {
    createTime?: string;
    headPicture?: string;
    id?: number;
    role?: string;
    updateTime?: string;
    userName?: string;
  };
}
