import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { resetPassword } from "../../services/auth.service";
import { styles } from "./login.styles";

export default function ResetPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email || "";
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    setError("");
    if (!code || code.length !== 6) {
      setError(t("resetPassword.invalidCode", "Please enter the 6-digit code"));
      return;
    }
    if (newPassword.length < 8) {
      setError(t("resetPassword.shortPassword", "Password must be at least 8 characters"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("resetPassword.passwordMismatch", "Passwords do not match"));
      return;
    }
    try {
      setLoading(true);
      await resetPassword(email || "", code, newPassword);
      setSuccess(true);
      setTimeout(() => router.replace("/(auth)/login"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || t("resetPassword.error", "Invalid or expired code. Try again."));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ScrollView contentContainerStyle={[styles.main, { justifyContent: "center" }]}>
        <LinearGradient
          end={{ x: 0, y: 1 }}
          start={{ x: 1, y: -0.2 }}
          style={styles.screenContainer}
          locations={[0, 0.15, 0.65, 1]}
          colors={["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]}
        >
          <Text style={[styles.title, { textAlign: "center" }]}>
            {t("resetPassword.success", "Password reset!")}
          </Text>
          <Text style={styles.description}>
            {t("resetPassword.redirect", "Redirecting to login...")}
          </Text>
        </LinearGradient>
      </ScrollView>
    );
  }

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
            <Text style={styles.title}>{t("resetPassword.title", "Reset password")}</Text>
            <Text style={styles.description}>
              {t("resetPassword.description", "Enter the 6-digit code sent to")}{email ? ` ${email}` : ""}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={t("resetPassword.codePlaceholder", "6-digit code")}
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={(v) => { setCode(v.replace(/\D/g, "")); setError(""); }}
            />
            <TextInput
              style={styles.input}
              placeholder={t("resetPassword.newPassword", "New password (min 8 chars)")}
              placeholderTextColor="#999"
              secureTextEntry
              value={newPassword}
              onChangeText={(v) => { setNewPassword(v); setError(""); }}
            />
            <TextInput
              style={styles.input}
              placeholder={t("resetPassword.confirmPassword", "Confirm password")}
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); setError(""); }}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.content}>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              <View style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}>
                <Text style={styles.primaryBtnText}>
                  {loading ? t("resetPassword.resetting", "Resetting...") : t("resetPassword.cta", "Reset password")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
