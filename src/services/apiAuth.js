import { baseUrl } from "./baseUrl";
import Cookies from "js-cookie";

export async function login({ email, password }) {
  const url = baseUrl + "/api/v1/users/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.status);
  }

  return data;
}

export async function signup({ email, password, passwordConfirm }) {
  const url = baseUrl + "/api/v1/users/signup";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      passwordConfirm,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.status);
  }

  return data;
}

export async function isLoggedIn() {
  const url = baseUrl + "/api/v1/users/isLoggedIn";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data;
}
