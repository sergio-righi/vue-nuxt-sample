// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { FeedbackType } from "@/interfaces"

interface IState {
  auth: any
  feedback: FeedbackType
}

const state = (): IState => ({
  auth: {},
  feedback: {} as FeedbackType
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  feedback: (state: IState, feedback: FeedbackType) => {
    state.feedback = feedback;
  },

  clear: (state: IState) => {
    state.feedback = {} as FeedbackType;
  }
};

const getters: GetterTree<RootState, RootState> = {
  logged: (state: IState) => state.auth.user,
  feedback: (state: IState) => state.feedback,
  isAuthenticated: (state: IState) => state.auth.loggedIn,
};

const actions: ActionTree<RootState, RootState> = {

  feedback({ commit }, feedback: FeedbackType) {
    commit("feedback", feedback);
  },

  clear({ commit }) {
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
