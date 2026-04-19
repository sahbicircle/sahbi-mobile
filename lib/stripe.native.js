import Constants, { ExecutionEnvironment } from "expo-constants";

/**
 * Expo Go does not ship Stripe's native modules (e.g. OnrampSdk). Loading
 * `@stripe/stripe-react-native` there crashes at startup. Dev / production
 * builds that include the config plugin must load the real SDK.
 */
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

function ExpoGoStripeProvider({ children }) {
  return children;
}

function expoGoUsePaymentSheet() {
  const unsupported = {
    message:
      "Card payments need a development build (expo run:ios / run:android or EAS). Expo Go does not include Stripe native code.",
    code: "NotSupported",
  };
  return {
    initPaymentSheet: async () => ({ error: unsupported }),
    presentPaymentSheet: async () => ({ error: unsupported }),
  };
}

let StripeProvider;
let usePaymentSheet;

if (isExpoGo) {
  StripeProvider = ExpoGoStripeProvider;
  usePaymentSheet = expoGoUsePaymentSheet;
} else {
  const stripe = require("@stripe/stripe-react-native");
  StripeProvider = stripe.StripeProvider;
  usePaymentSheet = stripe.usePaymentSheet;
}

export { StripeProvider, usePaymentSheet };
