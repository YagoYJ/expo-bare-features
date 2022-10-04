import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import { Alert } from "react-native";
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
    try {
      const { data: response } = await api.get("todos", {});

      return response;
    } catch (err: unknown) {
      Alert.alert("Erro ao fazer a requisição", JSON.stringify(err));
    }
  });

  const { mutate: createTodo } = useMutation(
    "createTodo",
    async ({ title }: IRequestCreateTodo) => {
      try {
        const { data: response } = await api.post("/todos", {
          title,
          deadline: "2022-08-29",
          done: false,
        });

        return response;
      } catch (err: unknown) {
        Alert.alert("Erro ao fazer a requisição", JSON.stringify(err));
      } finally {
        getTodos.refetch();
      }
    }
  );

  const { mutate: updateTodo } = useMutation(
    "updateTodo",
    async ({ taskId, newTitle }: IRequestUpdateTodo) => {
      try {
        const { data: response } = await api.put(`/todos/${taskId}`, {
          title: newTitle,
          deadline: "2022-08-29",
        });

        return response;
      } catch (err: unknown) {
        Alert.alert("Erro ao fazer a requisição", JSON.stringify(err));
      } finally {
        getTodos.refetch();
      }
    }
  );

  const { mutate: toggleTodoDone } = useMutation(
    "toggleTodoDone",
    async ({ taskId }: IRequestToggleTodoDone) => {
      try {
        const { data: response } = await api.patch(`todos/${taskId}`, {
          done: true,
        });

        return response;
      } catch (err: unknown) {
        Alert.alert("Erro ao fazer a requisição", JSON.stringify(err));
      } finally {
        getTodos.refetch();
      }
    }
  );

  const { mutate: deleteTodo } = useMutation(
    "deleteTodo",
    async ({ taskId }: IRequestDeleteTodo) => {
      try {
        const { data: response } = await api.delete(`/todos/${taskId}`);

        return response;
      } catch (err: unknown) {
        Alert.alert("Erro ao fazer a requisição", JSON.stringify(err));
      } finally {
        getTodos.refetch();
      }
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
