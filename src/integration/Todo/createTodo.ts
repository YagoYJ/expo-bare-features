import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";

interface IRequest {
  title: string;
}

export async function createTodo({ title }: IRequest) {
  const { data: response } = await api.post(
    "/todos",
    {
      title,
      deadline: "2022-08-29",
    },
    { headers: { username: await AsyncStorage.getItem("@username") } }
  );

  return response;
}
