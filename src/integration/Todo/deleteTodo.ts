import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";

interface IRequest {
  taskId: string;
}

export async function deleteTodo({ taskId }: IRequest) {
  const { data: response } = await api.delete(`/todos/${taskId}`, {
    headers: { username: await AsyncStorage.getItem("@username") },
  });

  return response;
}
