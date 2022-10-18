import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from "react";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

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
      .then(() => {
        toast.show({
          placement: "top",
          render: () => <CustomAlert text="User created!" status="success" />,
        });
      })
      .catch((error) => console.log(error));
  }

  function handleLogin(user: User) {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => navigation.navigate("FirebaseAuthenticated"))
      .catch((err) => console.log({ err }));
  }

  function handleSignOut() {
    auth().signOut();
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
