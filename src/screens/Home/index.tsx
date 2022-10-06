import { Box, Skeleton, Stack, Text } from "native-base";

import { Header } from "../../components/Header";
import { TasksList } from "../../components/TasksList";
import { TodoInput } from "../../components/TodoInput";

import { useTodo } from "../../contexts/TodoContext";
import { styles } from "./styles";

export function Home() {
  const { getTodos } = useTodo();

  const { data: tasks, isFetching } = getTodos;

  return (
    <Box style={styles.container}>
      <Header />

      <TodoInput />

      {isFetching ? (
        <Stack space={4} mt={10}>
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
    </Box>
  );
}
