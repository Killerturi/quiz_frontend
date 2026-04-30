import axios from "axios";

export const loginUser = async (data) => {
  return axios.post("quizbackend-production-a1ec.up.railway.app/api/login", data);
};
