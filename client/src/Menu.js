import { useAppContext } from "./context/appContext";

const Menu = () => {
  const { totalItems } = useAppContext();

  return (
    <div className="bg-zinc-800 flex px-2 py-2 border text-white items-center">
      <p>{totalItems} items</p>
      <div className="flex-grow"></div>
      <button type="button" className="hover:underline">
        Clear Completed
      </button>
    </div>
  );
};
export default Menu;
