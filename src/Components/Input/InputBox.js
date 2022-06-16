import { useState } from "react";
import styles from "./InputBox.module.css";
const InputBox = ({ setInputValue }) => {
  const [inputUrl, setInputUrl] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // async function fetchData(url) {
  //   try {
  //     setLoading(true);
  //     const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
  //       method: "POST",
  //       headers: {
  //         Authorization: "Bearer 874b760c3976361f07dc368254802eceee527d1a",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         long_url: `${url}`,
  //         // domain: "bit.ly",
  //         // group_guid: "Ba1bc23dE4F",
  //       }),
  //     });
  //     return res.json();
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputUrl);

    // fetchData(inputUrl).then((data) => {
    //   console.log(data.link);
    //   setShortenLink(data.link);
    // });
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>Ooops....something is'nt right</p>;
  // }
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="Enter a url link"
        value={inputUrl}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default InputBox;
