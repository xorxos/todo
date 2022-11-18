import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { useAppContext } from "./context/appContext";

const TodoItem = ({ item }) => {
  const { toggleTodoStatus } = useAppContext();
  return (
    <div
      className="bg-zinc-800 hover:bg-zinc-700 flex px-4 py-4 border text-white items-center m-3 mb-0 cursor-pointer"
      onClick={() => toggleTodoStatus(item._id)}
    >
      {item.status === "completed" ? (
        <BsCheckCircleFill className="text-xl" />
      ) : (
        <BsCircle className="text-xl" />
      )}
      <p className={`px-3 text-xl m-w-1/2 whitespace-nowrap truncate ${item.status === "completed" ? "line-through" : ""}`}>
        {item.todo}
      </p>
    </div>
  );
};
export default TodoItem;
