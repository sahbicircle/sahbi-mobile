import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SocialAuthButtons } from "../../components/SocialAuthButtons";
import { login } from "../../services/auth.service";
import { getProfile } from "../../services/profile.service";
import { setAuth } from "../../store/auth.store";
import { styles } from "./login.styles";

const GradientButton = ({ label = "Next", onPress, disabled }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.85}>
    <View style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled]}>
      <Text style={styles.primaryBtnText}>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default function Login() {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("ayoubjdad1@gmail.com");
  const [password, setPassword] = useState("@Ayoub031949");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSuccess = useCallback(() => {
    router.replace("/(tabs)/home");
  }, [router]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await login(email, password);
      const fullProfile = await getProfile();
      await setAuth(fullProfile, res.token);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(t("login.error"));
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
            <Text style={styles.title}>{t("login.title")}</Text>
            <Text style={styles.description}>{t("login.description")}</Text>

            <TextInput
              style={styles.input}
              placeholder={t("login.email")}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={t("login.password")}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text style={[styles.link, { fontSize: 14 }]}>
                {t("login.forgotPassword", "Forgot password?")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <SocialAuthButtons onSuccess={onSuccess} disabled={loading} />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t("login.or", "or")}</Text>
              <View style={styles.dividerLine} />
            </View>

            <GradientButton
              onPress={onSubmit}
              disabled={loading}
              label={loading ? t("login.loggingIn") : t("login.cta")}
            />

            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.link}>{t("login.noAccount")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
