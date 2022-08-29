import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading } from "native-base";
import { useMutation } from "react-query";

import { MainButton } from "../../components/Form/MainButton";
import { Form } from "../../components/Form/Form";
import { MainInput } from "../../components/Form/MainInput";

import { StackScreen } from "../../types/stack.navigation";
import { queryClient } from "../../services/queryClient";

import { createUser } from "../../integration/Login/createUser";

export function Login() {
  const navigation = useNavigation<StackScreen>();
  const [username, setUsername] = useState("");

  const { mutate, isLoading } = useMutation("createUser", createUser, {
    onSuccess: () => {
      navigation.navigate("Home");
    },
    onError: () => {
      navigation.navigate("Home");
    },
    onSettled: () => {
      queryClient.invalidateQueries("createUser");
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
    </Box>
  );
}
