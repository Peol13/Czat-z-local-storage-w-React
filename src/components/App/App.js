import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Mess from "./Chat/Mess/Mess";

function App() {
  const [chatList, setChatList] = useState([]);
  const [fullTime, setFullTime] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [nickValue, setNickValue] = useState("");
  const [isErrorMesage, setIsErrorMessage] = useState();

  useEffect(() => {
    const message = localStorage.getItem("Wiadomosc");
    if (message) {
      setChatList(JSON.parse(message));
    }
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };
  const handleNickChange = (event) => {
    const { value } = event.target;
    setNickValue(value);
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    let date = new Date();
    let fullDate = [date.getHours(), date.getMinutes(), date.getSeconds()];
    setFullTime(date, fullTime);

    setInputValue("");

    if (nickValue === "" && inputValue === "") {
      setIsErrorMessage(3);
    } else if (nickValue === "") {
      setIsErrorMessage(2);
    } else if (inputValue === "") {
      setIsErrorMessage(1);
    } else {
      setIsErrorMessage(0);
      const newTodos = [
        ...chatList,
        {
          nick: nickValue,
          name: inputValue,
          time: fullDate,
        },
      ];
      setChatList(newTodos);
      localStorage.setItem("Wiadomosc", JSON.stringify(newTodos));
    }
  };
  const clearLocalStorage = () => {
    if (window.localStorage.length > 0) {
      window.localStorage.clear();
      window.location.reload(false);
    }
  };

  return (
    <div className={styles.conteiner}>
      <span className={styles.logo}>Komunikator </span>
      <div className={styles.messconteiner}>
        {chatList.map((mes, index) => (
          <Mess key={index} mes={mes.name} nick={mes.nick} time={mes.time} />
        ))}
      </div>

      <form action="" onSubmit={handleButtonClick}>
        <input
          type="text"
          className={styles.inputNick}
          placeholder="Twój nick"
          value={nickValue}
          onChange={handleNickChange}
        />
        <input
          type="text"
          className={styles.inputText}
          placeholder="Napisz wiadomość"
          value={inputValue}
          onChange={handleInputChange}
        />

        <button className={styles.button} type="submit">
          Wyślij
        </button>
        <button className={styles.button} onClick={clearLocalStorage}>
          Wyczyść
        </button>
        {isErrorMesage === 1 ? (
          <p className={styles.error}> Wypełnij pole na wiadomość ! </p>
        ) : (
          isErrorMesage === 0
        )}
        {isErrorMesage === 2 ? (
          <p className={styles.error}> Wypełnij pole na nick ! </p>
        ) : (
          isErrorMesage === 0
        )}
        {isErrorMesage === 3 ? (
          <p className={styles.error}> Wypełnij oba pola ! </p>
        ) : (
          isErrorMesage === 0
        )}
      </form>
    </div>
  );
}
export default App;
