
const controller = {
  todo: '/',
}

const Resolve = (localePath: Function) => ({

  todo: (...args: any[]) => {
    return localePath({ path: controller.todo + args.join('/') });
  },

  static: {

    todo: (param: string) => {
      return `/todo/${param}.png`
    }
  }

});

export const initializeResolve = (localePath: Function) => ({
  ...Resolve(localePath)
});