import { api } from "../../services/api";

interface IRequest {
  id: string;
}

export async function toggleTodoDone({ id }: IRequest) {
  // const { data: response } =
  await api
    .patch(
      `todos/${id}/done`,
      {},
      {
        headers: {
          username: "Yj",
        },
      }
    )
    .then((res) => {
      console.log(JSON.stringify(res, null, 2));
      return res;
    })
    .catch((err) => console.log(JSON.stringify(err, null, 2)));

  // return response;
}
