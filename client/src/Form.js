import { useState } from "react";
import { TbCornerRightDown } from "react-icons/tb";
import { useAppContext } from "./context/appContext";

const Form = () => {
  const { createTodo, displayAlert } = useAppContext();
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      displayAlert("You cannot create a blank todo!", "danger");
      return;
    }

    createTodo(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <input
        className="shadow flex-1 appearance-none border rounded-l-md my-8 py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Create a new todo..."
      />
      <button
        type="submit"
        title="add todo"
        className="text-white text-2xl rounded-r-md border my-8 py-2.5 px-4"
      >
        <TbCornerRightDown />
      </button>
    </form>
  );
};
export default Form;
