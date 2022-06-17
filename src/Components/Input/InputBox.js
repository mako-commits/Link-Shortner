import { useState } from "react";
import styles from "./InputBox.module.css";
const InputBox = ({ setInputValue }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputUrl);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Enter a url link"
        value={inputUrl}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Shorten</button>
    </div>
  );
};

export default InputBox;
