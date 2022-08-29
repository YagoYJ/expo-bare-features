import { AxiosError } from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "react-query";

import { Header } from "../../components/Header";
import { EditTaskProps, Task, TasksList } from "../../components/TasksList";
import { TodoInput } from "../../components/TodoInput";

import { createTodo } from "../../integration/Todo/createTodo";

import { queryClient } from "../../services/queryClient";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { mutate: createTodoMutate } = useMutation("createTodo", createTodo, {
    onSuccess: (data) => {
      console.log({ data });
      // refetch()
    },
    onError: (error: AxiosError) => {
      return Alert.alert("Error", error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("createTodo");
    },
  });

  async function handleAddTask(title: string) {
    createTodoMutate({ title, username: "Yj" });
  }

  function handleToggleTaskDone(id: number) {
    const currentTask = tasks.find((task) => task.id === id);

    if (!currentTask) return;

    currentTask.done = !currentTask.done;

    const newTasksArray = tasks.map((task) => {
      if (task.id === id) {
        return currentTask;
      } else {
        return task;
      }
    });

    setTasks(newTasksArray);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que deseja remover esse item?", [
      {
        text: "Não",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Sim",
        onPress: () => {
          const newTasksArray = tasks.filter((task) => task.id !== id);

          setTasks(newTasksArray);
        },
      },
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
    const currentTask = tasks.find((task) => task.id === taskId);

    if (!currentTask) return;

    currentTask.title = taskNewTitle;

    const newTasksArray = tasks.map((task) => {
      if (task.id === taskId) {
        return currentTask;
      } else {
        return task;
      }
    });

    setTasks(newTasksArray);
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
