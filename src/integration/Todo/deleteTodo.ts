import { api } from "../../services/api";

interface IRequest {
  taskId: string;
  username: string;
}

export async function deleteTodo({ taskId, username }: IRequest) {
  const { data: response } = await api.delete(`/todos/${taskId}`, {
    headers: { username },
  });

  return response;
}
