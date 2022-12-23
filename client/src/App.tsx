import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "./router";
import userEvent from "@testing-library/user-event";
import { IUser } from "./types/auth";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { Preloader } from "./components/Preloader";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { check } from "./http/userApi";

export const Context = createContext<{
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  user: IUser | null;
  setUser: (value: IUser | null) => void;
  // user: boolean;
  // setUser: (value: boolean) => void;
}>({
  isDark: false,
  setIsDark: () => {},
  user: null,
  setUser: () => {},
});

// const access = localStorage.getItem("access");
const access = localStorage.getItem("token");

const getInitialTheme = () => {
  const isDark = localStorage.getItem("isDark");
  if (isDark) {
    return JSON.parse(isDark);
  }
  return false;
};

function App() {
  const [isDark, setIsDark] = useState(getInitialTheme());
  const [user, setUser] = useState<IUser | null>(null);
  // const [user, setUser] = useState(false);
  const [isReady, setIsReady] = useState(!access);

  // if (access) {
  //   getUser()
  //     .then((response) => {
  //       if (response.ok) {
  //         isOk = true;
  //       } else {
  //         isOk = false;
  //       }
  //       return response.json();
  //     })
  //     .then((json) => {
  //       if (isOk) {
  //         setUser(json);
  //       }
  //     })
  //     .finally(() => {
  //       setIsReady(true);
  //     });
  // }
  useEffect(() => {
    if (access) {
      check()
        .then((data) => {
          setUser(data);
        })
        .finally(() => {
          setIsReady(true);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", String(isDark));
  }, [isDark]);
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Context.Provider
            value={{
              isDark: isDark,
              setIsDark: setIsDark,
              user,
              setUser,
            }}
          >
            {isReady ? <RootRouter /> : <Preloader />}
          </Context.Provider>
          <NotificationContainer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
