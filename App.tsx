import { NativeBaseProvider } from "native-base";
import { QueryClientProvider } from "react-query";
import * as Updates from "expo-updates";

import { AppProvider } from "./src/contexts";

import { queryClient } from "./src/services/queryClient";

import { Routes } from "./src/routes/index.routes";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

function App() {
  async function updateApp() {
    const { isAvailable } = await Updates.checkForUpdateAsync();

    if (isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  }

  useEffect(() => {
    updateApp();
  }, []);

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
