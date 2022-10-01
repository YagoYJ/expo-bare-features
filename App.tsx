import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";

import { AppProvider } from "./src/contexts";

import { queryClient } from "./src/services/queryClient";

import { Routes } from "./src/routes/index.routes";
import { NavigationContainer } from "@react-navigation/native";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppProvider>
          <NativeBaseProvider>
            <Routes />
          </NativeBaseProvider>
        </AppProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
