import { useState } from "react";
import { FirebaseCreateAccount } from "./FirebaseCreateAccount";
import { FirebaseLogin } from "./FirebaseLogin";

export function FirebaseAuth() {
  const [isLogin, setIsLogin] = useState(false);

  function handleToggleForm() {
    setIsLogin(!isLogin);
  }

  return isLogin ? (
    <FirebaseLogin toggleForm={handleToggleForm} />
  ) : (
    <FirebaseCreateAccount toggleForm={handleToggleForm} />
  );
}
