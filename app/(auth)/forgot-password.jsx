import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { forgotPassword } from "../../services/auth.service";
import { styles } from "./login.styles";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (!email.trim()) {
      setError(t("forgotPassword.emailRequired", "Email is required"));
      return;
    }
    try {
      setLoading(true);
      setError("");
      setMessage("");
      await forgotPassword(email.trim());
      setMessage(t("forgotPassword.codeSent", "If an account exists, a 6-digit code was sent to your email."));
      setTimeout(() => {
        router.push({
          pathname: "/(auth)/reset-password",
          params: { email: email.trim() },
        });
      }, 500);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message;
      if (msg?.includes("social sign-in")) {
        setError(t("forgotPassword.socialAccount", "This account uses Google or Apple sign-in."));
      } else {
        setError(t("forgotPassword.error", "Something went wrong. Try again."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <LinearGradient
        end={{ x: 0, y: 1 }}
        start={{ x: 1, y: -0.2 }}
        style={styles.screenContainer}
        locations={[0, 0.15, 0.65, 1]}
        colors={["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]}
      >
        <View style={styles.screen}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ alignSelf: "flex-start", paddingVertical: 8, paddingRight: 8 }}
            >
              <Text style={[styles.link, { fontSize: 16 }]}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{t("forgotPassword.title", "Forgot password?")}</Text>
            <Text style={styles.description}>
              {t("forgotPassword.description", "Enter your email and we'll send you a 6-digit code to reset your password.")}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={t("login.email", "Email")}
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(v) => { setEmail(v); setError(""); setMessage(""); }}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {message ? (
              <Text style={[styles.errorText, { backgroundColor: "#e8f5e9", color: "#2e7d32" }]}>
                {message}
              </Text>
            ) : null}
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}>
                <Text style={styles.primaryBtnText}>
                  {loading ? t("forgotPassword.sending", "Sending...") : t("forgotPassword.cta", "Send code")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
