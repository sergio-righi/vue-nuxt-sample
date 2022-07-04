import Cookies from 'js-cookie'
import { helpers } from '@/utils'
import { SessionType } from '@/interfaces'

import { Context } from '@nuxt/types'

class SessionService {
  private readonly store: any
  private readonly $config: any

  constructor(context: Context) {
    this.store = context.store
    this.$config = context.$config
  }

  feedback(message: string, error: boolean = false) {
    this.store.dispatch('session/feedback', { message, error })
  }

  user(): any {
    const sessionCookie: any = helpers.toJSON(Cookies.get(this.$config.cookieKey))
    return sessionCookie ? sessionCookie.user : {}
  }

  isAuthenticated(): boolean {
    return this.user() !== null
  }

  isVerified(): boolean {
    return this.isAuthenticated() && this.user().verified
  }

  clear() {
    this.store.dispatch('session/clear')
  }
}

export { SessionService }
