import React from 'react';
import { FlatList } from 'react-native';

import { TasksItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TasksItem
            task={item}
            index={index}
            removeTask={removeTask}
            toggleTaskDone={toggleTaskDone}
          />
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
