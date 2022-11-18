import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoCount, setTodoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  const baseURL = "/api/v1";

  const displayAlert = (message, type) => {
    setAlertText(message);
    setAlertType(type);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const getTodos = async () => {
    const url = baseURL + "/todos";

    try {
      const { data } = await axios.get(url);
      const { todoItems, totalItems } = data;

      setTodoList(todoItems);
      setTodoCount(totalItems);
    } catch (error) {
      displayAlert(error, "danger");
    }
  };

  const createTodo = async (todo, isCreating) => {
    try {
      const { data } = await axios.post(baseURL + "/todos", { todo });
      const { updatedTodoList, totalItems } = data;

      setTodoList(updatedTodoList);
      setTodoCount(totalItems);
      isCreating(false);
      displayAlert("Todo created", "success");
    } catch (error) {
      isCreating(false);
      displayAlert(error, "danger");
    }
  };

  const toggleTodoStatus = async (id, setIsItemLoading) => {
    try {
      const { data } = await axios.patch(baseURL + `/todos/${id}`);
      const { updatedTodoList, totalItems } = data;

      setTodoList(updatedTodoList);
      setTodoCount(totalItems);
      setIsItemLoading(false);
      displayAlert("Todo updated!", "success");
    } catch (error) {
      setIsItemLoading(false);
      displayAlert(error, "danger");
    }
  };

  const clearCompleted = async (setClearCompletedLoading) => {
    try {
      const { data } = await axios.post(baseURL + "/todos/clear");
      const { updatedTodoList, totalItems } = data;

      setTodoList(updatedTodoList);
      setTodoCount(totalItems);
      setClearCompletedLoading(false);
      displayAlert("Completed todos have been cleared!", "success");
    } catch (error) {
      setClearCompletedLoading(false);
      displayAlert(error, "danger");
    }
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        todoCount,
        isLoading,
        alertText,
        alertType,
        displayAlert,
        getTodos,
        createTodo,
        toggleTodoStatus,
        clearCompleted,
        showAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
