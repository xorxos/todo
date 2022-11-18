import { BsCheckCircleFill, BsCircle } from "react-icons/bs";

const TodoItem = ({ item }) => {
  if (item.status === "completed") {
    return (
      <div className="bg-zinc-800 hover:bg-zinc-700 flex px-4 py-4 border text-white items-center m-3 mb-0 cursor-pointer">
        <BsCircle className="text-xl" />
        <p className="px-3 text-xl m-w-1/2 whitespace-nowrap truncate">
          Create Portfolio asdfjd skafadjf lksajflksja dklf
        </p>
      </div>
    );
  } else {
    return (
      <div className="bg-zinc-800 hover:bg-zinc-700 flex px-4 py-4 border text-white items-center m-3 last:mb-3 cursor-pointer">
        <BsCheckCircleFill className="text-xl" />
        <p className="px-3 text-xl m-w-1/2 whitespace-nowrap truncate line-through">
          Create Portfolio asdfjd skafadjf lksajflksja dklf
        </p>
      </div>
    );
  }
};
export default TodoItem;
