import api from "./api";

export const getLatestDraw = async () => {
  return api.get("/draw/latest");
};
