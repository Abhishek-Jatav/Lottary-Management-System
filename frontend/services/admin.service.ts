import api from "./api";

// Run Draw
export const runDraw = async () => {
  return api.post("/draw/run");
};

// Verify Payment
export const verifyPayment = async (paymentId: string, status: string) => {
  return api.post("/admin/payment/verify", { paymentId, status });
};

// Verify Winner
export const verifyWinner = async (winnerId: string, status: string) => {
  return api.post("/admin/winner/verify", { winnerId, status });
};
