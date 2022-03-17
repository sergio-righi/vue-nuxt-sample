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
    state.todos = todos;
  },

  /**
   * it performs updates on the stored list (not refresh)
   */

  update: (state: IState, todo: Todo) => {
    // if state already loaded the next line is not necessary
    state.todo = state.todos.find(item => item.id === todo.id) as Todo
    state.todo = helpers.deepMerge(state.todo, todo);
  },

  /**
   * it inserts the new item into the stored list
   */

  insert: (state: IState, todo: Todo) => {
    state.todo = todo;
    state.todos.push(todo);
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

  unselect: (state: IState) => {
    state.todo = new Todo();
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

  update({ commit }: any, { id, props }) {
    // it must be uncommented if willing to use state to update
    // const { id } = state.todo;
    // delete state.todo.id;
    return this.$repository.todo.update(id, props).then((response: any) => {
      commit("update", response);
    });
  },

  delete({ commit }: any, id: string) {
    return this.$repository.todo.delete(id).then((response: any) => {
      commit("delete", response);
    });
  },

  recover({ commit }: any, id: string) {
    return this.$repository.todo.recover(id).then((response: any) => {
      commit("recover", response);
    });
  },

  set({ commit }: any, props: object) {
    commit('update', props)
  },

  select({ commit }: any, id: string) {
    commit('select', id)
  },

  unselect({ commit }: any) {
    commit("unselect");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
