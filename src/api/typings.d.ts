declare namespace API {
  type AiGenerateQuestionRequestDTO = {
    description?: string;
    optionCount?: number;
    questionCount?: number;
    testName?: string;
    type?: number;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
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

  type BaseResponseQuestionContentVO_ = {
    code?: number;
    data?: QuestionContentVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
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
    scoringStrategyType?: number;
    testPaperId?: number;
    type?: number;
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
    resultDesc?: string;
    resultName?: string;
    resultPicture?: string;
    resultProp?: string[];
    resultScoreRange?: number;
  };

  type TestPaperAddRequestDTO = {
    bgPicture?: string;
    description?: string;
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

  type TestPaperVO = {
    bgPicture?: string;
    createTime?: string;
    description?: string;
    id?: string;
    isAi?: number;
    isDelete?: number;
    questionContent?: QuestionItem[];
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

  type UserLoginRequestDTO = {
    password?: string;
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
