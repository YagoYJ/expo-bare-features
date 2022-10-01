import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../pages/Unauthenticated/Login";
import { Home } from "../pages/Authenticated/Home";

import { RootStackParamList } from "../types/stack.navigation";

export function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
