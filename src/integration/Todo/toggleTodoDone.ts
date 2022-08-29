import { api } from "../../services/api";

interface IRequest {
  taskId: string;
  username: string;
}

export async function toggleTodoDone({ taskId, username }: IRequest) {
  const { data: response } = await api.patch(`/todos/${taskId}/done`, {
    headers: { username },
  });

  return response;
}
