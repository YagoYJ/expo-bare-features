import { PropsWithChildren } from "react";
import { FirebaseProvider } from "./FirebaseContext";
import { TodoProvider } from "./TodoContext";

function AppProvider({ children }: PropsWithChildren) {
  return (
    <TodoProvider>
      <FirebaseProvider>{children}</FirebaseProvider>
    </TodoProvider>
  );
}

export { AppProvider };
