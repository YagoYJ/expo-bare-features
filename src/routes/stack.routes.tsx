import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";

export function StackRoutes() {
  const Stack = createNativeStackNavigator();

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
