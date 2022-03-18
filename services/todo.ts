import { Todo } from "@/models";

export const TodoService = (store: any, _18n: any) => ({

  all() {
    store.dispatch('todo/all');
  },

  find(id: string) {
    store.dispatch('todo/find', id);
  },

  insert(todo: Todo) {
    store.dispatch("todo/insert", todo);
  },

  update() {
    store.dispatch("todo/update");
  },

  set(prop: object) {
    store.commit("todo/set", prop);
  },

  delete(id: string) {
    store.dispatch("todo/delete", id);
  },

  recover(id: string) {
    store.dispatch("todo/recover", id);
  },

  clear() {
    store.dispatch("todo/clear");
  },

  /**
   * how to access the store state directly from the service
   */

  name() {
    return store.state.todo.name;
  },

  /**
   * how to access the getters directly from the service
   */

  todo() {
    return store.getters["todo/todo"];
  },

});
