import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type NewUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = Omit<NewUser, "confirmPassword">;

export type FirebaseContextData = {
  handleCreateUser: (newUser: NewUser) => void;
  handleLogin: (user: User) => void;
  handleSignOut: (email: string) => void;
  googleSignin: () => Promise<FirebaseAuthTypes.UserCredential>;
};
