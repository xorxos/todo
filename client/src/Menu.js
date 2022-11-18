import { useState } from "react";
import { useAppContext } from "./context/appContext";
import Spinner from "./Spinner";

const Menu = () => {
  const { todoCount, clearCompleted } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    clearCompleted(setIsLoading);
  }

  return (
    <div className="bg-zinc-800 flex px-2 py-2 border mt-3 text-white items-center">
      <p>{todoCount} items</p>
      <div className="flex-grow"></div>
      {isLoading ? (
        <Spinner clearCompleted />
      ) : (
        <button
          type="button"
          className="hover:underline"
          onClick={handleClick}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};
export default Menu;
