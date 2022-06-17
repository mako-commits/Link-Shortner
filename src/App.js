import "./App.css";
import InputBox from "./Components/Input/InputBox";
import OutputBox from "./Components/Output/OutputBox";
import { useState } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <h1 className="app-name">URL Shortner</h1>
      <InputBox setInputValue={setInputValue} />
      <OutputBox inputValue={inputValue} />
    </div>
  );
}

export default App;
