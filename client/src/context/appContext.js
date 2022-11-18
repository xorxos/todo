import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState("");

  const baseURL = "/api/v1";

  const displayAlert = (message, type) => {
    setAlertText(message);
    setAlertType(type);
  };

  const getTodos = async () => {
    setIsLoading(true);

    try {
      const { data } = axios.get(baseURL + "/todos");
      const { todoItems, totalItems } = data;
      console.log(todoItems);

      setTodoList(todoItems);
      setTotalItems(totalItems);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      displayAlert(error.response.data.message, "danger");
    }
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        totalItems,
        isLoading,
        alertText,
        alertType,
        displayAlert,
        getTodos,
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
