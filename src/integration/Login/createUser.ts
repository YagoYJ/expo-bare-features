import { Alert } from "react-native";
import { api } from "../../services/api";

interface IRequest {
  name: string;
  username: string;
}

export async function createUser(data: IRequest) {
  if (!data.username.trim())
    throw Alert.alert("Error", "Input username is required");

  const { data: response } = await api.post("/users", data);

  return response.data;
}
