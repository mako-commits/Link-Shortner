import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./OutputBox.module.css";
const OutputBox = ({ inputValue }) => {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [text, setText] = useState("Copied");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchData(url) {
    try {
      setLoading(true);
      const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: `${url}`,
          domain: "bit.ly",
        }),
      });
      return res.json();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  const validUrl = (url) => {
    let regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return regexp.test(url);
  };
  useEffect(() => {
    if (validUrl(inputValue)) {
      fetchData(inputValue).then((data) => {
        // console.log(data.link);
        setShortenLink(data.link);
      });
    } else alert("Invalid URL : " + inputValue);
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
      setText("Copy");
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Ooops....something is'nt right</p>;
  }

  const handleCopy = () => {
    setCopied(true);
    setText("Copied");
  };
  return (
    <>
      {shortenLink && (
        <div className={styles.result}>
          <p>{shortenLink}</p>
          <CopyToClipboard text={shortenLink} onCopy={handleCopy}>
            <button className={copied ? styles.copied : ""}>{text}</button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default OutputBox;
