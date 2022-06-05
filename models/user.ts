import { UserType } from "@/interfaces";

export default class UserModel {

  constructor(params?: UserType) {
    Object.assign(this, { name: "", username: "", password: "", validated: false, roles: [], createdAt: Date.now(), deleted: false }, params);
  }

  static canCreate() {
    return true;
  }

  static canUpdate() {
    return true;
  }
}