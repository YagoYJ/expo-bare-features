import { AxiosError } from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "react-query";

import { Header } from "../../components/Header";
import { EditTaskProps, Task, TasksList } from "../../components/TasksList";
import { TodoInput } from "../../components/TodoInput";

import { createTodo } from "../../integration/Todo/createTodo";
import { getTodos } from "../../integration/Todo/getTodos";
import { deleteTodo } from "../../integration/Todo/deleteTodo";
import { toggleTodoDone } from "../../integration/Todo/toggleTodoDone";
import { updateTodo } from "../../integration/Todo/updateTodo";

import { queryClient } from "../../services/queryClient";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const {
    data: tasksData,
    isFetching,
    refetch: refetchTodos,
  } = useQuery("getTodos", () => getTodos({ username: "Yj" }));

  const { mutate: createTodoMutate } = useMutation("createTodo", createTodo, {
    onSuccess: () => {
      refetchTodos();
    },
    onError: (error: AxiosError) => {
      return Alert.alert("Error", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("createTodo");
    },
  });

  const { mutate: updateTodoMutate } = useMutation("updateTodo", updateTodo, {
    onSuccess: () => {
      refetchTodos();
    },
    onError: (error: AxiosError) => {
      return Alert.alert("Error", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("updateTodo");
    },
  });

  const { mutate: toggleTodoDoneMutate } = useMutation(
    "toggleTodoDone",
    toggleTodoDone,
    {
      onSuccess: () => {
        refetchTodos();
      },
      onError: (error: AxiosError) => {
        return Alert.alert("Error", error.message);
      },
      onSettled: () => {
        queryClient.invalidateQueries("toggleTodoDone");
      },
    }
  );

  const { mutate: deleteTodoMutate } = useMutation("deleteTodo", deleteTodo, {
    onSuccess: () => {
      refetchTodos();
    },
    onError: (error: AxiosError) => {
      return Alert.alert("Error", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("deleteTodo");
    },
  });

  async function handleAddTask(title: string) {
    createTodoMutate({ title, username: "Yj" });
  }

  function handleToggleTaskDone(id: string) {
    toggleTodoDoneMutate({ taskId: id, username: "Yj" });
  }

  function handleRemoveTask(id: string) {
    Alert.alert("Remover item", "Tem certeza que deseja remover esse item?", [
      {
        text: "Não",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Sim",
        onPress: () => {
          deleteTodoMutate({ taskId: id, username: "Yj" });
        },
      },
    ]);
  }

  function handleEditTask({ taskId, newTitle }: EditTaskProps) {
    updateTodoMutate({ taskId, newTitle, username: "Yj" });
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
