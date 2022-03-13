
const controller = {
  controllerName: '/controller-name',
}

const Resolve = (localePath: Function) => ({

  controllerName: (...args: any[]) => {
    return localePath({ path: controller.controllerName + args.join('/') });
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