import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";
import style from "./style.module.css";

export const Timer = () => {
  const [count, setCount] = useState(0);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        return setCount((state) => state + 1);
      }, 1000);
    }
  };
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
  };
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    setCount(0);
  };
  return (
    <div className={style.container}>
      <h3 className={style.count}>{count}</h3>
      <Button label={"Start"} onClick={startTimer} type={"forTimer"} />
      <Button label={"Stop"} onClick={stopTimer} type={"forTimer"} />
      <Button label={"Reset"} onClick={resetTimer} type="forTimer" />
    </div>
  );
};

//первоначальное решение

// let intervalId: string | number | NodeJS.Timer | undefined;

// export const Timer = () => {
//   const [count, setCount] = useState(0);
//   const [isStart, setIsStart] = useState(false);

//   const startTimer = () => {
//     if (!isStart) {
//       intervalId = setInterval(() => {
//         return setCount((state) => state + 1);
//       }, 1000);
//     }
//     return setIsStart(true);
//   };
//   const stopTimer = () => {
//     if (isStart) {
//       clearInterval(intervalId);
//     }
//     return setIsStart(false);
//   };
//   const resetTimer = () => {
//     clearInterval(intervalId);
//     setCount(0);
//     return setIsStart(false);
//   };
//   return (
//     <div className={style.container}>
//       <h3 className={style.count}>{count}</h3>
//       <Button label={"Start"} onClick={startTimer} type={"forTimer"} />
//       <Button label={"Stop"} onClick={stopTimer} type={"forTimer"} />
//       <Button label={"Reset"} onClick={resetTimer} type="forTimer" />
//     </div>
//   );
// };
