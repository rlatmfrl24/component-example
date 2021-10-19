import { atom } from "recoil";

class UserCore {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  setName(name: string) {
    this.name = name;
  }

  setColor(color: string) {
    this.color = color;
  }
}

export const loginState = atom({
  key: "isLogin",
  default: false,
});

export const userDataState = atom({
  key: "userData",
  default: {},
});

export const projectListState = atom({
  key: "projectList",
  default: [] as any[],
});

export const userCoreState = atom({
  key: "userCore",
  default: new UserCore("", ""),
});

export const componentState = atom({
  key: "component",
  default: "",
});
