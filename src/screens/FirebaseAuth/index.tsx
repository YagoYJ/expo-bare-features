import { useEffect, useState } from "react";
import { FirebaseCreateAccount } from "./FirebaseCreateAccount";
import { FirebaseLogin } from "./FirebaseLogin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseAuthenticated } from "./FirebaseAuthenticated";

export function FirebaseAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function handleToggleForm() {
    setIsLogin(!isLogin);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);

    return subscriber;
  }, []);

  return user ? (
    <FirebaseAuthenticated />
  ) : isLogin ? (
    <FirebaseLogin toggleForm={handleToggleForm} />
  ) : (
    <FirebaseCreateAccount toggleForm={handleToggleForm} />
  );
}
