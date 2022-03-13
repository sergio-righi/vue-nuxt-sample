import { TodoService } from "./todo";

export const initializeService = (store: any, i18n: any) => ({
  todo: TodoService(store, i18n),
});
