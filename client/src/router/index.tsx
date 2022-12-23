import { ReactNode, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Context } from "../App";
import { Activation } from "../pages/Activation";
import { AddPost } from "../pages/AddPost";
// import { ConfirmPassword } from "../pages/ConfirmPassword";
import { EditPost } from "../pages/EditPost";
import { Error } from "../pages/Error";
import { LoginPage } from "../pages/Login";
import { Main } from "../pages/Main";
import { MyPostPage } from "../pages/MyPostPage";
// import { RegisterSuccess } from "../pages/RegisterSuccess";
import { RegistrationPage } from "../pages/RegistrationPage";
// import { ResetPassword } from "../pages/ResetPassword";
import { SelectedPost } from "../pages/SelectedPost";

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      {/* <Route path="/registersuccess" element={<RegisterSuccess />} /> */}
      <Route path="/activate/:uid/:token" element={<Activation />} />
      <Route path="/posts/:id" element={<SelectedPost />} />
      <Route path="/addpost" element={useLoginGuard(<AddPost />)} />
      <Route path="/my_post/:id" element={useLoginGuard(<MyPostPage />)} />
      <Route path="/editpost/:id" element={<EditPost />} />
      {/* <Route path="/resetpassword" element={<ResetPassword />} />
      <Route
        path="/password/reset/confirm/:uid/:token"
        element={<ConfirmPassword />}
      /> */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const useLoginGuard = (component: ReactNode) => {
  const { user } = useContext(Context);
  console.log(user);
  if (user) {
    return component;
  } else {
    return <Navigate to="/login" />;
  }
};
