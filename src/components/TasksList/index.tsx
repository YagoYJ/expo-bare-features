import React from "react";
import { FlatList } from "react-native";

import { ItemWrapper } from "../ItemWrapper";
import { TaskItem } from "../TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface EditTaskProps {
  taskId: string;
  newTitle: string;
}

interface TasksListProps {
  tasks: Task[];
}

export function TasksList({ tasks }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper>
            <TaskItem key={item.id} index={index} task={item} />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
