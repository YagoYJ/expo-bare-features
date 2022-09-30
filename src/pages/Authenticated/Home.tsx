import { StyleSheet, View } from "react-native";
import { Box, Skeleton, Stack, Text } from "native-base";

import { Header } from "../../components/Header";
import { TasksList } from "../../components/TasksList";
import { TodoInput } from "../../components/TodoInput";

import { useTodo } from "../../contexts/TodoContext";

export function Home() {
  const { getTodos } = useTodo();

  const { data: tasks, isFetching } = getTodos;

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks ? tasks.length : 0} />

      <TodoInput />

      {isFetching ? (
        <Stack space={4}>
          <Skeleton h="70px" px="24px" />
          <Skeleton h="70px" px="24px" />
          <Skeleton h="70px" px="24px" />
        </Stack>
      ) : tasks && tasks.length > 0 ? (
        <TasksList tasks={tasks} />
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
