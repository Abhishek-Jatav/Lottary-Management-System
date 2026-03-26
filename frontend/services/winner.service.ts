import api from "./api";

// Upload proof
export const uploadProof = async (drawId: string, proof: string) => {
  return api.post("/winner/upload-proof", { drawId, proof });
};

// Get my winners
export const getMyWinners = async () => {
  return api.get("/winner/my");
};
