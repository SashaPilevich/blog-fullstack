import { ChangeEventHandler, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { registration } from "../../http/userApi";

import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validation";
import { Button } from "../Button";
import { Input } from "../Input";
import { Preloader } from "../Preloader";
import style from "./style.module.css";
console.log(process.env.REACT_APP_API_URL);
export const Registration = () => {
  const { isDark } = useContext(Context);

  const [user, setUser] = useState("");
  const [userError, setUserError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const openPassword = () => {
    setShowPassword(false);
  };
  const closePassword = () => {
    setShowPassword(true);
  };

  const navigate = useNavigate();

  const handleUser: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateRequired(event.target.value); //if error TRUE
    if (error) {
      setUserError(error); //return description of error
    } else {
      setUserError("");
    }
    setUser(event.target.value);
    console.log(event.target.value);
  };
  const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateEmail(event.target.value); //if error TRUE
    if (error) {
      setEmailError(error); //return description of error
    } else {
      setEmailError("");
    }
    setEmail(event.target.value);
  };
  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validatePassword(event.target.value); //if error TRUE
    if (error) {
      setPasswordError(error); //return description of error
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };
  const handleConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const error = validateConfirmPassword(password, confirmPassword); //if error TRUE
    if (error) {
      setConfirmPasswordError(error); //return description of error
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(event.target.value);
  };

  ///регистрация по клику
  const onClickLogin = () => {
    setError("");
    // setIsLoading(true);
    const errors = {
      user: validateRequired(user),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setUserError(errors.user);
    setEmailError(errors.email);
    setPasswordError(errors.password);
    setConfirmPasswordError(errors.confirmPassword);

    const isValidForm = Object.values(errors).every((error) => error === "");

    if (isValidForm) {
      setError("");
      // const promise = async () => {
      //   const response = await registration(email, password);
      //   console.log(response);
      // };
      // let isOk = true;

      // promise
      //   .then((response) => {
      //     if (response.ok) {
      //       isOk = true;
      //     } else {
      //       isOk = false;
      //     }
      //     return console.log(response.json());
      //   })
      //   .then((json) => {
      //     if (isOk) {
      //       navigate("/registersuccess");
      //     }
      // } else {
      //   if (
      //     json?.username?.includes(
      //       "A user with that username already exists."
      //     )
      //   ) {
      //     setError("Пользователь с таким именем уже существует.");
      //     return;
      //   }
      //   if (json?.email?.includes("user with this Email already exists.")) {
      //     setError("Пользователь с таким email уже существует.");
      //     return;
      //   }
      //   if (
      //     json?.password?.includes(
      //       "This password is too short. It must contain at least 8 characters."
      //     )
      //   ) {
      //     setError("Пароль должен состоять не менее чем из 8 символов.");
      //     return;
      //   } else if (
      //     json?.password?.includes("This password is too common.")
      //   ) {
      //     setError("Этот пароль слишком распространен.");
      //     return;
      //   } else if (
      //     json?.password?.includes(
      //       "The password is too similar to the username."
      //     )
      //   ) {
      //     setError("Пароль слишком похож на имя пользователя.");
      //   }
      // }
    }
  };
  const promise = async () => {
    let response;
    response = await registration(email, password);
    navigate("/login");
    console.log(response);
  };
  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };
  const handleEmailFocus = () => {
    setEmailError("");
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(password);
    setPasswordError(error);
  };
  const handlePasswordFocus = () => {
    setPasswordError("");
  };

  const handleConfirmBlur = () => {
    const error = validateConfirmPassword(password, confirmPassword);
    setConfirmPasswordError(error);
  };
  const handleConfirmFocus = () => {
    setConfirmPasswordError("");
  };
  return (
    <div className={style.container}>
      {!isLoading ? (
        <>
          <div className={style.inputContainer}>
            <Input
              label="UserName"
              onChange={handleUser}
              value={user}
              uniqType={"inputForRegistration"}
              error={userError}
            />
          </div>
          <div className={style.inputContainer}>
            <Input
              label="Email"
              onChange={handleEmail}
              value={email}
              uniqType={"inputForRegistration"}
              error={emailError}
              onBlur={handleEmailBlur}
              onFocus={handleEmailFocus}
            />
          </div>

          {showPassword ? (
            <div className={style.inputPasswordShow} onClick={openPassword}>
              <Input
                uniqType="inputForRegistration"
                label="Password"
                onChange={handlePassword}
                value={password}
                error={passwordError}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                type="password"
              />
            </div>
          ) : (
            <div className={style.inputPasswordClose} onClick={closePassword}>
              <Input
                uniqType="inputForRegistration"
                label="Password"
                onChange={handlePassword}
                value={password}
                error={passwordError}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                type="text"
              />
            </div>
          )}

          <div className={style.inputContainer}>
            <Input
              label="Confirm Password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              uniqType={"inputForRegistration"}
              error={confirmPasswordError}
              onBlur={handleConfirmBlur}
              onFocus={handleConfirmFocus}
              type="password"
            />
          </div>
          <p
            className={`${style.textError} ${
              isDark ? style.darkTextError : ""
            }`}
          >
            {error}
          </p>
          <Button
            label="Register"
            onClick={promise}
            type={"buttonForRegistration"}
          />
          <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
            If you have account, you can{" "}
            <Link
              className={`${style.linkLogin} ${
                isDark ? style.darkLinkLogin : ""
              }`}
              to="/login"
            >
              Login
            </Link>
          </p>
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};
