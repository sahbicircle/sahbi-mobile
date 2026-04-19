import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getProfile } from "../services/profile.service";
import { loginWithApple, loginWithGoogle } from "../services/auth.service";
import { setAuth } from "../store/auth.store";

const googleWebClientId =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ||
  Constants.expoConfig?.extra?.googleWebClientId ||
  "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com";

let AppleAuthentication = null;
try {
  AppleAuthentication = require("expo-apple-authentication");
} catch {
  // expo-apple-authentication not installed or not available (Android/Web)
}

WebBrowser.maybeCompleteAuthSession();

/**
 * Reusable Google + Apple sign-in buttons.
 * variant "glass" matches Sahbi auth mockups (frosted pills on gradients).
 */
export function SocialAuthButtons({
  onSuccess,
  disabled,
  buttonStyles = {},
  variant = "solid",
}) {
  const { t } = useTranslation();
  const isGlass = variant === "glass";

  const [, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleWebClientId,
    iosClientId:
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || googleWebClientId,
    androidClientId:
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || googleWebClientId,
    webClientId: googleWebClientId,
    scopes: ["openid", "email", "profile"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.id_token;
      if (idToken) {
        loginWithGoogle(idToken)
          .then(async (res) => {
            await setAuth(res.user, res.token);
            const fullProfile = await getProfile();
            await setAuth(fullProfile, res.token);
            onSuccess?.();
          })
          .catch((err) => console.error("Google auth error:", err));
      }
    }
  }, [response, onSuccess]);

  const handleGoogle = () => {
    if (disabled) return;
    promptAsync();
  };

  const handleApple = async () => {
    if (disabled || !AppleAuthentication) return;
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { identityToken, fullName, email } = credential;
      if (!identityToken) {
        console.error("No Apple identity token");
        return;
      }
      const res = await loginWithApple(identityToken, {
        email: email || undefined,
        firstName: fullName?.givenName || undefined,
        lastName: fullName?.familyName || undefined,
      });
      await setAuth(res.user, res.token);
      const fullProfile = await getProfile();
      await setAuth(fullProfile, res.token);
      onSuccess?.();
    } catch (e) {
      if (e.code !== "ERR_REQUEST_CANCELED") {
        console.error("Apple auth error:", e);
      }
    }
  };

  if (isGlass) {
    return (
      <View style={[styles.container, buttonStyles]}>
        <TouchableOpacity
          style={[styles.btn, styles.glassBtn]}
          onPress={handleGoogle}
          disabled={disabled}
          activeOpacity={0.88}
        >
          <Ionicons name="logo-google" size={22} color="#4285F4" />
          <Text style={styles.glassBtnText}>{t("login.signInGoogle")}</Text>
        </TouchableOpacity>

        {Platform.OS === "ios" && AppleAuthentication && (
          <TouchableOpacity
            style={[styles.btn, styles.glassBtn]}
            onPress={handleApple}
            disabled={disabled}
            activeOpacity={0.88}
          >
            <Ionicons name="logo-apple" size={22} color="#000" />
            <Text style={styles.glassBtnText}>{t("login.signInApple")}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, buttonStyles]}>
      <TouchableOpacity
        style={[styles.btn, styles.googleBtn]}
        onPress={handleGoogle}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Ionicons name="logo-google" size={20} color="#fff" />
        <Text style={styles.btnText}>Continue with Google</Text>
      </TouchableOpacity>

      {Platform.OS === "ios" && AppleAuthentication && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={24}
          style={styles.appleBtn}
          onPress={handleApple}
          disabled={disabled}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: "100%",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    width: "100%",
  },
  glassBtn: {
    backgroundColor: "rgba(255,255,255,0.68)",
  },
  glassBtnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
    fontFamily: "Poppins",
  },
  googleBtn: {
    backgroundColor: "#4285F4",
  },
  appleBtn: {
    width: "100%",
    height: 48,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Poppins",
  },
});
