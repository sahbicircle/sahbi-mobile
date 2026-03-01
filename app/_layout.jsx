import { StripeProvider } from "../lib/stripe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LanguageProvider } from "../context/LanguageProvider";
import { NotificationProvider } from "../context/NotificationProvider";
import { UserProvider } from "../context/UserProvider";
import "../i18n";

const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

export default function RootLayout() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Jazmin: require("../assets/fonts/Jazmin/Jazmin-Alt-SemiBold.otf"),
      });
    };

    loadFonts();
  }, []);

  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.sahbi"
      urlScheme="sahbimobile"
    >
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <UserProvider>
            <NotificationProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }} />
              </GestureHandlerRootView>
            </NotificationProvider>
          </UserProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </StripeProvider>
  );
}
