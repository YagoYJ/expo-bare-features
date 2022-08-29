import { api } from "../../services/api";

interface IRequest {
  taskId: string;
}

export async function deleteTodo({ taskId }: IRequest) {
  const { data: response } = await api.delete(`/todos/${taskId}`, {
    headers: { username: "Yj" },
  });

  return response;
}
