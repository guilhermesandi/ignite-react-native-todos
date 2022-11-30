import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'
import closeIcon from '../assets/icons/close/close.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TasksItem({ task, index, toggleTaskDone, editTask, removeTask }: TasksItemProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditable(true);
  }

  function handleCancelEditing() {
    setNewTitle(task.title);
    setIsEditable(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, newTitle)
    setIsEditable(false);
  }

  useEffect(() => {
    if (isEditable) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditable]);

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditable}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: 24, width: 24, marginRight: 12, justifyContent: 'center', alignItems: 'center' }}>
          {isEditable ? (
            <TouchableOpacity
              testID={`x-${index}`}
              onPress={handleCancelEditing}
            >
              <Image source={closeIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              testID={`trash-${index}`}
              onPress={handleStartEditing}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ width: 1, height: 24, backgroundColor: '#C4C4C4' }} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, paddingLeft: 12 }}
          disabled={isEditable}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={isEditable && { opacity: 0.2 }} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})