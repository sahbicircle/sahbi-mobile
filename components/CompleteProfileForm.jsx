import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { updateProfile } from "../services/profile.service";
import { setAuth } from "../store/auth.store";
import { getAuth } from "../store/auth.store";

const Option = ({ label, selected, onPress, style }) => (
  <TouchableOpacity
    style={[optionStyle, selected && optionSelected, style]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[optionText, selected && optionTextSelected]}>{label}</Text>
  </TouchableOpacity>
);

const optionStyle = {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderRadius: 999,
  borderColor: "#ddd",
  marginBottom: 8,
};
const optionSelected = { backgroundColor: "#eba28a", borderColor: "#eba28a" };
const optionText = { fontSize: 15, color: "#111" };
const optionTextSelected = { color: "#fff" };

export function CompleteProfileForm({ user, onSaved }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    firstImpression: user?.personality?.firstImpression || "",
    selfView: user?.personality?.selfView || "",
    planningStyle: user?.personality?.planningStyle || "",
    rechargeStyle: user?.personality?.rechargeStyle || [],
    socialPreference: user?.personality?.socialPreference || "",
    socialPace: user?.personality?.socialPace || "",
    conversationStart: user?.personality?.conversationStart || "",
    talkStyle: user?.personality?.talkStyle || "",
    favoriteTopics: user?.personality?.favoriteTopics || [],
    relationshipStatus: user?.relationshipStatus || "",
    goalsFromSahbi: user?.goalsFromSahbi || [],
    dinnerStyle: user?.personality?.dinnerStyle || "",
    superpower: user?.personality?.superpower || "",
    workStatus: user?.workStatus || "",
  });
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const toggleArray = (key, value) =>
    setForm((p) => ({
      ...p,
      [key]: p[key].includes(value)
        ? p[key].filter((v) => v !== value)
        : [...p[key], value],
    }));

  const save = async () => {
    try {
      setSaving(true);
      const payload = {
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
        relationshipStatus: form.relationshipStatus,
        goalsFromSahbi: form.goalsFromSahbi,
        workStatus: form.workStatus,
      };
      const updated = await updateProfile(payload);
      const auth = await getAuth();
      await setAuth(updated, auth.token);
      onSaved?.();
    } catch (err) {
      console.error("Profile save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const opts = (arr) =>
    arr.map((opt) => (
      <Option
        key={opt.value}
        label={opt.label}
        selected={
          Array.isArray(form[opt.key])
            ? form[opt.key].includes(opt.value)
            : form[opt.key] === opt.value
        }
        onPress={() =>
          Array.isArray(form[opt.key])
            ? toggleArray(opt.key, opt.value)
            : update(opt.key, opt.value)
        }
      />
    ));

  const firstImpressionOptions = [
    { value: "THOUGHTFUL", label: t("register.firstImpression.thoughtful"), key: "firstImpression" },
    { value: "ENERGETIC", label: t("register.firstImpression.energetic"), key: "firstImpression" },
    { value: "KIND", label: t("register.firstImpression.kind"), key: "firstImpression" },
  ];
  const selfViewOptions = [
    { value: "WARM_TALKATIVE", label: t("register.selfView.warmTalkative"), key: "selfView" },
    { value: "CALM_THOUGHTFUL", label: t("register.selfView.calmThoughtful"), key: "selfView" },
  ];
  const planningStyleOptions = [
    { value: "CAREFULLY", label: t("register.planningStyle.carefully"), key: "planningStyle" },
    { value: "GO_WITH_FLOW", label: t("register.planningStyle.goWithFlow"), key: "planningStyle" },
  ];
  const rechargeStyleOptions = [
    { value: "COZY_MOMENTS", label: t("register.rechargeStyle.cozyMoments"), key: "rechargeStyle" },
    { value: "LIVELY_ENERGY", label: t("register.rechargeStyle.livelyEnergy"), key: "rechargeStyle" },
    { value: "MEET_NEW_FRIENDS", label: t("register.rechargeStyle.meetNewFriends"), key: "rechargeStyle" },
  ];
  const socialPreferenceOptions = [
    { value: "NEW_EXPERIENCES", label: t("register.socialPreference.newExperiences"), key: "socialPreference" },
    { value: "FAMILIAR_COMFORT", label: t("register.socialPreference.familiarComfort"), key: "socialPreference" },
  ];
  const socialPaceOptions = [
    { value: "JUMP_RIGHT_IN", label: t("register.socialPace.jumpRightIn"), key: "socialPace" },
    { value: "TAKE_IT_SLOW", label: t("register.socialPace.takeItSlow"), key: "socialPace" },
    { value: "PREFER_FAMILIAR", label: t("register.socialPace.preferFamiliar"), key: "socialPace" },
  ];
  const conversationStartOptions = [
    { value: "ASK_QUESTIONS", label: t("register.conversationStart.askQuestions"), key: "conversationStart" },
    { value: "TELL_STORIES", label: t("register.conversationStart.tellStories"), key: "conversationStart" },
    { value: "LISTEN", label: t("register.conversationStart.listen"), key: "conversationStart" },
  ];
  const talkStyleOptions = [
    { value: "LIGHT_JOKES", label: t("register.talkStyle.lightJokes"), key: "talkStyle" },
    { value: "DEEP_THOUGHTS", label: t("register.talkStyle.deepThoughts"), key: "talkStyle" },
    { value: "RANDOM_STORIES", label: t("register.talkStyle.randomStories"), key: "talkStyle" },
  ];
  const favoriteTopicsOptions = [
    { value: "FOOD", label: t("register.favoriteTopics.food"), key: "favoriteTopics" },
    { value: "TRAVEL", label: t("register.favoriteTopics.travel"), key: "favoriteTopics" },
    { value: "FILM_TV", label: t("register.favoriteTopics.filmTv"), key: "favoriteTopics" },
    { value: "CAREER_WORK", label: t("register.favoriteTopics.careerWork"), key: "favoriteTopics" },
    { value: "PERSONAL_GROWTH", label: t("register.favoriteTopics.personalGrowth"), key: "favoriteTopics" },
    { value: "HEALTH_FITNESS", label: t("register.favoriteTopics.healthFitness"), key: "favoriteTopics" },
    { value: "RELATIONSHIPS", label: t("register.favoriteTopics.relationships"), key: "favoriteTopics" },
    { value: "HUMOR_JOKES", label: t("register.favoriteTopics.humorJokes"), key: "favoriteTopics" },
  ];
  const relationshipStatusOptions = [
    { value: "SINGLE", label: t("register.relationshipStatus.single"), key: "relationshipStatus" },
    { value: "MARRIED", label: t("register.relationshipStatus.married"), key: "relationshipStatus" },
    { value: "COMPLICATED", label: t("register.relationshipStatus.complicated"), key: "relationshipStatus" },
    { value: "IN_RELATIONSHIP", label: t("register.relationshipStatus.inRelationship"), key: "relationshipStatus" },
    { value: "PREFER_NOT_TO_SAY", label: t("register.relationshipStatus.preferNotToSay"), key: "relationshipStatus" },
  ];
  const goalsFromSahbiOptions = [
    { value: "MEET_NEW_FRIENDS", label: t("register.goalsFromSahbi.meetNewFriends"), key: "goalsFromSahbi" },
    { value: "FUN_STORIES", label: t("register.goalsFromSahbi.funStories"), key: "goalsFromSahbi" },
    { value: "GOOD_FOOD", label: t("register.goalsFromSahbi.goodFood"), key: "goalsFromSahbi" },
    { value: "NOT_FEEL_LONELY", label: t("register.goalsFromSahbi.notFeelLonely"), key: "goalsFromSahbi" },
  ];
  const dinnerStyleOptions = [
    { value: "CONNECTION", label: t("register.dinnerStyle.connection"), key: "dinnerStyle" },
    { value: "TASTE", label: t("register.dinnerStyle.taste"), key: "dinnerStyle" },
    { value: "SURPRISE", label: t("register.dinnerStyle.surprise"), key: "dinnerStyle" },
  ];
  const workStatusOptions = [
    { value: "EMPLOYED", label: t("register.workStatus.employed"), key: "workStatus" },
    { value: "FREELANCE", label: t("register.workStatus.freelance"), key: "workStatus" },
    { value: "STUDENT", label: t("register.workStatus.student"), key: "workStatus" },
    { value: "BETWEEN_ROLES", label: t("register.workStatus.betweenRoles"), key: "workStatus" },
    { value: "CARE_GIVING", label: t("register.workStatus.careGiving"), key: "workStatus" },
    { value: "PREFER_NOT_TO_SAY", label: t("register.workStatus.preferNotToSay"), key: "workStatus" },
  ];

  const section = (title, children) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#333" }}>
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator>
      {section(t("register.firstImpression.title"), opts(firstImpressionOptions))}
      {section(t("register.selfView.title"), opts(selfViewOptions))}
      {section(t("register.planningStyle.title"), opts(planningStyleOptions))}
      {section(t("register.rechargeStyle.title"), opts(rechargeStyleOptions))}
      {section(t("register.socialPreference.title"), opts(socialPreferenceOptions))}
      {section(t("register.socialPace.title"), opts(socialPaceOptions))}
      {section(t("register.conversationStart.title"), opts(conversationStartOptions))}
      {section(t("register.talkStyle.title"), opts(talkStyleOptions))}
      {section(t("register.favoriteTopics.title"), opts(favoriteTopicsOptions))}
      {section(t("register.relationshipStatus.title"), opts(relationshipStatusOptions))}
      {section(t("register.goalsFromSahbi.title"), opts(goalsFromSahbiOptions))}
      {section(t("register.dinnerStyle.title"), opts(dinnerStyleOptions))}
      {section(
        t("register.superpower.title"),
        <TextInput
          placeholder={t("register.superpower.placeholder")}
          value={form.superpower}
          onChangeText={(v) => update("superpower", v)}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            fontSize: 15,
          }}
        />
      )}
      {section(t("register.workStatus.title"), opts(workStatusOptions))}

      <TouchableOpacity
        onPress={save}
        disabled={saving}
        style={{
          backgroundColor: "#eba28a",
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            {t("common.continue", "Save profile")}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
