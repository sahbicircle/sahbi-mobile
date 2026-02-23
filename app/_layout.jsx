import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LanguageProvider } from "../context/LanguageProvider";
import { UserProvider } from "../context/UserProvider";
import "../i18n";

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
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <UserProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {/* <LanguageSwitcher /> */}

            <Stack screenOptions={{ headerShown: false }} />
          </GestureHandlerRootView>
        </UserProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
