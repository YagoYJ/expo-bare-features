import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, Text } from "native-base";
import { useMutation } from "react-query";

import { MainButton } from "../../components/Form/MainButton";
import { Form } from "../../components/Form/Form";
import { MainInput } from "../../components/Form/MainInput";

import { StackScreen } from "../../types/stack.navigation";

import { createUser } from "../../integration/Login/createUser";

import { envs } from "../../../environments";

export function Login() {
  const navigation = useNavigation<StackScreen>();
  const [username, setUsername] = useState("");

  async function verifyUser() {
    try {
      const value = "yagoyj";

      if (value !== null) {
        return navigation.navigate("Home");
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  const { mutate, isLoading } = useMutation("createUser", createUser, {
    onSuccess: async () => {
      try {
        navigation.navigate("Home");
      } catch (error) {
        console.log({ error });
      }
    },
    onError: () => {
      navigation.navigate("Home");
    },
    onSettled: async () => {
      try {
        navigation.navigate("Home");
      } catch (error) {
        console.log({ error });
      }
    },
  });

  function onSubmit(data: string) {
    const user = {
      name: data,
      username: data,
    };

    mutate(user);
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center" w="100%" px="5%">
      <Form>
        <Heading mb="3">Login</Heading>

        <MainInput
          label="Username"
          placeholder="YJKiller00"
          value={username}
          handleChangeText={(value) => setUsername(value)}
          onSubmitEditing={() => onSubmit(username)}
          required
        />

        <MainButton
          text="Entrar"
          handlePress={() => onSubmit(username)}
          bgColor="green.600"
          isDisabled={isLoading || !!!username.trim()}
        />
      </Form>

      <Text>Current Env: {process.env.CURRENT_ENV}</Text>
      <Text>Ambiente: {envs.ENV_TEST}</Text>
    </Box>
  );
}
