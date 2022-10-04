import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../pages/Home";

import { RootStackParamList } from "../types/stack.navigation";

export function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
