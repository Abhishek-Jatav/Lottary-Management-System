import api from "./api";

// Make payment
export const makePayment = async (amount: number, method: string) => {
  return api.post("/payment/pay", { amount, method });
};

// Get payment history
export const getPaymentHistory = async () => {
  return api.get("/payment/history");
};
