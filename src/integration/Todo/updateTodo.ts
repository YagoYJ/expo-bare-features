import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";

interface IRequest {
  taskId: string;
  newTitle: string;
}

export async function updateTodo({ taskId, newTitle }: IRequest) {
  const { data: response } = await api.put(
    `/todos/${taskId}`,
    {
      title: newTitle,
      deadline: "2022-08-29",
    },
    { headers: { username: await AsyncStorage.getItem("@username") } }
  );

  return response;
}
