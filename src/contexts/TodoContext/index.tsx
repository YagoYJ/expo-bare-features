import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import { useMutation, useQuery } from "react-query";

import { api } from "../../services/api";

import {
  IRequestCreateTodo,
  IRequestDeleteTodo,
  IRequestToggleTodoDone,
  IRequestUpdateTodo,
  TodoContextData,
} from "./types";

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

const TodoProvider = ({ children }: PropsWithChildren): ReactElement => {
  const getTodos = useQuery("getTodos", async () => {
    const { data: response } = await api.get("todos", {});

    return response;
  });

  const { mutate: createTodo } = useMutation(
    "createTodo",
    async ({ title }: IRequestCreateTodo) => {
      const { data: response } = await api.post("/todos", {
        title,
        deadline: "2022-08-29",
        done: false,
      });

      return response;
    }
  );

  const { mutate: updateTodo } = useMutation(
    "updateTodo",
    async ({ taskId, newTitle }: IRequestUpdateTodo) => {
      const { data: response } = await api.put(`/todos/${taskId}`, {
        title: newTitle,
        deadline: "2022-08-29",
      });

      return response;
    }
  );

  const { mutate: toggleTodoDone } = useMutation(
    "toggleTodoDone",
    async ({ taskId }: IRequestToggleTodoDone) => {
      const { data: response } = await api.patch(`todos/${taskId}`, {
        done: true,
      });

      return response;
    }
  );

  const { mutate: deleteTodo } = useMutation(
    "deleteTodo",
    async ({ taskId }: IRequestDeleteTodo) => {
      const { data: response } = await api.delete(`/todos/${taskId}`);

      return response;
    }
  );

  return (
    <TodoContext.Provider
      value={{
        getTodos,
        createTodo,
        updateTodo,
        toggleTodoDone,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = (): TodoContextData => {
  const context = useContext(TodoContext);

  if (!context || Object.keys(context).length < 1) {
    throw new Error("useTodo must be used within a Todo Provider");
  }

  return context;
};

export { TodoProvider, useTodo };
