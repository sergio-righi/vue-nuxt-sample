import { Todo } from "@/models";

const controller = "/todo";

export const TodoRepository = ($axios: any, $service: any) => ({

  id: () => $service.todo.id,

  async all() {
    const response = await $axios.get(`${controller}`);
    return response ? response.data.map((item: any) => new Todo(item)) : null;
  },

  async insert(todo: Todo) {
    const response = await $axios.post(`${controller}`, todo);
    return response ? new Todo(response.data) : null;
  },

  async find(id: string) {
    if (!id) return;
    const response = await $axios.get(`${controller}/${id}`);
    return response ? new Todo(response.data) : null;
  },

  async update(id: string, todo: Todo) {
    if (!id) return;
    const response = await $axios.put(`${controller}/${id}`, todo);
    return response ? new Todo(response.data) : null;
  },

  async delete(id: string) {
    if (!id) return;
    const response = await $axios.put(`${controller}/delete/${id}`);
    return response ? new Todo(response.data) : null;
  },

  async recover(id: string) {
    if (!id) return;
    const response = await $axios.put(`${controller}/recover/${id}`);
    return response ? new Todo(response.data) : null;
  }

});
