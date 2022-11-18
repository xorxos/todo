import Title from "./Title";
import Form from "./Form";
import TodoList from "./TodoList";
import Alert from "./Alert";
import { useEffect } from "react";
import { useAppContext } from "./context/appContext";

function App() {
  const { getTodos } = useAppContext();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-items-center bg-zinc-900">
      <div className="min-w-1/2 m-8">
        <Title />
        <Form />
        <TodoList />
        <Alert />
      </div>
    </main>
  );
}

export default App;
