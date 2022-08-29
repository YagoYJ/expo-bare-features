import { api } from "../../services/api";

export async function getTodos() {
  const { data: response } = await api.get("todos", {
    headers: {
      username: "Yj",
    },
  });

  return response;
}
