import api from "./api";

export const addScore = async (value: number) => {
  return api.post("/scores/add", { value });
};
