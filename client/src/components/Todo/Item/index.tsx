import { Button } from "../../Button";
import { Input } from "../../Input";
import style from "./style.module.css";

interface IItem {
  title: string;
  onClickRemove: () => void;
  onClickChecked: () => void;
}

export const ItemOfMyTodo = (props: IItem) => {
  return (
    <div className={style.containerItem}>
      <h2 className={style.titleItem}>{props.title}</h2>
      <div className={style.forBtn}>
        <Input
          onChange={props.onClickChecked}
          value={""}
          uniqType={"checkbox"}
          type="checkbox"
        />
        <Button type="delete" onClick={props.onClickRemove} label="Удалить" />
      </div>
    </div>
  );
};
