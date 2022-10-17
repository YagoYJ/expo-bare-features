import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  Box,
  Heading,
  Button,
  Icon,
  Pressable,
  Stack,
  useToast,
} from "native-base";
import auth from "@react-native-firebase/auth";

import { CustomAlert } from "../../../components/CustomAlert";
import { MainInput } from "../../../components/Form/MainInput";

type NewUser = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface FirebaseCreateAccountProps {
  toggleForm: () => void;
}

export function FirebaseCreateAccount({
  toggleForm,
}: FirebaseCreateAccountProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useToast();

  function handleCreateUser() {
    if (newUser.password !== newUser.confirmPassword) {
      return toast.show({
        placement: "top",
        render: () => (
          <CustomAlert
            text="Confirm password must be the same as the password."
            status="error"
          />
        ),
      });
    }

    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        toast.show({
          placement: "top",
          render: () => <CustomAlert text="User created!" status="success" />,
        });
      })
      .catch((error) => console.log(error))
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

            <MainInput
              required
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Must be atleast 6 characters"
              value={newUser.confirmPassword}
              error={null}
              handleChangeText={(value) =>
                setNewUser({ ...newUser, confirmPassword: value })
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
              onPress={handleCreateUser}
              mt="auto"
            >
              Sign Up
            </Button>

            <Button size="sm" variant="link" onPress={toggleForm}>
              Go to Login
            </Button>
          </Stack>
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
}
