import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { usePaymentSheet } from "../../lib/stripe";
import { createBooking } from "../../services/booking.service";
import { getEventById } from "../../services/event.service";
import { createTicketPaymentIntent } from "../../services/payment.service";
import { styles } from "./booking-confirmation.styles";

const BUDGET_OPTIONS = ["Under 200 DH", "200-400 DH", "+ 400 DH"];
const MENU_OPTIONS = ["I Eat Everything", "Vegetarian", "Meat"];
const LANGUAGES = [
  "Arabic",
  "English",
  "French",
  "German",
  "Chinese",
  "Japanese",
];

const hasActiveSubscription = (sub) =>
  sub === "Premium" || sub === "Essential" || sub === "Complete Pro";

const SUBSCRIPTION_PLANS = [
  {
    id: "complete-pro",
    name: "Complete Pro",
    price: "49",
    description: "All Advanced Functions For only 1",
    subtext:
      "14 Days For A Pro-Rated Refund, With No Refund Available After 14 Days.",
    variant: "complete", // peach/soft gradient
  },
  {
    id: "premium",
    name: "Premium Membership",
    subname: "(Single User)",
    price: "99",
    features: [
      "All Standard events + Exclusive Sahbi Night & Sahbi Forme",
      "Priority RSVP & Guest/Plus-one passes",
      "Verified badge & concierge support",
    ],
    variant: "premium", // coral/deep gradient
  },
];

const TICKET_PLANS = [
  {
    id: "normal",
    name: "Ticket Normal",
    subname: "Standard access to this event",
    priceKey: "event", // use event price
    features: ["One seat at the dinner", "Meet your group"],
    variant: "normal", // soft blue
  },
  {
    id: "premium",
    name: "Premium Ticket",
    subname: "Add a guest for free",
    priceKey: "premium", // may have different price
    features: [
      "One seat for you",
      "Bring a +1 at no extra cost",
      "Same great experience",
    ],
    variant: "premium", // coral gradient
    badge: "Best value",
  },
];

export default function BookingConfirmation() {
  const router = useRouter();
  const { eventId } = useLocalSearchParams();
  const { user } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(2);
  const [ticketTab, setTicketTab] = useState("Subscription");
  const [selectedTicketPlan, setSelectedTicketPlan] = useState("normal");
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const [form, setForm] = useState({
    language: "",
    budget: "",
    dinner: [], // multi-select: I Eat Everything, Vegetarian, Meat
  });

  useEffect(() => {
    if (eventId) getEventById(eventId).then(setEvent).catch(console.error);
  }, [eventId]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleDinner = (opt) => {
    setForm((prev) => {
      const arr = prev.dinner.includes(opt)
        ? prev.dinner.filter((d) => d !== opt)
        : [...prev.dinner, opt];
      return { ...prev, dinner: arr };
    });
  };

  const confirmSubscription = async () => {
    if (!eventId) return;
    try {
      setLoading(true);
      setError("");
      const res = await createBooking(eventId, null, {
        language: form.language,
        budget: form.budget,
        dinner: form.dinner,
      });
      router.replace({
        pathname: "/events/booking-success",
        params: { bookingId: res?.booking?._id || res?._id },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const confirmOneTicket = async () => {
    if (!eventId || !event) return;
    const withPlusOne = selectedTicketPlan === "premium";
    try {
      setLoading(true);
      setError("");
      const {
        clientSecret,
        paymentIntentId: piId,
        free,
      } = await createTicketPaymentIntent(eventId, { withPlusOne });

      if (free || !clientSecret) {
        const res = await createBooking(eventId, null, {
          withPlusOne,
          language: form.language,
          budget: form.budget,
          dinner: form.dinner,
        });
        router.replace({
          pathname: "/events/booking-success",
          params: { bookingId: res?.booking?._id || res?._id },
        });
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
        if (presentErr.code !== "Canceled")
          setError(presentErr.message || "Payment failed");
        return;
      }

      const res = await createBooking(eventId, piId, {
        withPlusOne,
        language: form.language,
        budget: form.budget,
        dinner: form.dinner,
      });
      router.replace({
        pathname: "/events/booking-success",
        params: { bookingId: res?.booking?._id || res?._id },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const confirm = async () => {
    if (hasActiveSubscription(user?.subscription)) {
      await confirmSubscription();
    } else if (ticketTab === "Subscription") {
      await confirmSubscription();
    } else {
      await confirmOneTicket();
    }
  };

  const dinnerLabel = form.dinner.length ? form.dinner.join(", ") : "—";

  const steps = ["Preferences", "Review", "Payment"];
  const currentStep = step;

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons size={24} color="#e85a4a" name="arrow-back-outline" />
        </TouchableOpacity>
        <View style={styles.stepIndicator}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.stepDot,
                i <= currentStep && styles.stepDotActive,
                i === currentStep && styles.stepDotCurrent,
              ]}
            />
          ))}
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Step 0: Your Dinner form */}
      {step === 0 && (
        <ScrollView
          style={styles.scrollWrap}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Your Dinner</Text>

          <Text style={styles.subtitle}>
            What Language(S) Are You Willing To Speak At Dinner?
          </Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowLanguagePicker(true)}
          >
            <LinearGradient
              colors={["#f5c4b8", "#eba28a"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dropdownGradient}
            >
              <Text style={styles.dropdownText}>
                {form.language || "Language"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            What Are You Willing To Spend At Dinner? (Required)
          </Text>
          <View style={styles.radioGroup}>
            {BUDGET_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.radioOption,
                  form.budget === opt && styles.radioSelected,
                ]}
                onPress={() => update("budget", opt)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.radioCircle,
                    form.budget === opt && styles.radioCircleFilled,
                  ]}
                >
                  {form.budget === opt && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.radioLabel}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subtitle}>
            What Menu Options Do You Want To See At Your Dinner? (Required)
          </Text>
          <View style={styles.checkboxGroup}>
            {MENU_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.checkboxOption,
                  form.dinner.includes(opt) && styles.checkboxSelected,
                ]}
                onPress={() => toggleDinner(opt)}
                activeOpacity={0.8}
              >
                <Checkbox
                  value={form.dinner.includes(opt)}
                  onValueChange={() => toggleDinner(opt)}
                  color={form.dinner.includes(opt) ? "#eba28a" : undefined}
                  style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Step 1: Preferences review */}
      {step === 1 && (
        <View style={styles.screen}>
          <ImageBackground
            source={{
              uri:
                event?.image ||
                "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1169&auto=format&fit=crop",
            }}
            style={{ ...styles.reviewBg, justifyContent: "flex-end" }}
          >
            <View style={styles.reviewOverlay} />
            <View style={styles.reviewCard}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Budget</Text>
                <Text style={styles.reviewValue}>{form.budget || "—"}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Dinner Options</Text>
                <Text style={styles.reviewValue}>{dinnerLabel}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Language</Text>
                <Text style={styles.reviewValue}>{form.language || "—"}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.editPrefsBtn}
              onPress={() => setStep(0)}
            >
              <Text style={styles.editPrefsText}>Edit My Preferences</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      )}

      {/* Step 2: Unlimited Access / Plans */}
      {step === 2 && (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Unlimited Access</Text>
          <Text style={styles.planSubtitle}>
            Enjoy Delicious Dinners With Great Company Every Wednesday. Creating
            Memorable Experiences Together.
          </Text>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                ticketTab === "Subscription" && styles.tabActive,
              ]}
              onPress={() => setTicketTab("Subscription")}
            >
              <Text
                style={[
                  styles.tabText,
                  ticketTab === "Subscription" && styles.tabTextActive,
                ]}
              >
                Subscription
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, ticketTab === "1 Ticket" && styles.tabActive]}
              onPress={() => setTicketTab("1 Ticket")}
            >
              <Text
                style={[
                  styles.tabText,
                  ticketTab === "1 Ticket" && styles.tabTextActive,
                ]}
              >
                1 Ticket
              </Text>
            </TouchableOpacity>
          </View>

          {ticketTab === "Subscription" && (
            <View style={styles.planCards}>
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isPremium = plan.variant !== "complete";
                const gradientColors = !isPremium
                  ? ["#ae8e87", "#f2d6ce"]
                  : ["#76a1d2", "#f38773"];

                return (
                  <LinearGradient
                    key={plan.id}
                    colors={gradientColors}
                    start={{ x: 1, y: 0.25 }}
                    end={{ x: 0.5, y: 0.75 }}
                    style={[
                      styles.planCard,
                      plan.variant === "premium" && styles.planCardPremium,
                    ]}
                  >
                    <Ionicons
                      name="star"
                      size={24}
                      color="#dfb322"
                      style={styles.planCrown}
                    />
                    <View style={styles.planBadge}>
                      <Text style={styles.planBadgeText}>Current Plan</Text>
                    </View>
                    <Text
                      style={{ ...styles.planName, color: isPremium && "#fff" }}
                    >
                      {plan.name}
                    </Text>
                    {plan.subname && (
                      <Text
                        style={{
                          ...styles.planSubname,
                          color: isPremium && "#fff",
                        }}
                      >
                        {plan.subname}
                      </Text>
                    )}
                    <Text
                      style={{ ...styles.planDesc, color: isPremium && "#fff" }}
                    >
                      {plan.description}
                    </Text>
                    {plan.subtext && (
                      <Text
                        style={{
                          ...styles.planSubtext,
                          color: isPremium && "#fff",
                        }}
                      >
                        {plan.subtext}
                      </Text>
                    )}
                    {plan.features?.map((f, i) => (
                      <Text
                        key={i}
                        style={{
                          ...styles.planFeature,
                          color: isPremium && "#fff",
                        }}
                      >
                        • {f}
                      </Text>
                    ))}
                    <View style={styles.planPriceBox}>
                      <Text style={styles.planPrice}>{plan.price}Dh</Text>
                    </View>
                  </LinearGradient>
                );
              })}
            </View>
          )}

          {ticketTab === "1 Ticket" && (
            <View style={styles.planCards}>
              {hasActiveSubscription(user?.subscription) ? (
                <View style={styles.includedCard}>
                  <Ionicons name="checkmark-circle" size={48} color="#22c55e" />
                  <Text style={styles.includedTitle}>
                    Included in your plan
                  </Text>
                  <Text style={styles.includedDesc}>
                    This event is included with your {user?.subscription}{" "}
                    subscription. No additional payment required.
                  </Text>
                </View>
              ) : (
                TICKET_PLANS.map((plan) => {
                  const isSelected = selectedTicketPlan === plan.id;
                  const isPremium = plan.variant !== "complete";
                  const gradientColors = !isPremium
                    ? ["#ae8e87", "#f2d6ce"]
                    : ["#76a1d2", "#f38773"];
                  const price =
                    plan.id === "normal"
                      ? event?.price ?? 0
                      : event?.premiumPrice ?? event?.price ?? 0;

                  return (
                    <TouchableOpacity
                      key={plan.id}
                      activeOpacity={0.9}
                      onPress={() => setSelectedTicketPlan(plan.id)}
                      style={[
                        styles.ticketPlanTouchable,
                        isSelected && styles.ticketPlanSelected,
                      ]}
                    >
                      <LinearGradient
                        key={plan.id}
                        colors={gradientColors}
                        start={{ x: 1, y: 0.25 }}
                        end={{ x: 0.5, y: 0.75 }}
                        style={[
                          styles.planCard,
                          plan.variant === "premium" && styles.planCardPremium,
                        ]}
                      >
                        <Ionicons
                          name={
                            plan.id === "normal"
                              ? "ticket-outline"
                              : "person-add-outline"
                          }
                          size={24}
                          color={
                            plan.variant === "normal" ? "#4a6fa5" : "#c94a3a"
                          }
                          style={styles.planCrown}
                        />
                        {plan.badge && (
                          <View style={styles.planBadge}>
                            <Text style={styles.planBadgeText}>
                              {plan.badge}
                            </Text>
                          </View>
                        )}
                        <Text
                          style={{
                            ...styles.planName,
                            color: isPremium && "#fff",
                          }}
                        >
                          {plan.name}
                        </Text>
                        {plan.subname && (
                          <Text
                            style={{
                              ...styles.planSubname,
                              color: isPremium && "#fff",
                            }}
                          >
                            {plan.subname}
                          </Text>
                        )}
                        <Text
                          style={{
                            ...styles.planDesc,
                            color: isPremium && "#fff",
                          }}
                        >
                          {plan.description}
                        </Text>
                        {plan.subtext && (
                          <Text
                            style={{
                              ...styles.planSubtext,
                              color: isPremium && "#fff",
                            }}
                          >
                            {plan.subtext}
                          </Text>
                        )}
                        {plan.features?.map((f, i) => (
                          <Text
                            key={i}
                            style={{
                              ...styles.planFeature,
                              color: isPremium && "#fff",
                            }}
                          >
                            • {f}
                          </Text>
                        ))}
                        <View style={styles.planPriceBox}>
                          <Text style={styles.planPrice}>
                            {price > 0 ? `${price}` : "Free"}Dh
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          )}
        </ScrollView>
      )}

      {/* Language Picker Modal */}
      <Modal
        visible={showLanguagePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowLanguagePicker(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.modalContent}
          >
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.modalOption}
                onPress={() => {
                  update("language", lang);
                  setShowLanguagePicker(false);
                }}
              >
                <Text style={styles.modalOptionText}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <GradientButton
        onPress={
          step === 0
            ? () => setStep(1)
            : step === 1
            ? () => setStep(2)
            : ticketTab === "Subscription" &&
              !hasActiveSubscription(user?.subscription)
            ? () => setTicketTab("1 Ticket")
            : confirm
        }
        label={
          loading
            ? "Please wait..."
            : step === 0
            ? "Next"
            : step === 1
            ? "Continue"
            : ticketTab === "Subscription" &&
              !hasActiveSubscription(user?.subscription)
            ? "Use One Ticket to pay"
            : "Confirm"
        }
        disabled={loading}
      />
    </View>
  );
}

const GradientButton = ({ label, onPress, disabled }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.85}>
    <LinearGradient
      end={{ x: 1, y: 0 }}
      start={{ x: 0, y: 0 }}
      style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled]}
      colors={disabled ? ["#ddd", "#ccc"] : ["#e85a4a", "#84A8D8"]}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);
