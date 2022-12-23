import React from "react";
import { useState } from "react";
import { Button } from "../Button";

export const Clicker = () => {
  let [clickCount, setClickCount] = useState(0);

  const onClickPlus = () => {
    setClickCount(clickCount + 1);
  };
  const onClickMinus = () => {
    setClickCount(clickCount - 1);
  };

  return (
    <div>
      {clickCount >= 10 && (
        <div>
          <h2>Слишком много кликов</h2>
          <Button
            label={"-"}
            onClick={onClickMinus}
            type="secondary"
            disabled={false}
          />
        </div>
      )}
      {clickCount <= 0 && (
        <div>
          <h2>Нажми на +</h2>
          <Button
            label={"+"}
            onClick={onClickPlus}
            type="primary"
            disabled={false}
          />
        </div>
      )}
      {clickCount > 0 && clickCount < 10 && (
        <div>
          <h2>{clickCount}</h2>
          <Button
            label={"+"}
            onClick={onClickPlus}
            type="primary"
            disabled={false}
          />
          <Button
            label={"-"}
            onClick={onClickMinus}
            type="secondary"
            disabled={false}
          />
        </div>
      )}
    </div>
  );
};
