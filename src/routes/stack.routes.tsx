import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Features } from "../screens/Features";
import { FirebaseAuth } from "../screens/FirebaseAuth";
import { FirebaseAuthenticated } from "../screens/FirebaseAuth/FirebaseAuthenticated";
import { FormExample } from "../screens/FormExample";

export type OthersRoutesProps = {
  Features: undefined;
  FormExample: undefined;
  FirebaseLogin: undefined;
  FirebaseAuthenticated: {
    user: string;
  };
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
        component={FirebaseAuth}
        options={{
          headerTitle: "Firebase Auth",
          headerBackTitle: "Go Back",
        }}
      />
      <Stack.Screen
        name="FirebaseAuthenticated"
        component={FirebaseAuthenticated}
        options={{
          headerTitle: "Firebase Authenticated",
          headerBackTitle: "Go Back",
        }}
      />
    </Stack.Navigator>
  );
}
