import { usePaymentSheet } from "../../lib/stripe";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createBooking } from "../../services/booking.service";
import { createTicketPaymentIntent } from "../../services/payment.service";
import { getEventById } from "../../services/event.service";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./booking-confirmation.styles";

const Option = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.option, selected && styles.optionSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const hasActiveSubscription = (sub) =>
  sub === "Premium" || sub === "Essential";

export default function BookingConfirmation() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const { user } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [ticketTab, setTicketTab] = useState("subscription");

  useEffect(() => {
    if (eventId) getEventById(eventId).then(setEvent).catch(console.error);
  }, [eventId]);

  const confirmSubscription = async () => {
    if (!eventId) return;
    try {
      setLoading(true);
      setError("");
      await createBooking(eventId);
      router.replace("/events/booking-success");
    } catch (err) {
      console.error("Booking error:", err);
      setError(err?.response?.data?.message || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirmOneTicket = async () => {
    if (!eventId || !event) return;
    try {
      setLoading(true);
      setError("");
      const { clientSecret, paymentIntentId: piId, free } =
        await createTicketPaymentIntent(eventId);

      if (free || !clientSecret) {
        await createBooking(eventId);
        router.replace("/events/booking-success");
        return;
      }

      const { error: initErr } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Sahbi",
        returnURL: "sahbimobile://stripe-redirect",
        applePay: { merchantCountryCode: "MA" },
        googlePay: {
          merchantCountryCode: "MA",
          testEnv: __DEV__,
        },
      });
      if (initErr) {
        setError(initErr.message || "Failed to initialize payment");
        return;
      }

      const { error: presentErr } = await presentPaymentSheet();
      if (presentErr) {
        if (presentErr.code !== "Canceled") {
          setError(presentErr.message || "Payment failed");
        }
        return;
      }

      await createBooking(eventId, piId);
      router.replace("/events/booking-success");
    } catch (err) {
      console.error("Payment error:", err);
      setError(err?.response?.data?.message || err?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const confirm = async () => {
    if (ticketTab === "subscription") {
      await confirmSubscription();
    } else {
      await confirmOneTicket();
    }
  };
  const [form, setForm] = useState({
    language: "",
    dinner: "",
    budget: "",
  });

  const options = {
    languages: ["Arabic", "English", "French", "German", "Chinese", "Japanese"],
    dinner: ["Vegetarian", "Vegan", "Seafood", "Meat", "Gluten-Free", "Other"],
    budget: ["Under 200 DH", "Between 200 DH & 400 DH", "Above 400 DH"],
  };

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => {
    setStep(step + 1);
  };

  const back = () => {
    router.back();
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.backBtn} onPress={back}>
        <Ionicons size={24} color="#eba28a" name="arrow-back-outline" />
      </TouchableOpacity>

      {step === 0 && (
        <View style={styles.screen}>
          <Text style={styles.title}>Your Dinner </Text>

          <Text style={styles.subtitle}>
            What Language(S) Are You Willing To Speak?
          </Text>
          <View style={styles.options}>
            {options.languages.map((g) => (
              <Option
                key={g}
                label={g}
                selected={form.language === g}
                onPress={() => update("language", g)}
              />
            ))}
          </View>

          <Text style={styles.subtitle}>
            What Are You Willing To Spend At Dinner ?
          </Text>
          <View style={styles.options}>
            {options.budget.map((g) => (
              <Option
                key={g}
                label={g}
                selected={form.budget === g}
                onPress={() => update("budget", g)}
              />
            ))}
          </View>

          <Text style={styles.subtitle}>
            What Menu Options Do You Want To See At Your
          </Text>
          <View style={styles.options}>
            {options.dinner.map((g) => (
              <Option
                key={g}
                label={g}
                selected={form.dinner === g}
                onPress={() => update("dinner", g)}
              />
            ))}
          </View>
        </View>
      )}

      {step === 1 && (
        <View style={styles.screen}>
          <Text style={styles.title}>Get Ticket</Text>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                ticketTab === "subscription" && styles.tabActive,
              ]}
              onPress={() => setTicketTab("subscription")}
            >
              <Text
                style={[
                  styles.tabText,
                  ticketTab === "subscription" && styles.tabTextActive,
                ]}
              >
                Subscription
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, ticketTab === "ticket" && styles.tabActive]}
              onPress={() => setTicketTab("ticket")}
            >
              <Text
                style={[
                  styles.tabText,
                  ticketTab === "ticket" && styles.tabTextActive,
                ]}
              >
                One Ticket
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {ticketTab === "subscription" ? (
            <View style={styles.tabContent}>
              {hasActiveSubscription(user?.subscription) ? (
                <Text style={styles.tabDescription}>
                  This event is included with your {user?.subscription} subscription.
                </Text>
              ) : (
                <Text style={styles.tabDescription}>
                  Subscribe to get access to all events. Or use One Ticket to pay for this event only.
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.tabContent}>
              <Text style={styles.tabDescription}>
                {(event?.price ?? 0) > 0
                  ? `Pay ${event.price} MAD for this event. Apple Pay & Google Pay accepted.`
                  : "This event is free. Confirm to book."}
              </Text>
            </View>
          )}
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <GradientButton
        onPress={
          step === 0
            ? next
            : ticketTab === "subscription" && !hasActiveSubscription(user?.subscription)
              ? () => setTicketTab("ticket")
              : confirm
        }
        label={
          loading
            ? "Please wait..."
            : step === 0
              ? "Next"
              : ticketTab === "subscription" && !hasActiveSubscription(user?.subscription)
                ? "Use One Ticket to pay"
                : "Confirm"
        }
        disabled={loading}
      />
    </View>
  );
}

const GradientButton = ({ label = "Confirm", onPress, disabled }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.85}>
    <LinearGradient
      end={{ x: 0, y: 1 }}
      start={{ x: 1, y: -0.2 }}
      style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled]}
      locations={[0, 0.15, 0.65, 1]}
      colors={
        disabled
          ? ["#ddd", "#ccc"]
          : ["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]
      }
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);
