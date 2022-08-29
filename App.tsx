import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";

import { queryClient } from "./src/services/queryClient";
import { Routes } from "./src/routes/index.routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
