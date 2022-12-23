import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { generateUniqId } from "../../../mocks";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { HotAir } from "../HotAir";
import { ItemOfMyTodo } from "../Item";
import style from "./style.module.css";

interface ITodoList {
  id: string;
  title: string;
  checked: boolean;
}
export const ListOfMyTodo = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<ITodoList[]>([]);
  const inputRef = useRef<any>(null);

  const handleOnChangeTitle: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  const addTodo = () => {
    if (title.length < 2) {
      alert("Пропишите название дела");
      return;
    }
    const newTodoItem = {
      title: title,
      id: generateUniqId(),
      checked: false,
    };
    const newTodos = [...todos, newTodoItem];
    setTodos(newTodos);
    setTitle("");

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };
  const removeTodo = (id: string) => {
    const newTodo = todos.filter((item) => {
      if (id === item.id) {
        return false;
      }
      return true;
    });
    setTodos(newTodo);
  };
  const checkTodo = (id: string) => {
    const newTodo = todos.map((item) => {
      if (item.id === id) {
        if (item.checked) {
          item.checked = false;
        } else {
          item.checked = true;
        }
        return item;
      }
      return item;
    });
    setTodos(newTodo);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className={style.containerList}>
      <div className={style.container}>
        <HotAir />
        <div className={style.start}>
          <h2 className={style.title}>Добавьте несколько дел</h2>
          <p className={style.text}>и сделайте ваш день продуктивным...</p>
          <div className={style.controlPanel}>
            <Input
              uniqType="primary"
              value={title}
              onChange={handleOnChangeTitle}
              placeholder="Название вашего важного дела"
              refObj={inputRef}
            />
            {title.length > 1 ? (
              <Button label={"Добавить"} onClick={addTodo} type={"primary"} />
            ) : null}
          </div>
          {todos.map((item) => {
            const onClickRemove = () => {
              removeTodo(item.id);
            };
            const onClickChecked = () => {
              checkTodo(item.id);
            };
            return (
              <ItemOfMyTodo
                title={item.title}
                key={item.id}
                onClickRemove={onClickRemove}
                onClickChecked={onClickChecked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
