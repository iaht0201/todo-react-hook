import { useState } from "react";
import Todo from "./pages/Todo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Todo />
    </div>
  );
}

export default App;
