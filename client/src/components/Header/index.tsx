import style from "./style.module.css";
import img from "./ico.svg";
import { useContext, useState } from "react";
import { NavBar } from "../NavBar";
import { Context } from "../../App";
// import { User } from "../User";

export const Header = () => {
  const { user, isDark } = useContext(Context);
  const [clickMenu, setClickMenu] = useState(false);
  const [headerStyle, setHeaderStyle] = useState("header");
  const [menuStyle, setMenuStyle] = useState("visible");
  const [navStyle, setNavStyle] = useState("hiddenNav");
  const [linearStyle, setLinearStyle] = useState("linear");

  const [linearDark, setLinearDark] = useState("darkLinear");
  const styleHiddenMenu = () => {
    setMenuStyle("hidden");
  };
  const styleVisibleNav = () => {
    {
      isDark ? setNavStyle("darkVisibleNav") : setNavStyle("visibleNav");
    }

    setHeaderStyle("headerMax");
  };

  const openNavBar = () => {
    if (!clickMenu) {
      {
        isDark ? setLinearStyle("darkOpen") : setLinearStyle("open");
      }
      setTimeout(styleHiddenMenu, 500);
      setTimeout(styleVisibleNav, 500);
    }
    setClickMenu(true);
  };
  const closeNavBar = () => {
    if (clickMenu) {
      setMenuStyle("visible");
      setNavStyle("hiddenNav");
      setHeaderStyle("header");
      setLinearStyle("linear");
      setClickMenu(false);
    }
  };
  return (
    <header className={style[headerStyle]}>
      <div className={style[menuStyle]}>
        <div className={style.burgerMenu} onClick={openNavBar}>
          <div
            className={`${style[linearStyle]} ${
              isDark ? style[linearDark] : null
            }`}
          ></div>
        </div>
        {user ? (
          <>
            <div className={style.user}>
              {!isDark ? <img src={img} alt="UserIcon" /> : ""}

              {/* <User userName={user.username} /> */}
            </div>
          </>
        ) : null}
      </div>
      {clickMenu ? (
        <div className={style[navStyle]}>
          <NavBar onClose={closeNavBar} />
        </div>
      ) : null}
    </header>
  );
};
