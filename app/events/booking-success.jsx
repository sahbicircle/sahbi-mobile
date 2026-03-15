import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getBookingById } from "../../services/booking.service";
import { styles } from "./booking-success.styles";

function BarcodePlaceholder({ code = "SAHBI-XXXX" }) {
  const bars = code.split("").map((c, i) => {
    const w = (c.charCodeAt(0) % 3) + 2;
    return <View key={i} style={[styles.barcodeBar, { width: w }]} />;
  });
  return (
    <View style={styles.barcodeContainer}>
      <Text style={styles.barcodeLabel}>Scan this barcode</Text>
      <View style={styles.barcodeDashed} />
      <View style={styles.barcodeBars}>{bars}</View>
    </View>
  );
}

export default function BookingSuccess() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      getBookingById(bookingId)
        .then(setBooking)
        .catch(() => setBooking(null));
    }
  }, [bookingId]);


  const event = booking?.event;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Booking confirmed 🎉</Text>
      <Text style={styles.text}>
        You'll receive the venue location 24h before the event.
      </Text>

      {event && (
        <>
          <View style={styles.reminderCard}>
            <Text style={styles.reminderTitle}>Your Last Drink</Text>
            <Text style={styles.reminderDesc}>
              All participants are invited to join each other after dinner!
              We'll reveal the location on
            </Text>
            <Text style={styles.reminderDate}>
              {event.date
                ? new Date(event.date).toLocaleString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "—"}
            </Text>
          </View>

          <View style={styles.reminderCard}>
            <Text style={styles.reminderTitle}>Your Feedback</Text>
            <Text style={styles.reminderDesc}>
              Review your group's compatibility from
            </Text>
            <Text style={styles.reminderDate}>
              {event.date
                ? (() => {
                    const d = new Date(event.date);
                    d.setHours(d.getHours() + 4, d.getMinutes() + 30);
                    return d.toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                  })()
                : "—"}
            </Text>
          </View>

          <View style={styles.ticketCard}>
            <View style={styles.ticketImage}>
              {event.image ? (
                <Image
                  source={{ uri: event.image }}
                  style={styles.ticketImageImg}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.ticketImagePlaceholder}>
                  <Ionicons name="restaurant" size={48} color="#e85a4a" />
                </View>
              )}
            </View>
            <Text style={styles.ticketEventName}>
              {event.title?.toUpperCase() || "EVENT"}
            </Text>
            <View style={styles.ticketDetails}>
              <View style={styles.ticketCol}>
                <Text style={styles.ticketLabel}>NAME</Text>
                <Text style={styles.ticketValue}>
                  {booking?.user?.firstName || "Guest"}
                </Text>
                <Text style={styles.ticketLabel}>DATE</Text>
                <Text style={styles.ticketValue}>
                  {event.date
                    ? new Date(event.date).toLocaleString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })
                        .toUpperCase()
                    : "—"}
                </Text>
              </View>
              <View style={styles.ticketCol}>
                <Text style={styles.ticketLabel}>LOCATION</Text>
                <Text style={styles.ticketValue}>
                  {(event.city || "").toUpperCase()}
                  {"\n"}
                  {(event.area || event.location || "").toUpperCase()}
                </Text>
                <Text style={styles.ticketLabel}>TIME</Text>
                <Text style={styles.ticketValue}>
                  {event.date
                    ? new Date(event.date).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                        .toUpperCase()
                    : "—"}
                </Text>
              </View>
            </View>
            <BarcodePlaceholder code={bookingId || "SAHBI"} />
          </View>
        </>
      )}

      {bookingId ? (
        <TouchableOpacity
          style={styles.ticketBtn}
          onPress={() =>
            router.push(`/events/ticket/${bookingId}`)
          }
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#eba28a", "#84A8D8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ticketBtnGradient}
          >
            <Text style={styles.ticketBtnText}>View My Ticket</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Back to home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
