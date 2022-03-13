import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { Todo } from "@/models";
import { helpers } from "@/utils";

interface IState {
  index: number
  todos: Todo[]
  todo: Todo
}

const state = (): IState => ({
  index: -1 as number,
  todos: [] as Todo[],
  todo: new Todo() as Todo
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  all: (state: IState, todos: Todo[]) => {
    state.todos = todos;
  },

  update: (state: IState, todo: Todo) => {
    state.todo = helpers.deepMerge(state.todo, todo);
  },

  insert: (state: IState, todo: Todo) => {
    state.todo = todo;
    // state.todos.push(todo); (optional)
  },

  delete: (state: IState) => {
    state.index = state.todos.findIndex(x => x.id === state.todo.id);
    state.todos.splice(state.index, 1);
  },

  recover: (state: IState) => {
    state.todos.splice(state.index, 0, state.todo);
  },

  clear: (state: IState) => {
    state.index = -1;
    state.todo = new Todo();
  }
};

const getters: GetterTree<RootState, RootState> = {
  todos: (state: IState) => state.todos.filter(x => !x.deleted),
  todo: (state: IState) => state.todo
};

const actions: ActionTree<RootState, RootState> = {

  all({ commit }: any) {
    return this.$repository.todo.all().then((response: Todo[]) => {
      commit("all", response);
    });
  },

  find({ commit }: any, id: string) {
    return this.$repository.todo.find(id).then((response: Todo) => {
      commit("find", response);
    });
  },

  insert({ commit }: any, todo: Todo) {
    delete todo.id;
    return this.$repository.todo.insert(todo).then((response: any) => {
      commit("insert", response);
    });
  },

  update({ commit, state }: any) {
    const { id } = state.todo;
    delete state.todo.id;
    return this.$repository.todo.update(id, state.todo).then((response: any) => {
      commit("update", response);
    });
  },

  delete({ commit, state }: any) {
    return this.$repository.todo.delete(state.todo.id).then((response: any) => {
      commit("delete", response);
    });
  },

  recover({ commit, state }: any) {
    return this.$repository.todo.recover(state.todo.id).then((response: any) => {
      commit("recover", response);
    });
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
