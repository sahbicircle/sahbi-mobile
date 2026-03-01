export function StripeProvider({ children }) {
  return children;
}

export function usePaymentSheet() {
  return {
    initPaymentSheet: async () => ({ error: { message: "Payment is only available in the mobile app" } }),
    presentPaymentSheet: async () => ({ error: { message: "Payment is only available in the mobile app", code: "NotSupported" } }),
  };
}
