import { useContext } from "react";
import { Context } from "../../App";
import style from "./style.module.css";

// interface IUser {
//   userName: string;
// }

// const getUser = (userName: string) => {
//   let str = userName.split(" ");
//   let result = str.map((item) => item[0].toUpperCase());
//   return result;
// };

// export const User = (props: IUser) => {
//   const { isDark } = useContext(Context);
//   return (
//     <div className={style.mainContainer}>
//       <div
//         className={`${style.userContainer} ${
//           isDark ? style.darkUserContainer : ""
//         }`}
//       >
//         <div
//           className={`${style.userShort} ${isDark ? style.darkUserShort : ""}`}
//         >
//           {getUser(props.userName)}
//         </div>
//         <p className={style.userFull}>{props.userName}</p>
//       </div>
//     </div>
//   );
// };
