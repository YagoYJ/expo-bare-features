import { UseQueryResult } from "react-query";
import { Task } from "../../components/TasksList";

export type TodoContextData = {
  getTodos: UseQueryResult<Task[]>;
  createTodo: ({ title }: IRequestCreateTodo) => void;
  updateTodo: ({ taskId, newTitle }: IRequestUpdateTodo) => void;
  toggleTodoDone: ({ taskId }: IRequestToggleTodoDone) => void;
  deleteTodo: ({ taskId }: IRequestDeleteTodo) => void;
};

export type IRequestCreateTodo = {
  title: string;
};

export type IRequestUpdateTodo = {
  taskId: number;
  newTitle: string;
};

export type IRequestToggleTodoDone = {
  taskId: number;
};

export type IRequestDeleteTodo = {
  taskId: number;
};
