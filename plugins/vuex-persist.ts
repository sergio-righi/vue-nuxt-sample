// eslint-disable-next-line import/no-named-as-default
import VuexPersistence from "vuex-persist";
import { config } from "@/utils";

export default ({ store }: any) => {
  new VuexPersistence({
    key: config.persistKey
  }).plugin(store);
};
