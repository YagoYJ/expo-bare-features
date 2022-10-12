import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Heading, useToast } from "native-base";
import auth from "@react-native-firebase/auth";
import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  Stack,
} from "native-base";
import { SuccessAlert } from "../../components/SuccessAlert";

type User = {
  email: string;
  password: string;
};

export function FirebaseLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [newUser, setNewUser] = useState<User>({
    email: "",
    password: "",
  });

  const toast = useToast();

  function handleCreateUser() {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        toast.show({
          placement: "top",
          render: () => <SuccessAlert text="User created!" />,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function login() {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then((user) => console.log(JSON.stringify(user, null, 2)))
      .catch((err) => console.log({ err }))
      .finally(() => setIsLoading(false));
  }

  function toggleForm() {
    setIsLoginForm(!isLoginForm);
  }

  return (
    <Stack space={4} w="100%" alignItems="center" mt="10" p="24px">
      <Heading>{isLoginForm ? "Login" : "Create account"}</Heading>

      <FormControl isRequired mb="3">
        <Stack>
          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            size="2xl"
            w="100%"
            placeholder="E-mail"
            value={newUser.email}
            onChangeText={(value) => setNewUser({ ...newUser, email: value })}
            InputLeftElement={
              <Icon
                as={<Ionicons name="person" size={24} color="black" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
          />
          <FormControl.ErrorMessage>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>

      <FormControl isRequired mb="3">
        <Stack>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            size="2xl"
            w="100%"
            type={showPassword ? "text" : "password"}
            value={newUser.password}
            onChangeText={(value) =>
              setNewUser({ ...newUser, password: value })
            }
            placeholder="Password"
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  as={
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="black"
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
          <FormControl.HelperText>
            Must be atleast 6 characters.
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            Atleast 6 characters are required.
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>

      <Button
        w="100%"
        isLoading={isLoading}
        onPress={isLoginForm ? login : handleCreateUser}
      >
        Entrar
      </Button>

      <Button size="sm" variant="link" onPress={toggleForm}>
        {isLoginForm ? "Criar conta" : "Fazer Login"}
      </Button>
    </Stack>
  );
}
