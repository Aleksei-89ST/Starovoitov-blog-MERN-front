import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// это сделал для того чтобы не писать везде полный путь - он сам будет его прикручивать
const instance = axios.create({
  baseURL: "http://localhost:4444",
});

// функция посредник -котороя будет проверять при каждом запросе если у меня токен или нет и если он есть тогда отправлять его в запрос. Это для того чтобы каждый раз не писать везде токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
