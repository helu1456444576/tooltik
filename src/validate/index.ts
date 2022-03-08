import {
  ID_CARD_RE,
  MOBILE_RE,
  EMAIL_RE,
} from "./constant";

const isMobile = (str:string) => MOBILE_RE.test(str);
const isEmail = (str: string) => EMAIL_RE.test(str);
const isIdCard = (str: string) => ID_CARD_RE.test(str);

export const validateMobile = (value:string, callback?:(...par:any[])=>void) => {
  if (value.trim() === "") {
    if (callback)callback(new Error("请输入手机号"));
    return false;
  } if (!isMobile(value.trim())) {
    if (callback) callback(new Error("手机号格式错误"));
    return false;
  }
  if (callback) callback();
  return true;
};

export const validateEmail = (value: string, callback?: (...par: any[]) => void) => {
  if (value.trim() === "") {
    if (callback) callback(new Error("请输入邮箱"));
    return false;
  } if (!isEmail(value.trim())) {
    if (callback) callback(new Error("邮箱格式错误"));
    return false;
  }
  if (callback) callback();
  return true;
};

export const validateIdCard = (value: string, callback?: (...par: any[]) => void) => {
  if (value.trim() === "") {
    if (callback) callback(new Error("请输入身份证号"));
    return false;
  } if (!isIdCard(value.trim())) {
    if (callback) callback(new Error("身份证号格式错误"));
    return false;
  }
  if (callback) callback();
  return false;

  return true;
};
