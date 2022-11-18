import { useState } from "react";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { useAppContext } from "./context/appContext";
import Spinner from "./Spinner";

const TodoItem = ({ item }) => {
  const { toggleTodoStatus } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (id) => {
    setIsLoading(true);
    toggleTodoStatus(id, setIsLoading);
  };

  return (
    <div
      className="bg-zinc-800 hover:bg-zinc-700 flex px-4 py-4 border text-white items-center m-3 mb-0 cursor-pointer relative"
      onClick={() => handleClick(item._id)}
    >
      {item.status === "completed" ? (
        <BsCheckCircleFill className="text-xl" />
      ) : (
        <BsCircle className="text-xl" />
      )}
      <p
        className={`px-3 text-xl max-w-70 truncate ${
          item.status === "completed" ? "line-through" : ""
        }`}
      >
        {item.todo}
      </p>

      {isLoading && (
        <Spinner todoItem />
      )}
    </div>
  );
};
export default TodoItem;
