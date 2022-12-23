import { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "../Input";
import style from "./style.module.css";

export const Converter = () => {
  const [usd, setUsd] = useState("");
  const [byn, setByn] = useState("");
  const [activeRate, setActiveRate] = useState(0);

  useEffect(() => {
    const promise = fetch("https://www.nbrb.by/api/exrates/rates/431");
    promise
      .then((response) => {
        return response.json();
      })
      .then((value) => {
        setActiveRate(value.Cur_OfficialRate);
      });
  }, []);

  useEffect(() => {
    const num = +byn;
    if (!isNaN(num) && activeRate !== 0) {
      setUsd(String(num / activeRate));
    }
  }, [byn]);

  useEffect(() => {
    const num = +usd;
    if (!isNaN(num) && activeRate !== 0) {
      setByn(String(num * activeRate));
    }
  }, [usd]);

  const handleOnChangeUsd: ChangeEventHandler<HTMLInputElement> = (event) => {
    const num = Number(event.target.value);
    if (!isNaN(num)) {
      setUsd(event.target.value);
    }
  };
  const handleOnChangeByn: ChangeEventHandler<HTMLInputElement> = (event) => {
    const num = Number(event.target.value);
    if (!isNaN(num)) {
      setByn(event.target.value);
    }
  };
  return (
    <div className={style.container}>
      <h2>Live currency converter</h2>
      <fieldset>
        <legend>Enter currency in $,USD: </legend>
        <Input
          onChange={handleOnChangeUsd}
          value={usd}
          uniqType={"inputForConverter"}
          type="text"
        />
      </fieldset>
      <fieldset>
        <legend>Enter currency in BYN:</legend>
        <Input
          onChange={handleOnChangeByn}
          value={byn}
          uniqType={"inputForConverter"}
          type="text"
        />
      </fieldset>
    </div>
  );
};

//первоначальное решение

// export const Converter = () => {
//   const [usd, setUsd] = useState("");
//   const [byn, setByn] = useState("");

//   const handleOnChangeUsd: ChangeEventHandler<HTMLInputElement> = (event) => {
//     const num = Number(event.target.value);
//     if (!isNaN(num)) {
//       setUsd(event.target.value);
//       setByn(`${num * 2.55}`);
//     }
//   };
//   const handleOnChangeByn: ChangeEventHandler<HTMLInputElement> = (event) => {
//     const num = Number(event.target.value);
//     if (!isNaN(num)) {
//       setByn(event.target.value);
//       setUsd(`${num / 2.55}`);
//     }
//   };
//   return (
//     <div className={style.container}>
//       <h2>Live currency converter</h2>
//       <fieldset>
//         <legend>Enter currency in $,USD: </legend>
//         <Input
//           onChange={handleOnChangeUsd}
//           value={usd}
//           uniqType={"inputForConverter"}
//           type="text"
//         />
//       </fieldset>
//       <fieldset>
//         <legend>Enter currency in BYN:</legend>
//         <Input
//           onChange={handleOnChangeByn}
//           value={byn}
//           uniqType={"inputForConverter"}
//           type="text"
//         />
//       </fieldset>
//     </div>
//   );
// };
