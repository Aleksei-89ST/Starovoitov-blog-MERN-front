import axios from "axios";

// это сделал для того чтобы не писать везде полный путь - он сам будет его прикручивать
const instance = axios.create({
  baseURL: "http://localhost:4444",
});

export default instance;
