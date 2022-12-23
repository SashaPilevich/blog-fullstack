import { ChangeEventHandler, useState } from "react";
import { generateUniqId } from "../../../mocks";
import { Input } from "../../Input";
import { emojies } from "../constants";
import { EmojiRow } from "../Item";
import style from "./style.module.css";

export const EmojiList = () => {
  const [text, setText] = useState("");
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };
  let filteredEmojies = emojies.filter((item) => {
    if (
      item.title.toLowerCase().includes(text.toLowerCase()) ||
      item.keywords.toLowerCase().includes(text.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
  return (
    <div className={style.container}>
      <Input value={text} onChange={handleOnChange} uniqType="primary" />
      <div className={style.emojiListContainer}>
        {filteredEmojies.map((item) => {
          return (
            <EmojiRow
              title={item.title}
              symbol={item.symbol}
              keywords={item.keywords}
              key={generateUniqId()}
            />
          );
        })}
      </div>
    </div>
  );
};
