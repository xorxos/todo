import { useEffect } from "react";
import { useAppContext } from "./context/appContext";
import TodoItem from "./TodoItem";
import Menu from "./Menu";

const TodoList = () => {
  const { todoList, getTodos } = useAppContext();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="bg-zinc-800 max-w-full flex flex-col justify-start">
      {todoList?.map((item, index) => (
        <TodoItem item={item} key={index} />
      ))}
      <Menu />
    </div>
  );
};
export default TodoList;
