import Title from "./Title";
import Form from "./Form";
import TodoList from "./TodoList";

function App() {
 

  return (
    <main className="min-h-screen flex flex-col items-center justify-items-center bg-zinc-900">
      <div className="max-w-1/2 m-8">
        <Title />
        <Form />
        <TodoList /> 
      </div>
    </main>
  );
}

export default App;
