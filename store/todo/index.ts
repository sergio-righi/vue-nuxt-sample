import { GetterTree, ActionTree, MutationTree } from 'vuex';

import { Todo } from "@/models";
import { helpers } from "@/utils";

interface IState {
  todos: Todo[]
  todo: Todo
}

const state = (): IState => ({
  todos: [] as Todo[],
  todo: new Todo() as Todo
});

export type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {

  /**
   * it gets all (not deleted) records on the collection
   */

  all: (state: IState, todos: Todo[]) => {
    state.todos = todos
  },

  /**
   * it attributes the searched item to the stored value
   */

  find: (state: IState, todo: Todo) => {
    state.todo = todo
  },

  /**
   * it inserts the new item into the stored list
   */

  insert: (state: IState, todo: Todo) => {
    state.todo = todo
    state.todos.push(todo)
  },

  /**
   * it modified the stored value with the updated ones
   */

  set: (state: IState, todo: Todo) => {
    state.todo = helpers.deepMerge(state.todo, todo);
  },

  /**
   * it updates the status of an item on the stored list (deleted)
   */

  delete: (state: IState) => {
    state.todo.deleted = true
  },

  /**
   * it updates the status of an item on the stored list (not deleted)
   */

  recover: (state: IState) => {
    state.todo.deleted = false
  },

  /**
   * it selects an item from the list
   */

  select: (state: IState, id: string) => {
    state.todo = state.todos.find(item => item.id === id) as Todo
  },

  /**
   * it unselects an item from the list
   */

  clear: (state: IState) => {
    state.todo = new Todo()
  }
};

const getters: GetterTree<RootState, RootState> = {
  todos: (state: IState) => state.todos,
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
      commit("set", response);
    });
  },

  delete({ commit }: any, id: string) {
    commit('select', id);
    return this.$repository.todo.delete(id).then((response: any) => {
      commit("delete", response);
    });
  },

  recover({ commit }: any, id: string) {
    commit('select', id);
    return this.$repository.todo.recover(id).then((response: any) => {
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
