import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../../services/api";

interface IRequest {
  id: string;
}

export async function toggleTodoDone({ id }: IRequest) {
  const { data: response } = await api.patch(
    `todos/${id}/done`,
    {},

    {
      headers: {
        username: await AsyncStorage.getItem("@username"),
      },
    }
  );

  return response;
}
