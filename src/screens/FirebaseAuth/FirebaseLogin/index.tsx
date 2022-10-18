import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, Heading } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import auth from "@react-native-firebase/auth";
import { Button, Icon, Pressable, Stack } from "native-base";
import { MainInput } from "../../../components/Form/MainInput";
import { useNavigation } from "@react-navigation/native";

type User = {
  email: string;
  password: string;
};

interface FirebaseLoginProps {
  toggleForm: () => void;
}

export function FirebaseLogin({ toggleForm }: FirebaseLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newUser, setNewUser] = useState<User>({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  function handleLogin() {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => navigation.navigate("FirebaseAuthenticated"))
      .catch((err) => console.log({ err }))
      .finally(() => setIsLoading(false));
  }

  return (
    <Box px="24px" pb="24px" flex={1}>
      <KeyboardAwareScrollView>
        <Stack
          space="10"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          mt="10"
        >
          <Heading>Create account</Heading>

          <Stack space={4} w="100%">
            <MainInput
              required
              keyboardType="email-address"
              label="E-mail"
              placeholder="example@email.com"
              value={newUser.email}
              error={null}
              handleChangeText={(value) =>
                setNewUser({ ...newUser, email: value })
              }
              InputLeftElement={
                <Icon
                  as={<Ionicons name="person" size={24} color="black" />}
                  size={5}
                  mx="2"
                  color="muted.400"
                />
              }
            />

            <MainInput
              required
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Must be atleast 6 characters"
              value={newUser.password}
              error={null}
              handleChangeText={(value) =>
                setNewUser({ ...newUser, password: value })
              }
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
          </Stack>

          <Stack w="100%" alignItems="center">
            <Button
              w="100%"
              isLoading={isLoading}
              onPress={handleLogin}
              mt="auto"
            >
              Sign Up
            </Button>

            <Button size="sm" variant="link" onPress={toggleForm}>
              Go to Create Account
            </Button>
          </Stack>
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
}
