import style from "./Ellipsis.module.scss";

export default function Ellipsis() {
  return (
    <div className={style.ellipsis}>
      <button className={style.ellipsis__edit}>Edit task</button>
      <button className={style.ellipsis__delete}>Delete task</button>
    </div>
  );
}
