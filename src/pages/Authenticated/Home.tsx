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
import { Box, Skeleton, Stack, Text } from "native-base";

export function Home() {
  const {
    data: tasks,
    isFetching,
    refetch: refetchTodos,
  } = useQuery("getTodos", getTodos);

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
    createTodoMutate({ title });
  }

  function handleToggleTaskDone(id: string) {
    toggleTodoDoneMutate({ id });
  }

  function handleEditTask({ taskId, newTitle }: EditTaskProps) {
    updateTodoMutate({ taskId, newTitle });
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
          deleteTodoMutate({ taskId: id });
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks ? tasks.length : 0} />

      <TodoInput addTask={handleAddTask} />

      {isFetching ? (
        <Stack space={4}>
          <Skeleton h="70px" px="24px" />
          <Skeleton h="70px" px="24px" />
          <Skeleton h="70px" px="24px" />
        </Stack>
      ) : tasks && tasks.length > 0 ? (
        <TasksList
          tasks={tasks}
          toggleTaskDone={handleToggleTaskDone}
          removeTask={handleRemoveTask}
          editTask={handleEditTask}
        />
      ) : (
        <Box px="24px" mt="5">
          <Text>No tasks created</Text>
        </Box>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
