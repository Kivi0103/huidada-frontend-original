declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
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
