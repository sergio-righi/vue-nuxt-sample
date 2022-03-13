import { Todo } from "@/models";

export const TodoService = (store: any, i18n: any) => ({

  all() {
    store.dispatch('todo/all');
  },

  find() {
    store.dispatch('todo/find');
  },

  insert(todo: Todo) {
    store.dispatch("user/add", todo);
  },

  update(props: Object) {
    store.dispatch("user/put", props);
  },

  delete(id: string) {
    store.dispatch("user/delete", id);
  },

  clear() {
    store.dispatch("user/clear");
  },

  reset() {
    store.dispatch("user/reset");
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

  example() {
    return store.getters["todo/example"];
  },

});
