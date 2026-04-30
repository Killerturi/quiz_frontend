import axios from "axios";

export const loginUser = async (data) => {
  return axios.post("https://quizbackend-production-a1ec.up.railway.app/api/login", data);
};
