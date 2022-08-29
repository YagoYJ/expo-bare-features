import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../pages/Unauthenticated/Login";
import { Home } from "../pages/Authenticated/Home";

import { RootStackParamList } from "../types/stack.navigation";

export function Routes() {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  async function varifyIfUserIsLogged() {
    try {
      const value = await AsyncStorage.getItem("@username");
      console.log({ value });
      if (value !== null) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    varifyIfUserIsLogged();
  }, []);

  if (isLogged === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogged ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
