import { atom } from "recoil";

export class UserData {
  nickname: string;
  slimeColor: string;
  level: number;
  isOnline: boolean;
  userSkill: string[];
  projects: string[];
  sendbirdAccessToken: string;

  constructor(data: any) {
    this.nickname = data.nickname;
    this.slimeColor = data.slimeColor;
    this.level = data.level;
    this.isOnline = data.isOnline;
    this.userSkill = data.userSkill;
    this.projects = data.projects;
    this.sendbirdAccessToken = data.sendbirdAccessToken;
  }
}

export const loginState = atom({
  key: "isLogin",
  default: false,
});

export const projectListState = atom({
  key: "projectList",
  default: [] as any[],
});

export const userDataState = atom({
  key: "userCore",
  default: new UserData({
    nickname: "",
    slimeColor: "",
    level: -1,
    isOnline: false,
    userSkill: [],
    projects: [],
    sendbirdAccessToken: "",
  }),
});

export const componentState = atom({
  key: "component",
  default: "",
});
