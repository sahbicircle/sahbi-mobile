import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DatePicker from "../../components/calendar/DatePicker";
import { SAHBI } from "../../constants/sahbiUi";
import { sendOtp, verifyOtp } from "../../services/auth.service";
import { styles } from "./register.styles";

export default function Register() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const screenH = Dimensions.get("window").height;

  const [step, setStep] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthday: "",
    city: "",
    gender: "",
    firstImpression: "",
    selfView: "",
    planningStyle: "",
    rechargeStyle: [],
    socialPreference: "",
    socialPace: "",
    conversationStart: "",
    talkStyle: "",
    favoriteTopics: [],
    relationshipStatus: "",
    goalsFromSahbi: [],
    dinnerStyle: "",
    superpower: "",
    workStatus: "",
    photos: [],
    phoneVerified: false,
    skippedPhoneVerification: false,
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleArrayValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const isStrongPassword = (pwd) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(pwd);

  const isValidPhone = (phone) => /^\+?\d{9,15}$/.test(phone);

  const canProceed = () => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return form.firstName.trim() && form.lastName.trim();
      case 2:
        return form.email && isStrongPassword(form.password);
      case 3:
        return isValidPhone(form.phoneNumber);
        // &&(form.phoneVerified || form.skippedPhoneVerification)
      case 4:
        return !!form.birthday;
      case 5:
        return form.photos.length >= 2;
      case 6:
        return form.gender;
      case 7:
        return form.firstImpression;
      case 8:
        return form.selfView;
      case 9:
        return form.planningStyle;
      case 10:
        return form.rechargeStyle.length > 0;
      case 11:
        return form.socialPreference;
      case 12:
        return form.socialPace;
      case 13:
        return form.conversationStart;
      case 14:
        return form.talkStyle;
      case 15:
        return form.favoriteTopics.length > 0;
      case 16:
        return form.relationshipStatus;
      case 17:
        return form.goalsFromSahbi.length > 0;
      case 18:
        return form.dinnerStyle;
      case 19:
        return form.superpower.trim().length > 0;
      case 20:
        return form.workStatus;
      default:
        return false;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const pickPhotos = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!res.canceled) {
      setForm((p) => ({
        ...p,
        photos: [...p.photos, ...res.assets.map((a) => a.uri)],
      }));
    }
  };

  const removePhoto = (uri) => {
    setForm((p) => ({
      ...p,
      photos: p.photos.filter((u) => u !== uri),
    }));
  };

  const submit = async () => {
    const user = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      phoneNumber: form.phoneNumber,
      verifiedPhone: form.phoneVerified,
      birthday: form.birthday,
      city: form.city,
      gender: form.gender,
      relationshipStatus: form.relationshipStatus,
      goalsFromSahbi: form.goalsFromSahbi,
      workStatus: form.workStatus,
      photoUrl: form.photos || [],
      personality: {
        firstImpression: form.firstImpression,
        selfView: form.selfView,
        planningStyle: form.planningStyle,
        rechargeStyle: form.rechargeStyle,
        socialPreference: form.socialPreference,
        socialPace: form.socialPace,
        conversationStart: form.conversationStart,
        talkStyle: form.talkStyle,
        favoriteTopics: form.favoriteTopics,
        dinnerStyle: form.dinnerStyle,
        superpower: form.superpower,
      },
    };

    router.push({
      pathname: "/(auth)/subscription",
      params: { user: JSON.stringify(user) },
    });
  };

  const Option = ({ label, selected, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.88}>
      {selected ? (
        <LinearGradient
          colors={SAHBI.gradientChip}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.option, styles.optionSelectedFill]}
        >
          <Text style={[styles.optionText, styles.optionTextOnFill]}>
            {label}
          </Text>
        </LinearGradient>
      ) : (
        <View style={[styles.option, styles.optionOutline]}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const GradientButton = ({ label = t("common.next"), onPress, disabled }) => (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled]}
        colors={disabled ? ["#ddd", "#ccc"] : SAHBI.gradientCta}
      >
        <Text style={styles.primaryBtnText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const disabled = !canProceed();

  const genderOptions = [
    { value: "MALE", label: t("register.gender.male") },
    { value: "FEMALE", label: t("register.gender.female") },
    { value: "OTHER", label: t("register.gender.other") },
    { value: "PREFER_NOT_TO_SAY", label: t("register.gender.preferNotToSay") },
  ];

  const firstImpressionOptions = [
    { value: "THOUGHTFUL", label: t("register.firstImpression.thoughtful") },
    { value: "ENERGETIC", label: t("register.firstImpression.energetic") },
    { value: "KIND", label: t("register.firstImpression.kind") },
  ];

  const selfViewOptions = [
    { value: "WARM_TALKATIVE", label: t("register.selfView.warmTalkative") },
    { value: "CALM_THOUGHTFUL", label: t("register.selfView.calmThoughtful") },
  ];

  const planningStyleOptions = [
    { value: "CAREFULLY", label: t("register.planningStyle.carefully") },
    { value: "GO_WITH_FLOW", label: t("register.planningStyle.goWithFlow") },
  ];

  const rechargeStyleOptions = [
    { value: "COZY_MOMENTS", label: t("register.rechargeStyle.cozyMoments") },
    { value: "LIVELY_ENERGY", label: t("register.rechargeStyle.livelyEnergy") },
    {
      value: "MEET_NEW_FRIENDS",
      label: t("register.rechargeStyle.meetNewFriends"),
    },
  ];

  const socialPreferenceOptions = [
    {
      value: "NEW_EXPERIENCES",
      label: t("register.socialPreference.newExperiences"),
    },
    {
      value: "FAMILIAR_COMFORT",
      label: t("register.socialPreference.familiarComfort"),
    },
  ];

  const socialPaceOptions = [
    { value: "JUMP_RIGHT_IN", label: t("register.socialPace.jumpRightIn") },
    { value: "TAKE_IT_SLOW", label: t("register.socialPace.takeItSlow") },
    {
      value: "PREFER_FAMILIAR",
      label: t("register.socialPace.preferFamiliar"),
    },
  ];

  const conversationStartOptions = [
    {
      value: "ASK_QUESTIONS",
      label: t("register.conversationStart.askQuestions"),
    },
    {
      value: "TELL_STORIES",
      label: t("register.conversationStart.tellStories"),
    },
    { value: "LISTEN", label: t("register.conversationStart.listen") },
  ];

  const talkStyleOptions = [
    { value: "LIGHT_JOKES", label: t("register.talkStyle.lightJokes") },
    { value: "DEEP_THOUGHTS", label: t("register.talkStyle.deepThoughts") },
    { value: "RANDOM_STORIES", label: t("register.talkStyle.randomStories") },
  ];

  const favoriteTopicsOptions = [
    { value: "FOOD", label: t("register.favoriteTopics.food") },
    { value: "TRAVEL", label: t("register.favoriteTopics.travel") },
    { value: "FILM_TV", label: t("register.favoriteTopics.filmTv") },
    { value: "CAREER_WORK", label: t("register.favoriteTopics.careerWork") },
    {
      value: "PERSONAL_GROWTH",
      label: t("register.favoriteTopics.personalGrowth"),
    },
    {
      value: "HEALTH_FITNESS",
      label: t("register.favoriteTopics.healthFitness"),
    },
    {
      value: "RELATIONSHIPS",
      label: t("register.favoriteTopics.relationships"),
    },
    { value: "HUMOR_JOKES", label: t("register.favoriteTopics.humorJokes") },
  ];

  const relationshipStatusOptions = [
    { value: "SINGLE", label: t("register.relationshipStatus.single") },
    { value: "MARRIED", label: t("register.relationshipStatus.married") },
    {
      value: "COMPLICATED",
      label: t("register.relationshipStatus.complicated"),
    },
    {
      value: "IN_RELATIONSHIP",
      label: t("register.relationshipStatus.inRelationship"),
    },
    {
      value: "PREFER_NOT_TO_SAY",
      label: t("register.relationshipStatus.preferNotToSay"),
    },
  ];

  const goalsFromSahbiOptions = [
    {
      value: "MEET_NEW_FRIENDS",
      label: t("register.goalsFromSahbi.meetNewFriends"),
    },
    { value: "FUN_STORIES", label: t("register.goalsFromSahbi.funStories") },
    { value: "GOOD_FOOD", label: t("register.goalsFromSahbi.goodFood") },
    {
      value: "NOT_FEEL_LONELY",
      label: t("register.goalsFromSahbi.notFeelLonely"),
    },
  ];

  const dinnerStyleOptions = [
    { value: "CONNECTION", label: t("register.dinnerStyle.connection") },
    { value: "TASTE", label: t("register.dinnerStyle.taste") },
    { value: "SURPRISE", label: t("register.dinnerStyle.surprise") },
  ];

  const workStatusOptions = [
    { value: "EMPLOYED", label: t("register.workStatus.employed") },
    { value: "FREELANCE", label: t("register.workStatus.freelance") },
    { value: "STUDENT", label: t("register.workStatus.student") },
    { value: "BETWEEN_ROLES", label: t("register.workStatus.betweenRoles") },
    { value: "CARE_GIVING", label: t("register.workStatus.careGiving") },
    {
      value: "PREFER_NOT_TO_SAY",
      label: t("register.workStatus.preferNotToSay"),
    },
  ];

  const MAX_PHOTOS = 6;

  if (step === 0) {
    return (
      <LinearGradient
        colors={SAHBI.gradientWarmVertical}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          styles.onboardingRoot,
          { paddingTop: insets.top + 8, minHeight: screenH },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtnOnboarding}
          onPress={() => router.replace("/(auth)/intro")}
        >
          <Ionicons size={22} color="#C97B68" name="chevron-back" />
        </TouchableOpacity>
        <View style={styles.onboardingBody}>
          <Text style={styles.onboardingHi}>{t("register.onboarding.hi")}</Text>
          <Text style={styles.onboardingStat}>{t("register.onboarding.stat")}</Text>
          <Text style={styles.onboardingSub}>
            {t("register.onboarding.statSub")}
          </Text>
          <Image
            source={require("../../assets/images/step0.png")}
            style={styles.onboardingIllustration}
            resizeMode="contain"
          />
        </View>
        <View style={[styles.onboardingFooter, { paddingBottom: insets.bottom + 24 }]}>
          <GradientButton onPress={next} />
          <TouchableOpacity onPress={next} style={styles.skipLink}>
            <Text style={styles.skipTextDark}>{t("register.onboarding.skip")}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.main}>
      {step > 0 && (
        <TouchableOpacity style={styles.backBtn} onPress={back}>
          <Ionicons size={24} color="#E8937E" name="chevron-back" />
        </TouchableOpacity>
      )}

      {/* STEP 1 — First & Last Name */}
      {step === 1 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.name.firstNameTitle")}</Text>

            <TextInput
              placeholderTextColor="#B0B0B0"
              style={styles.inputUnderline}
              placeholder={t("register.firstName")}
              value={form.firstName}
              onChangeText={(v) => update("firstName", v)}
            />

            <TextInput
              placeholderTextColor="#B0B0B0"
              style={styles.inputUnderline}
              placeholder={t("register.lastName")}
              value={form.lastName}
              onChangeText={(v) => update("lastName", v)}
            />

            <Text style={styles.profileHint}>{t("register.name.profileHint1")}</Text>
            <Text style={styles.profileHintBold}>{t("register.name.profileHint2")}</Text>
          </View>

          <GradientButton disabled={disabled} onPress={next} />
        </View>
      )}

      {/* STEP 2 — Email & Password */}
      {step === 2 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.createAccount")}</Text>

            <TextInput
              placeholderTextColor="#888"
              style={styles.input}
              placeholder={t("register.email")}
              autoCapitalize="none"
              value={form.email}
              onChangeText={(v) => update("email", v)}
            />

            <TextInput
              placeholderTextColor="#888"
              style={styles.input}
              placeholder={t("register.password")}
              secureTextEntry
              value={form.password}
              onChangeText={(v) => update("password", v)}
            />

            {!isStrongPassword(form.password) && form.password.length > 0 && (
              <Text style={styles.hint}>{t("register.passwordHint")}</Text>
            )}
          </View>

          <GradientButton disabled={disabled} onPress={next} />
        </View>
      )}

      {/* STEP 3 — Phone Number + OTP */}
      {step === 3 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.phone.title")}</Text>

            <TextInput
              placeholderTextColor="#888"
              style={styles.input}
              placeholder="+212612345678"
              keyboardType="phone-pad"
              value={form.phoneNumber}
              onChangeText={(v) => {
                update("phoneNumber", v);
                setOtpSent(false);
                setOtpError("");
              }}
              editable={!form.phoneVerified}
            />

            {!form.phoneVerified && !form.skippedPhoneVerification ? (
              <>
                {!otpSent ? (
                  <GradientButton
                    label={otpLoading ? t("register.phone.sending", "Sending...") : t("register.phone.sendCode", "Send code")}
                    onPress={async () => {
                      if (!isValidPhone(form.phoneNumber)) return;
                      setOtpLoading(true);
                      setOtpError("");
                      try {
                        await sendOtp(form.phoneNumber);
                        setOtpSent(true);
                        setOtpCode("");
                      } catch (err) {
                        setOtpError(err?.response?.data?.message || "Failed to send code");
                      } finally {
                        setOtpLoading(false);
                      }
                    }}
                    disabled={!isValidPhone(form.phoneNumber) || otpLoading}
                  />
                ) : (
                  <>
                    <TextInput
                      placeholderTextColor="#888"
                      style={styles.input}
                      placeholder={t("register.phone.otpPlaceholder", "Enter 6-digit code")}
                      keyboardType="number-pad"
                      maxLength={6}
                      value={otpCode}
                      onChangeText={(v) => {
                        setOtpCode(v.replace(/\D/g, ""));
                        setOtpError("");
                      }}
                    />
                    <GradientButton
                      label={otpLoading ? t("register.phone.verifying", "Verifying...") : t("register.phone.verify", "Verify")}
                      onPress={async () => {
                        if (otpCode.length !== 6) return;
                        setOtpLoading(true);
                        setOtpError("");
                        try {
                          await verifyOtp(form.phoneNumber, otpCode);
                          update("phoneVerified", true);
                        } catch (err) {
                          setOtpError(err?.response?.data?.message || "Invalid code");
                        } finally {
                          setOtpLoading(false);
                        }
                      }}
                      disabled={otpCode.length !== 6 || otpLoading}
                    />
                    <TouchableOpacity
                      onPress={() => { setOtpSent(false); setOtpCode(""); setOtpError(""); }}
                      style={{ alignSelf: "center", marginTop: 12 }}
                    >
                      <Text style={[styles.link, { fontSize: 14 }]}>
                        {t("register.phone.changeNumber", "Change number")}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {otpError ? (
                  <Text style={[styles.errorText, { marginTop: 8 }]}>{otpError}</Text>
                ) : null}
                {/* <TouchableOpacity
                  onPress={() => update("skippedPhoneVerification", true)}
                  style={{ alignSelf: "center", marginTop: 16 }}
                >
                  <Text style={[styles.link, { fontSize: 14 }]}>
                    {t("register.phone.skipForNow", "Skip for now")}
                  </Text>
                </TouchableOpacity> */}
              </>
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
                <Ionicons name="checkmark-circle" size={24} color="#2e7d32" />
                <Text style={{ color: "#2e7d32", fontWeight: "500" }}>
                  {form.phoneVerified ? t("register.phone.verified", "Phone verified") : t("register.phone.skipped", "Skipped — verify later")}
                </Text>
              </View>
            )}
          </View>

          <GradientButton disabled={disabled} onPress={next} />
        </View>
      )}

      {/* STEP 5 — Birthday */}
      {step === 4 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.birthday.title")}</Text>

            <DatePicker
              t={t}
              form={form}
              show={showCalendar}
              update={update}
              setShow={setShowCalendar}
            />
            <Text style={styles.birthdayHint}>{t("register.birthday.hint")}</Text>
          </View>

          <GradientButton disabled={disabled} onPress={next} />
        </View>
      )}

      {/* STEP 6 — Photos */}
      {step === 5 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.photos.title")}</Text>
            <Text style={styles.photoSubtitle}>{t("register.photos.subtitle")}</Text>

            <View style={styles.photoGrid}>
              {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
                const uri = form.photos[index];

                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.photoWrapper}
                    activeOpacity={0.85}
                    onPress={() => (uri ? removePhoto(uri) : pickPhotos())}
                  >
                    {uri ? (
                      <Image source={{ uri }} style={styles.photoThumb} />
                    ) : (
                      <View style={styles.plusBox}>
                        <Ionicons name="add" size={28} color="#6B6B6B" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <GradientButton disabled={disabled} onPress={next} />
        </View>
      )}

      {/* STEP 6 — Gender (last required before skip) */}
      {step === 6 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.gender.title")}</Text>
            {genderOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.gender === opt.value}
                onPress={() => update("gender", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t(
                  "register.skipForNow",
                  "Skip for now — complete later in profile"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 7 — First Impression */}
      {step === 7 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.firstImpression.title")}
            </Text>
            {firstImpressionOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.firstImpression === opt.value}
                onPress={() => update("firstImpression", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 8 — Self View */}
      {step === 8 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.selfView.title")}</Text>
            {selfViewOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.selfView === opt.value}
                onPress={() => update("selfView", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 9 — Planning Style */}
      {step === 9 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.planningStyle.title")}
            </Text>
            {planningStyleOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.planningStyle === opt.value}
                onPress={() => update("planningStyle", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 10 — Recharge Style (multi) */}
      {step === 10 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.rechargeStyle.title")}
            </Text>
            {rechargeStyleOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.rechargeStyle.includes(opt.value)}
                onPress={() => toggleArrayValue("rechargeStyle", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 11 — Social Preference */}
      {step === 11 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.socialPreference.title")}
            </Text>
            {socialPreferenceOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.socialPreference === opt.value}
                onPress={() => update("socialPreference", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 12 — Social Pace */}
      {step === 12 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.socialPace.title")}</Text>
            {socialPaceOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.socialPace === opt.value}
                onPress={() => update("socialPace", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 13 — Conversation Start */}
      {step === 13 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.conversationStart.title")}
            </Text>
            {conversationStartOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.conversationStart === opt.value}
                onPress={() => update("conversationStart", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 14 — Talk Style */}
      {step === 14 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.talkStyle.title")}</Text>
            {talkStyleOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.talkStyle === opt.value}
                onPress={() => update("talkStyle", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 15 — Favorite Topics (multi grid) */}
      {step === 15 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.favoriteTopics.title")}
            </Text>

            <View style={styles.topicsList}>
              {favoriteTopicsOptions.map((opt) => (
                <Option
                  key={opt.value}
                  label={opt.label}
                  selected={form.favoriteTopics.includes(opt.value)}
                  onPress={() => toggleArrayValue("favoriteTopics", opt.value)}
                />
              ))}
            </View>
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 16 — Relationship Status */}
      {step === 16 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.relationshipStatus.title")}
            </Text>
            {relationshipStatusOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.relationshipStatus === opt.value}
                onPress={() => update("relationshipStatus", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 17 — Goals (multi) */}
      {step === 17 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {t("register.goalsFromSahbi.title")}
            </Text>
            {goalsFromSahbiOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.goalsFromSahbi.includes(opt.value)}
                onPress={() => toggleArrayValue("goalsFromSahbi", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 18 — Dinner Style */}
      {step === 18 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.dinnerStyle.title")}</Text>
            {dinnerStyleOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.dinnerStyle === opt.value}
                onPress={() => update("dinnerStyle", opt.value)}
              />
            ))}
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 19 — Superpower */}
      {step === 19 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.superpower.title")}</Text>
            <TextInput
              placeholderTextColor="#888"
              style={styles.input}
              placeholder={t("register.superpower.placeholder")}
              value={form.superpower}
              onChangeText={(v) => update("superpower", v)}
            />
          </View>

          <View style={styles.stepActions}>
            <GradientButton disabled={disabled} onPress={next} />
            <TouchableOpacity onPress={submit} style={styles.skipLink}>
              <Text style={styles.skipText}>
                {t("register.skipForNow", "Skip — complete in profile")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 20 — Work Status (Final) */}
      {step === 20 && (
        <View style={styles.screen}>
          <View style={styles.content}>
            <Text style={styles.title}>{t("register.workStatus.title")}</Text>
            {workStatusOptions.map((opt) => (
              <Option
                key={opt.value}
                label={opt.label}
                selected={form.workStatus === opt.value}
                onPress={() => update("workStatus", opt.value)}
              />
            ))}
          </View>

          <GradientButton
            label={t("common.finish")}
            disabled={disabled}
            onPress={submit}
          />
        </View>
      )}
    </ScrollView>
  );
}
