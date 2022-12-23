import style from "./style.module.css";

export const Preloader = () => {
  return (
    <div className={style.spinWrapper}>
      <div className={style.spinner}></div>
    </div>
  );
};
