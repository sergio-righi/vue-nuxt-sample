import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $t: any
    $tc: any
    $i18n: any
    $resolve: any
    $service: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $resolve: any
    $service: any
  }

  interface Context {
    i18n: any
    $resolve: any
    $service: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $resolve: any
    $service: any
  }
}