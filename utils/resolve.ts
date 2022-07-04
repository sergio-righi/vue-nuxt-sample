import { Context } from '@nuxt/types'

const controller = {
  home: '/',
  users: '/users/',
}

const Resolve = (context: any) => ({
  home: () => context.localePath({ path: controller.home }),

  // users module

  user: (...args: any[]) =>
    context.localePath({ path: controller.users + 'do/' + args.join('/') }),
  users: (...args: any[]) =>
    context.localePath({ path: controller.users + args.join('/') }),

  // authentication

  login: (callback: string) => context.$config.sso + '?callback=' + callback,
  logout: (callback: string) => context.$config.sso + '/logout?callback=' + callback,
  subscribe: (callback: string) =>
    context.$config.sso + '/register?callback=' + callback,
  password: (callback: string) =>
    context.$config.sso + '/forget-password?callback=' + callback,
  authorization: (callback: string) =>
    context.$config.sso + '/authorization?callback=' + callback,
})

export const initializeResolve = (context: Context) => ({
  ...Resolve(context),
})
