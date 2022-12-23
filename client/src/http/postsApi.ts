import { $authHost, $host } from "./index";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const fetchPosts = async () => {
  const { data } = await $host.get("api/posts");
  console.log(data);
  return data;
};
export const selectPosts = async (id: number) => {
  const { data } = await $host.get("api/posts/" + id);
  return data;
};
export const fetchMyPosts = async (id?: number) => {
  const { data } = await $host.get(`api/my_post/?id=${id}`);
  return data;
};
export const createPost = async (body: FormData) => {
  // const { data } = await $postHost.post(`api/my_post/addpost`);
  return fetch("http://localhost:5000/api/my_post/addpost", {
    method: "POST",
    body: body,
  });
};

export const removePost = (id?: number) => {
  return fetch(`http://localhost:5000/api/my_post/${id}`, {
    method: "DELETE",
  });
};
export const getOneMyPost = (id: number) => {
  return fetch(`http://localhost:5000/api/my_post/${id}`, {
    method: "GET",
  });
};
export const editPost = (body: FormData, id: number) => {
  return fetch(`http://localhost:5000/api/my_post/${id}`, {
    method: "PATCH",
    body: body,
  });
};
