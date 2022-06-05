// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { UserModel } from '@/models';
import { UserType } from "@/interfaces";
import { helpers } from "@/utils";

interface IState {
  index: number
  users: UserType[]
  user: UserType
}

const state = (): IState => ({
  index: -1 as number,
  users: [] as UserType[],
  user: new UserModel() as UserType
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  /**
   * it gets all (not deleted) records on the collection
   */

  all: (state: IState, users: UserType[]) => {
    state.users = users
  },

  /**
   * it attributes the searched item to the stored value
   */

  find: (state: IState, user: UserType) => {
    state.user = user
  },

  /**
   * it inserts the new item into the stored list
   */

  create: (state: IState, user: UserType) => {
    state.user = user
    state.users.push(user)
  },

  /**
   * it updates the status of an item on the stored list (deleted)
   */

  soft: (state: IState) => {
    state.index = state.users.findIndex(x => x._id === state.user._id);
    state.users.splice(state.index, 1);
  },

  /**
   * it updates the status of an item on the stored list (not deleted)
   */

  restore: (state: IState) => {
    state.users.splice(state.index, 0, state.user);
  },

  /**
   * it modified the stored value with the updated ones
   */

  set: (state: IState, user: UserType) => {
    state.user = helpers.deepMerge(state.user, user)
  },

  /**
   * it unselects an item from the list
   */

  clear: (state: IState) => {
    state.index = -1;
    state.user = new UserModel() as UserType
  }
};

const getters: GetterTree<RootState, RootState> = {
  users: (state: IState) => state.users.filter(x => !x.deleted),
  user: (state: IState) => state.user
};

const actions: ActionTree<RootState, RootState> = {

  all({ commit }: any, response) {
    commit("all", response);
  },

  find({ commit }: any, response) {
    commit("find", response);
  },

  create({ commit }: any, response) {
    commit("create", response)
  },

  update({ commit }: any, response) {
    commit("update", response);
  },

  soft({ commit }: any, response) {
    commit("soft", response);
  },

  restore({ commit }: any, response) {
    commit("restore", response);
  },

  set({ commit }: any, response) {
    commit("set", response);
  },

  clear({ commit }: any) {
    commit("clear");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
