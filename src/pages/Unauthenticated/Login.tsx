import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading } from "native-base";
import { useMutation } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    onSuccess: async () => {
      try {
        await AsyncStorage.setItem("@username", username);
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
        await AsyncStorage.setItem("@username", username);
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
    </Box>
  );
}
