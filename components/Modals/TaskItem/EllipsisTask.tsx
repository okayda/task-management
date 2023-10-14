import style from "./EllipsisTask.module.scss";

export default function EllipsisTask() {
  return (
    <div className={style.ellipsisTask}>
      <button className={style.ellipsisTask__primary}>Edit task</button>
      <button className={style.ellipsisTask__secondary}>Delete task</button>
    </div>
  );
}
