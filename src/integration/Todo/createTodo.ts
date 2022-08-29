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
    { headers: { username: "Yj" } }
  );

  return response;
}
