import { TbCornerRightDown } from "react-icons/tb";

const Form = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("create todo");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <input
        className="shadow flex-1 appearance-none border rounded-l-md my-8 py-3 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
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
