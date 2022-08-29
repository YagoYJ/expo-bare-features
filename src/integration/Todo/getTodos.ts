import { api } from "../../services/api";

interface IRequest {
  username: string;
}

export async function getTodos({ username }: IRequest) {
  const { data: response } = await api.get("todos", {
    headers: {
      username,
    },
  });

  return response;
}
