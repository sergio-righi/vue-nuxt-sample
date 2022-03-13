import * as VuexPersistence from "vuex-persist";

export default ({ store }: any) => {
  new VuexPersistence({
    key: 'vue-nuxt-sample',
  }).plugin(store);
};
