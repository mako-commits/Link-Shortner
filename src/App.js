import "./App.css";
import InputBox from "./Components/Input/InputBox";
import OutputBox from "./Components/Output/OutputBox";
import { useState } from "react";
function App() {
  // const [shortenLink, setShortenLink] = useState("");
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <h1>URL Shortner</h1>
      <InputBox setInputValue={setInputValue} />
      <OutputBox inputValue={inputValue} />
    </div>
  );
}

export default App;
