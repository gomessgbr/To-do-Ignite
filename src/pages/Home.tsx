import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundedSameTask = tasks.find((task) => newTaskTitle === task.title);
    if (foundedSameTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((prevState) => [...prevState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const findTask = updatedTasks.find((task) => task.id === id);
    if (!findTask) return;
    findTask.done = !findTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const removedTask = tasks.filter((task) => task.id !== id);
    setTasks(removedTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
