import { useAppContext } from "./context/appContext";

const Alert = () => {
  const { isLoading, showAlert, alertText, alertType } = useAppContext();
  if (showAlert)
    return (
      <div
        className={`px-4 py-4 my-4 text-center min-w-full rounded-md ${
          alertType === "success"
            ? "bg-green-400 text-green-800"
            : " bg-red-400 text-red-800"
        }`}
      >
        {alertText}
      </div>
    );
};
export default Alert;
