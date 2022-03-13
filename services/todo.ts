import { Todo } from "@/models";

export const TodoService = (store: any, i18n: any) => ({

  all() {
    store.dispatch('todo/all');
  },

  find() {
    store.dispatch('todo/find');
  },

  insert(todo: Todo) {
    store.dispatch("todo/insert", todo);
  },

  update(props: Object) {
    store.dispatch("todo/update", props);
  },

  delete(id: string) {
    store.dispatch("todo/delete", id);
  },

  clear() {
    store.dispatch("todo/clear");
  },

  /**
   * how to access the store state directly from the service
   * @returns
   */

  name() {
    return store.state.todo.name;
  },

  /**
   * how to access the getters directly from the service
   * @returns 
   */

  todo() {
    return store.getters["todo/todo"];
  },

});
