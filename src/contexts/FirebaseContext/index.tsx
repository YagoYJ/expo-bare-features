import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import analytics from "@react-native-firebase/analytics";

import { CustomAlert } from "../../components/CustomAlert";

import { FirebaseContextData, NewUser, User } from "./types";

const FirebaseContext = createContext<FirebaseContextData>(
  {} as FirebaseContextData
);

const FirebaseProvider = ({ children }: PropsWithChildren): ReactElement => {
  const toast = useToast();
  const navigation = useNavigation();

  function handleCreateUser(newUser: NewUser) {
    auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(async ({ user }) => {
        toast.show({
          placement: "top",
          render: () => <CustomAlert text="User created!" status="success" />,
        });

        await analytics().logEvent("Create user", {
          email: user.email,
        });
      })
      .catch((error) => console.log(error));
  }

  function handleLogin(user: User) {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(async ({ user }) => {
        navigation.navigate("FirebaseAuthenticated");
        await analytics().logEvent("User login", {
          email: user.email,
        });
      })
      .catch((err) => console.log({ err }));
  }

  function handleSignOut(email: string) {
    auth()
      .signOut()
      .then(async () => {
        await analytics().logEvent("User logout", {
          user: email,
        });
      });
  }

  return (
    <FirebaseContext.Provider
      value={{
        handleCreateUser,
        handleLogin,
        handleSignOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = (): FirebaseContextData => {
  const context = useContext(FirebaseContext);

  if (!context || Object.keys(context).length < 1) {
    throw new Error("useFirebase must be used within a Firebase Provider");
  }

  return context;
};

export { FirebaseProvider, useFirebase };
