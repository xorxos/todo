import { useAppContext } from "./context/appContext";

const Menu = () => {
  const { todoCount, clearCompleted } = useAppContext();

  return (
    <div className="bg-zinc-800 flex px-2 py-2 border mt-3 text-white items-center">
      <p>{todoCount} items</p>
      <div className="flex-grow"></div>
      <button
        type="button"
        className="hover:underline"
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};
export default Menu;
