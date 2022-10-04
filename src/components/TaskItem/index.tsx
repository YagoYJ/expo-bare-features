import { useEffect, useRef, useState } from "react";
import { Image, TextInput } from "react-native";
import { Box, Button, Divider, Input } from "native-base";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "../TasksList";

import { useTodo } from "../../contexts/TodoContext";

import { styles } from "./styles";

import trashIcon from "../../assets/icons/trash/trash.png";
import editIcon from "../../assets/icons/edit/edit.png";

interface TaskItemProps {
  index: number;
  task: Task;
}

export function TaskItem({ index, task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleUpdated, setTitleUpdated] = useState(task.title);

  const { toggleTodoDone, deleteTodo, updateTodo } = useTodo();

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTitleUpdated(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    if (!titleUpdated) {
      setTitleUpdated(task.title);
      setIsEditing(false);
    } else {
      updateTodo({ taskId: task.id, newTitle: titleUpdated });
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <Box style={styles.container}>
      <Box style={styles.labelContainer}>
        <Button
          variant="unstyled"
          testID={`button-${index}`}
          // activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTodoDone({ taskId: task.id })}
          disabled={task.done}
          //TODO - use onPress (toggle task) prop
        >
          <Box
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </Box>
        </Button>

        <Input
          variant="unstyled"
          value={titleUpdated}
          onChangeText={setTitleUpdated}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
          ref={textInputRef}
        />
      </Box>

      <Box style={styles.iconsContainer}>
        {isEditing ? (
          <>
            <Button variant="unstyled" onPress={handleCancelEditing}>
              <Icon name="x" size={24} color="#b2b2b2" />
            </Button>

            <Divider orientation="vertical" />

            <Button variant="unstyled" onPress={handleSubmitEditing}>
              <Icon name="check" size={24} color="#b2b2b2" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="unstyled" onPress={handleStartEditing}>
              <Image source={editIcon} />
            </Button>

            <Divider orientation="vertical" />

            <Button
              variant="unstyled"
              disabled={isEditing}
              onPress={() => deleteTodo({ taskId: task.id })}
            >
              <Image
                source={trashIcon}
                style={{ opacity: isEditing ? 0.2 : 1 }}
              />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
