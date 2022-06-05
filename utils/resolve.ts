
const controller = {
  home: '/',
  users: '/users/',
  session: {
    login: 'sign_in',
    subscribe: 'sign_up',
    password: 'forget_password',
    authorization: 'authorization'
  }
}

const Resolve = (localePath: Function) => ({

  home: () => localePath({ path: controller.home }),

  // users module

  user: (...args: any[]) => localePath({ path: controller.users + 'do/' + args.join('/') }),
  users: (...args: any[]) => localePath({ path: controller.users + args.join('/') }),

  // authentication

  login: (...args: any[]) => localePath({ path: controller.session.login + args.join('/') }),
  subscribe: (...args: any[]) => localePath({ path: controller.session.subscribe + args.join('/') }),
  password: (...args: any[]) => localePath({ path: controller.session.password + args.join('/') }),
  authorization: (...args: any[]) => localePath({ path: controller.session.authorization + args.join('/') })

});

export const initializeResolve = (localePath: Function) => ({
  ...Resolve(localePath)
});