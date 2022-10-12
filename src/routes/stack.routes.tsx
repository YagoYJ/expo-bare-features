import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Features } from "../screens/Features";
import { FirebaseLogin } from "../screens/FirebaseLogin";
import { FormExample } from "../screens/FormExample";

export type OthersRoutesProps = {
  Features: undefined;
  FormExample: undefined;
  FirebaseLogin: undefined;
  FirebaseAuthenticated: undefined;
};

export function StackRoutes() {
  const Stack = createNativeStackNavigator<OthersRoutesProps>();

  return (
    <Stack.Navigator initialRouteName="Features">
      <Stack.Screen
        name="Features"
        component={Features}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FormExample"
        component={FormExample}
        options={{
          headerTitle: "Form Example",
          headerBackTitle: "Go Back",
        }}
      />
      <Stack.Screen
        name="FirebaseLogin"
        component={FirebaseLogin}
        options={{
          headerTitle: "Firebase Login",
          headerBackTitle: "Go Back",
        }}
      />
    </Stack.Navigator>
  );
}
