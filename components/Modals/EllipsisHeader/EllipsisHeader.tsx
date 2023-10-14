import style from "./EllipsisHeader.module.scss";

export default function EllipsisHeader() {
  return (
    <div className={style.ellipsisHeader}>
      <button className={style.ellipsisHeader__primary}>Edit Board</button>
      <button className={style.ellipsisHeader__secondary}>Delete Board</button>
    </div>
  );
}
