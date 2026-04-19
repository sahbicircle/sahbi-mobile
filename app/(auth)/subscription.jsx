import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { register } from "../../services/auth.service";
import { getProfile } from "../../services/profile.service";
import { setAuth } from "../../store/auth.store";
import { styles } from "./subscription.styles";

const plans = [
  {
    icon: "star-outline",
    name: "Premium",
    price: 199,
    currency: "MAD",
    period: "month",
    description: "Unlock full access to all features and premium experiences.",
    features: [
      "Unlimited meals access",
      "Chat with everyone",
      "Event invitations",
      "Priority support",
      "No ads",
      "Weekly curated content",
      "Exclusive recipes",
      "VIP community badge",
      "Early access to new features",
    ],
    current: true,
  },
  {
    icon: "flame-outline",
    name: "Essential",
    price: 99,
    currency: "MAD",
    period: "month",
    description: "Enjoy core features and stay connected with the community.",
    features: [
      "Unlimited meals access",
      "Chat with friends",
      "Priority support",
      "No ads",
      "Weekly curated content",
      "Exclusive recipes",
    ],
    current: false,
  },
  {
    icon: "balloon-outline",
    name: "Free",
    price: 0,
    currency: "MAD",
    description:
      "Perfect to get started with basic access and limited features.",
    features: ["Access to basic meals", "Limited chat functionality"],
    current: false,
  },
];

const Plan = ({ key, plan, choose, disabled }) => {
  const isPremium = plan?.name === "Premium";

  return (
    <TouchableOpacity
      onPress={() => choose(plan)}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <LinearGradient
        key={key}
        end={{ x: 0, y: 1 }}
        start={{ x: 1, y: -0.2 }}
        style={styles.card}
        locations={isPremium ? [0, 0.15, 0.65, 1] : [0, 1]}
        colors={
          isPremium
            ? ["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]
            : ["#f5e9da", "#eee"]
        }
      >
        <Ionicons
          name={plan?.icon}
          size={24}
          color="#eba28a"
          style={styles.icon}
        />
        <Text style={{ ...styles.plan, color: isPremium && "white" }}>
          {plan?.name}
        </Text>
        <Text style={{ ...styles.description, color: isPremium && "white" }}>
          {plan?.description}
        </Text>
        <Text style={{ ...styles.price, color: isPremium && "white" }}>
          {plan?.price} MAD {plan?.period ? "/ " + plan?.period : ""}
        </Text>
        {/* <View style={styles.features}>
          {plan?.features?.map((feature) => (
            <Text
              key={feature}
              style={{
                ...styles.feature,
                color: isPremium && "white",
                border: `1px solid ${isPremium ? "white" : "black"}`,
              }}
            >
              {feature}
            </Text>
          ))}
        </View> */}
      </LinearGradient>
    </TouchableOpacity>
  );
};

function getErrorMessage(err) {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message) return err.message;
  if (err?.code === "ERR_NETWORK" || !err?.response)
    return "Network error. Check your connection and try again.";
  return "Registration failed. Please try again.";
}

export default function Subscription() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const fromTicket =
    params.fromTicket === true ||
    params.fromTicket === "true" ||
    params.fromTicket === "1";
  const { user } = params;
  let parsedUser = null;
  try {
    parsedUser = user ? JSON.parse(user) : null;
  } catch {
    parsedUser = null;
  }

  const [loading, setLoading] = useState(false);

  const choose = async (plan) => {
    if (loading) return;

    if (!fromTicket && !parsedUser) {
      Alert.alert(
        "Error",
        "Registration data is missing. Please start from the beginning."
      );
      router.replace("/(auth)/register");
      return;
    }

    setLoading(true);
    try {
      const payload = fromTicket
        ? { subscription: plan?.name }
        : { ...parsedUser, subscription: plan?.name };
      const res = await register(payload);
      if (!res?.user || !res?.token) {
        throw new Error("Invalid response from server");
      }
      await setAuth(res.user, res.token);
      const fullProfile = await getProfile();
      await setAuth(fullProfile, res.token);
      router.replace("/(tabs)/home");
    } catch (err) {
      const msg = getErrorMessage(err);
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    // router.replace("/(auth)/register");
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#eba28a" />
          <Text style={styles.loaderText}>Creating your account...</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.main} scrollEnabled={!loading}>
        <TouchableOpacity style={styles.backBtn} onPress={back}>
          <Ionicons size={24} color="#E8937E" name="chevron-back" />
        </TouchableOpacity>

        <View style={styles.screen}>
          <View style={styles.content}>
            {fromTicket ? null : (
              <Text style={styles.title}>Choose your plan</Text>
            )}

            {plans.map((p) => (
              <Plan key={p?.name} plan={p} choose={choose} disabled={loading} />
            ))}
          </View>

          <Text style={styles.trial}>7-day free trial — card required</Text>
        </View>
      </ScrollView>
    </View>
  );
}
