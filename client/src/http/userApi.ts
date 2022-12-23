import { $authHost, $host } from "./index";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { IUser } from "../types/auth";

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async (): Promise<IUser> => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
  // const response = await $authHost.get("api/user/auth");
  // return response;
};
