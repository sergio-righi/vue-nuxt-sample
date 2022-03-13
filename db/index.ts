import { TodoRepository } from "./todo";

export const initializeRepository = ($axios: any, $service: any) => ({
  todo: TodoRepository($axios, $service),
});
