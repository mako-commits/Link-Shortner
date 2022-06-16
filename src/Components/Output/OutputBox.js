import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styles from "./OutputBox.module.css";
const OutputBox = ({ inputValue }) => {
  //   console.log(inputUrl);
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
          Authorization: "Bearer 874b760c3976361f07dc368254802eceee527d1a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: `${url}`,
          // domain: "bit.ly",
          // group_guid: "Ba1bc23dE4F",
        }),
      });
      return res.json();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue).then((data) => {
        console.log(data.link);
        setShortenLink(data.link);
      });
    }
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
