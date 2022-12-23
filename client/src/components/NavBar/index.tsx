import { useContext } from "react";
import { Context } from "../../App";
import { DarkModeToggle } from "../DarkModeToggle";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import img from "./Iconlogout.svg";

interface IProps {
  onClose: () => void;
}

export const NavBar = ({ onClose }: IProps) => {
  const { isDark, setIsDark, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  const handleOnChange = () => {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
    // setIsDark(!isDark)
  };
  const logOut = () => {
    navigate("/posts");
    setUser(null);
    localStorage.clear();
  };
  const mypost = () => {
    if (user) {
      navigate(`/my_post/${user.id}`);
    }
  };
  return (
    <div className={style.listContainer}>
      <div className={style.burgerMenuNav} onClick={onClose}>
        <span className={style.linearNav1}></span>
        <span className={style.linearNav2}></span>
      </div>

      {user ? (
        <>
          <div className={style.postsPanel}>
            <div className={style.allPosts}>
              <Link to="/">All posts</Link>
            </div>
            <div className={style.privatePosts}>
              {/* <Link to='/my_post/${user.id}'>My posts</Link> */}
              <button className={style.logOut} onClick={mypost}>
                My Post
              </button>
              <Link to="/addpost">+Add posts</Link>
            </div>
          </div>
          <div>
            <button className={style.logOut} onClick={logOut}>
              Log out
            </button>
            <img
              className={style.logoutImage}
              src={img}
              alt="icon logout"
            ></img>
            <div className={style.loginToggle}>
              <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
            </div>
          </div>
        </>
      ) : (
        <>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
          <div className={style.dark}>
            <DarkModeToggle inputChecked={isDark} onChange={handleOnChange} />
          </div>
        </>
      )}
    </div>
  );
};
