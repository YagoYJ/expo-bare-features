import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useTodo } from "../../contexts/TodoContext";
import { styles } from "./styles";

export function TodoInput() {
  const [task, setTask] = useState("");
  const { createTodo } = useTodo();

  function handleAddNewTask() {
    //TODO - Call addTask if task not empty and clean input value
    if (!task) return;

    createTodo({ title: task });
    setTask("");
  }

  return (
    <Stack alignItems="center">
      <InputGroup mt={-28} style={styles.inputContainer}>
        <Input
          w={{
            base: "70%",
          }}
          _focus={{
            backgroundColor: "#ffffff",
          }}
          bg="#ffffff"
          placeholder="Adicionar novo todo..."
          placeholderTextColor="#B2B2B2"
          returnKeyType="send"
          selectionColor="#666666"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={handleAddNewTask}
        />

        <Button
          bg="#ffffff"
          testID="add-new-task-button"
          onPress={handleAddNewTask}
          _pressed={{
            backgroundColor: "purple.500",
          }}
          //TODO - onPress prop
        >
          <Icon name="chevron-right" size={24} color="#B2B2B2" />
        </Button>
      </InputGroup>
    </Stack>
  );
}
