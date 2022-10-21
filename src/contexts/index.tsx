import { PropsWithChildren } from "react";
import { CameraProvider } from "./Camera";
import { FirebaseProvider } from "./FirebaseContext";
import { TodoProvider } from "./TodoContext";

function AppProvider({ children }: PropsWithChildren) {
  return (
    <CameraProvider>
      <TodoProvider>
        <FirebaseProvider>{children}</FirebaseProvider>
      </TodoProvider>
    </CameraProvider>
  );
}

export { AppProvider };
