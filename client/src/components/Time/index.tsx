import { useEffect, useState } from "react";
import style from "./style.module.css";
export const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <div className={style.container}>{time}</div>;
};

//первоначальное решение

// export const generateTime = () => {
//   const currentTime = new Date();
//   let hour: string | number = currentTime.getHours();
//   if (hour < 10) {
//     hour = "0" + hour;
//   }
//   let minute: string | number = currentTime.getMinutes();
//   if (minute < 10) {
//     minute = "0" + minute;
//   }
//   let seconds: string | number = currentTime.getSeconds();
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }

//   return `${hour}:${minute}:${seconds}`;
// };

// export const Time = () => {
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setTime(generateTime());
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);
//   return <div className={style.container}>{time}</div>;
// };
