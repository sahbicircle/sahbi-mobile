import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SocialAuthButtons } from "../../components/SocialAuthButtons";
import { SAHBI } from "../../constants/sahbiUi";
import {
  login,
  pickSessionFromOtpResponse,
  sendOtp,
  verifyOtp,
} from "../../services/auth.service";
import { getProfile } from "../../services/profile.service";
import { setAuth } from "../../store/auth.store";
import { styles } from "./login.styles";

const WINDOW_HEIGHT = Dimensions.get("window").height;

const digitsOnlyPhone = (value) => String(value || "").replace(/\s/g, "");
const isValidPhone = (phone) => /^\+?\d{9,15}$/.test(digitsOnlyPhone(phone));

export default function Login() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const openPhone = () => {
    setShowPhone(true);
    setShowEmail(false);
    setError("");
    setPhoneError("");
  };

  const openEmail = () => {
    setShowEmail(true);
    setShowPhone(false);
    setPhoneError("");
    setOtpSent(false);
    setOtpCode("");
  };

  const resetPhoneFlow = () => {
    setOtpSent(false);
    setOtpCode("");
    setPhoneError("");
  };

  const onSuccess = useCallback(() => {
    router.replace("/(tabs)/home");
  }, [router]);

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await login(email, password);
      await setAuth(res.user, res.token);
      const fullProfile = await getProfile();
      await setAuth(fullProfile, res.token);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("Login error:", err);
      setError(t("login.error"));
    } finally {
      setLoading(false);
    }
  };

  const onSendPhoneOtp = async () => {
    const normalized = digitsOnlyPhone(phoneNumber);
    if (!isValidPhone(normalized)) return;
    try {
      setOtpLoading(true);
      setPhoneError("");
      await sendOtp(normalized);
      setOtpSent(true);
      setOtpCode("");
    } catch (err) {
      console.error("sendOtp:", err);
      setPhoneError(
        err?.response?.data?.message || t("login.phone.sendFailed")
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const onVerifyPhoneOtp = async () => {
    const normalized = digitsOnlyPhone(phoneNumber);
    if (otpCode.length !== 6) return;
    try {
      setOtpLoading(true);
      setPhoneError("");
      const raw = await verifyOtp(normalized, otpCode);
      const session = pickSessionFromOtpResponse(raw);
      if (!session) {
        setPhoneError(t("login.phone.noSession"));
        return;
      }
      await setAuth(session.user, session.token);
      const fullProfile = await getProfile();
      await setAuth(fullProfile, session.token);
      router.replace("/(tabs)/home");
    } catch (err) {
      console.error("verifyOtp login:", err);
      setPhoneError(
        err?.response?.data?.message || t("login.phone.verifyFailed")
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const onToggleAuthMethod = () => {
    if (showPhone) openEmail();
    else if (showEmail) openPhone();
    else openEmail();
  };

  const toggleAuthLabel = showPhone
    ? t("login.phone.useEmail")
    : showEmail
      ? t("login.phone.usePhone")
      : t("login.signInEmail");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E8E4F0" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { minHeight: WINDOW_HEIGHT }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={SAHBI.gradientAuthVertical}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[
            styles.gradient,
            {
              minHeight: WINDOW_HEIGHT,
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 20,
            },
          ]}
        >
        <View style={styles.brandRow}>
          <Image
            source={require("../../assets/logo/logo-white.png")}
            style={styles.logo}
          />
          <Text style={styles.brandText}>Sahbi</Text>
        </View>

        <Text style={styles.title}>{t("login.title")}</Text>
        <Text style={styles.description}>{t("login.description")}</Text>

        <TouchableOpacity
          style={styles.glassBtn}
          activeOpacity={0.88}
          onPress={openPhone}
        >
          <Text style={styles.glassBtnText}>{t("login.signInNumber")}</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t("login.orSignInWith")}</Text>
          <View style={styles.dividerLine} />
        </View>

        <SocialAuthButtons
          onSuccess={onSuccess}
          disabled={loading}
          variant="glass"
        />

        <TouchableOpacity
          style={styles.emailToggle}
          onPress={onToggleAuthMethod}
        >
          <Text style={styles.emailToggleText}>{toggleAuthLabel}</Text>
        </TouchableOpacity>

        {showPhone ? (
          <View style={styles.emailBlock}>
            <Text style={styles.phoneHint}>{t("login.phone.hint")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("login.phone.placeholder")}
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              autoComplete="tel"
              textContentType="telephoneNumber"
              value={phoneNumber}
              onChangeText={(v) => {
                setPhoneNumber(v);
                resetPhoneFlow();
              }}
              editable={!otpLoading}
            />
            {!otpSent ? (
              <TouchableOpacity
                onPress={onSendPhoneOtp}
                disabled={!isValidPhone(phoneNumber) || otpLoading}
                style={[
                  styles.primarySolid,
                  (!isValidPhone(phoneNumber) || otpLoading) && { opacity: 0.55 },
                ]}
                activeOpacity={0.85}
              >
                <Text style={styles.primarySolidText}>
                  {otpLoading
                    ? t("login.phone.sending")
                    : t("login.phone.sendCode")}
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder={t("register.phone.otpPlaceholder")}
                  placeholderTextColor="#888"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otpCode}
                  onChangeText={(v) => {
                    setOtpCode(v.replace(/\D/g, ""));
                    setPhoneError("");
                  }}
                />
                <TouchableOpacity
                  onPress={onVerifyPhoneOtp}
                  disabled={otpCode.length !== 6 || otpLoading}
                  style={[
                    styles.primarySolid,
                    (otpCode.length !== 6 || otpLoading) && { opacity: 0.55 },
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primarySolidText}>
                    {otpLoading
                      ? t("login.phone.verifying")
                      : t("login.phone.verifyContinue")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.secondaryLink}
                  onPress={() => {
                    setOtpSent(false);
                    setOtpCode("");
                    setPhoneError("");
                  }}
                >
                  <Text style={styles.secondaryLinkText}>
                    {t("login.phone.changeNumber")}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {phoneError ? (
              <Text style={styles.errorText}>{phoneError}</Text>
            ) : null}
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.link}>{t("login.noAccount")}</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {showEmail ? (
          <View style={styles.emailBlock}>
            <TextInput
              style={styles.input}
              placeholder={t("login.email")}
              placeholderTextColor="#888"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={t("login.password")}
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text style={[styles.link, { fontSize: 14 }]}>
                {t("login.forgotPassword")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={loading}
              style={styles.primarySolid}
              activeOpacity={0.85}
            >
              <Text style={styles.primarySolidText}>
                {loading ? t("login.loggingIn") : t("login.cta")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.link}>{t("login.noAccount")}</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ flex: 1, minHeight: 16 }} />

        <View style={styles.footerLinks}>
          <Text style={styles.footerText}>{t("login.footerPrivacy")}</Text>
          <Text style={styles.footerText}> · </Text>
          <Text style={styles.footerText}>{t("login.footerTerms")}</Text>
        </View>
      </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
