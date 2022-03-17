import { Todo } from "@/models";

export const TodoService = (store: any, _18n: any) => ({

  all() {
    store.dispatch('todo/all');
  },

  find() {
    store.dispatch('todo/find');
  },

  insert(todo: Todo) {
    store.dispatch("todo/insert", todo);
  },

  update(id: string, props: object) {
    store.dispatch("todo/update", { id, props });
  },

  delete(id: string) {
    store.dispatch("todo/delete", id);
  },

  recover(id: string) {
    store.dispatch("todo/recover", id);
  },

  select(id: string) {
    store.dispatch("todo/select", id);
  },

  unselect() {
    store.dispatch("todo/unselect");
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
