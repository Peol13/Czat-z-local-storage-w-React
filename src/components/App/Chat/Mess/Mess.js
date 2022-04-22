import styles from "./Mess.module.css";

function Mess({ nick, mes, time }) {
  return (
    <div>
      <p>
        {" "}
        <span className={styles.nick}>{nick} </span> <span className={styles.space}>o</span> {mes}{" "}
        <span className={styles.space}>o</span> {time[0] + ":"}
        {time[1] + ":"}
        {time[2]}{" "}
      </p>
    </div>
  );
}

export default Mess;
