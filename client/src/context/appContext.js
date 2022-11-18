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
    setIsLoading(true);
    console.log("getting todos");

    const url = baseURL + "/todos";

    try {
      const { data } = await axios.get(url);
      const { todoItems, totalItems } = data;

      setTodoList(todoItems);
      setTodoCount(totalItems);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      displayAlert(error, "danger");
    }
  };

  const createTodo = async (todo) => {
    setIsLoading(true);

    try {
      await axios.post(baseURL + "/todos", { todo });
      setIsLoading(false);
      getTodos();
      displayAlert("Todo created", "success");
    } catch (error) {
      setIsLoading(false);
      displayAlert(error, "danger");
    }
  };

  const toggleTodoStatus = async (id) => {
    setIsLoading(true);

    try {
      await axios.patch(baseURL + `/todos/${id}`);
      setIsLoading(false);
      getTodos();
      displayAlert("Todo updated!", "success");
    } catch (error) {
      setIsLoading(false);
      displayAlert(error, "danger");
    }
  };

  const clearCompleted = async () => {
    setIsLoading(true);

    try {
      await axios.post(baseURL + "/todos/clear");
      setIsLoading(false);
      getTodos();
      displayAlert("Completed todos have been cleared!", "success");
    } catch (error) {
      setIsLoading(false);
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
