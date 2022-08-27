import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Heading, Icon, Pressable } from "native-base";

import { MainButton } from "../../components/Form/MainButton";
import { Form } from "../../components/Form/Form";
import { MainInput } from "../../components/Form/MainInput";

import { StackScreen } from "../../types/stack.navigation";

type FormData = {
  login: string;
  password: string;
};

export function Login() {
  const navigation = useNavigation<StackScreen>();
  const [formValues, setFormValues] = useState<FormData>({
    login: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormData>({
    login: "",
    password: "",
  });

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  function handleSubmit() {
    console.log({ formValues });
    navigation.navigate("Home");
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center" w="100%" px="5%">
      <Form>
        <Heading mb="3">Login</Heading>

        <MainInput
          label="Username or Email"
          placeholder="YagoYJ"
          value={formValues.login}
          error={formErrors.login}
          handleChangeText={(value) =>
            setFormValues({ ...formValues, login: value })
          }
          InputLeftElement={
            <Icon as={<MaterialIcons name="person" />} mx={2} />
          }
          required
        />

        <MainInput
          label="Password"
          placeholder="Minimum 8 digits"
          value={formValues.password}
          error={formErrors.password}
          handleChangeText={(value) =>
            setFormValues({ ...formValues, password: value })
          }
          onSubmitEditing={handleSubmit}
          type={passwordIsVisible ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
              <Icon
                as={
                  <MaterialIcons
                    name={passwordIsVisible ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          required
        />

        <MainButton
          text="Entrar"
          handlePress={handleSubmit}
          bgColor="green.600"
        />
      </Form>
    </Box>
  );
}
