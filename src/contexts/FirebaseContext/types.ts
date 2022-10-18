export type NewUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = Omit<NewUser, "confirmPassword">;

export type FirebaseContextData = {
  handleCreateUser: (newUser: NewUser) => void;
  handleLogin: (user: User) => void;
  handleSignOut: () => void;
};
