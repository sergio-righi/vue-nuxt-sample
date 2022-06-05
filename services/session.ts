import { Context } from '@nuxt/types'

import { crypto } from "@/utils";

class SessionService {
  private readonly store: any
  private readonly $auth: any

  constructor(context: Context) {
    this.store = context.store;
    this.$auth = context.$auth;
  }

  feedback(message: string, error: boolean = false) {
    this.store.dispatch("session/feedback", { message, error });
  }

  async login(username: string, password: string, encrypt: boolean = true) {
    password = encrypt ? crypto.encrypt(password) : password;
    await this.$auth.loginWith('local', {
      data: {
        username,
        password
      },
    })
  }

  async logout() {
    await this.$auth.logout();
  }

  async fetch() {
    const user = { ...this.$auth.user }
    user.validated = true;
    await this.$auth.setUser(user)
  }

  clear() {
    this.store.dispatch("session/clear");
  }
}

export { SessionService }