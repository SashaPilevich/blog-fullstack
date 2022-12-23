import style from "./style.module.css";

interface IProps {
  title: string;
  symbol: string;
  keywords: string;
}

export const EmojiRow = (props: IProps) => {
  return (
    <div className={style.emojiItem}>
      <div className={style.emojiSymbol}>{props.symbol}</div>
      <h4>{props.title}</h4>
    </div>
  );
};
