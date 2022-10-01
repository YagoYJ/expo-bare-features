import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
} from "react";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { StackScreen } from "../../types/stack.navigation";

import {
  IRequestCreateTodo,
  IRequestDeleteTodo,
  IRequestToggleTodoDone,
  IRequestUpdateTodo,
  TodoContextData,
} from "./types";

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

const TodoProvider = ({ children }: PropsWithChildren): ReactElement => {
  const navigation = useNavigation<StackScreen>();

  const handleGetTodos = useCallback(async () => {
    const { data: response } = await api.get("todos", {});

    return response;
  }, []);

  const getTodos = useQuery("getTodos", handleGetTodos);

  const handleCreateTodo = useCallback(
    async ({ title }: IRequestCreateTodo) => {
      const { data: response } = await api.post("/todos", {
        title,
        deadline: "2022-08-29",
      });

      return response;
    },
    []
  );

  const { mutate: createTodo } = useMutation("createTodo", handleCreateTodo, {
    onSuccess: () => {
      getTodos.refetch();
    },
    onError: () => {
      Alert.alert("Error", "Não foi possível criar o Todo");
      return navigation.navigate("Login");
    },
    onSettled: () => {
      queryClient.invalidateQueries("createTodo");
    },
  });

  const handleUpdateTodo = useCallback(
    async ({ taskId, newTitle }: IRequestUpdateTodo) => {
      const { data: response } = await api.put(`/todos/${taskId}`, {
        title: newTitle,
        deadline: "2022-08-29",
      });

      return response;
    },
    []
  );

  const { mutate: updateTodo } = useMutation("updateTodo", handleUpdateTodo, {
    onSuccess: () => {
      getTodos.refetch();
    },
    onError: () => {
      Alert.alert("Error", "Não foi possível atualizar o Todo");
      return navigation.navigate("Login");
    },
    onSettled: () => {
      queryClient.invalidateQueries("updateTodo");
    },
  });

  const handleToggleTodoDone = useCallback(
    async ({ taskId }: IRequestToggleTodoDone) => {
      const { data: response } = await api.patch(`todos/${taskId}/done`, {});

      return response;
    },
    []
  );

  const { mutate: toggleTodoDone } = useMutation(
    "toggleTodoDone",
    handleToggleTodoDone,
    {
      onSuccess: () => {
        getTodos.refetch();
      },
      onError: () => {
        Alert.alert("Error", "Não foi possível atualizar o Todo");
        return navigation.navigate("Login");
      },
      onSettled: () => {
        queryClient.invalidateQueries("toggleTodoDone");
      },
    }
  );

  const handleDeleteTodo = useCallback(
    async ({ taskId }: IRequestDeleteTodo) => {
      const { data: response } = await api.delete(`/todos/${taskId}`);

      return response;
    },
    []
  );

  const { mutate: deleteTodo } = useMutation("deleteTodo", handleDeleteTodo, {
    onSuccess: () => {
      getTodos.refetch();
    },
    onError: () => {
      Alert.alert("Error", "Não foi possível apagar o Todo");
      return navigation.navigate("Login");
    },
    onSettled: () => {
      queryClient.invalidateQueries("deleteTodo");
    },
  });

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
