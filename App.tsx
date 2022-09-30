import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";

import { AppProvider } from "./src/contexts";

import { queryClient } from "./src/services/queryClient";

import { Routes } from "./src/routes/index.routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
