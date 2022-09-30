import { PropsWithChildren } from "react";
import { TodoProvider } from "./TodoContext";

function AppProvider({ children }: PropsWithChildren) {
  return <TodoProvider>{children}</TodoProvider>;
}

export { AppProvider };
