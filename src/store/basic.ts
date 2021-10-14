import { atom } from "recoil";

export const loginState = atom({
  key: "isLogin",
  default: false,
});

export const userDataState = atom({
  key: "userData",
  default: {},
});

export const userNameState = atom({
  key: "userName",
  default: "",
});

export const componentState = atom({
  key: "component",
  default: "",
});
