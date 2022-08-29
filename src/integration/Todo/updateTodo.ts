import { api } from "../../services/api";

interface IRequest {
  taskId: number;
  newTitle: string;
  username: string;
}

export async function updateTodo({ taskId, newTitle, username }: IRequest) {
  const { data: response } = await api.put(
    `/todos/${taskId}`,
    {
      title: newTitle,
      deadline: "2022-08-29",
    },
    { headers: { username } }
  );

  return response;
}
