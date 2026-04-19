import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDateTicket } from "../../../helpers/functions.helper";
import { getBookingById } from "../../../services/booking.service";
import { styles } from "./ticket.styles";

export default function MyTicket() {
  const { bookingId } = useLocalSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      getBookingById(bookingId)
        .then(setBooking)
        .catch(() => setBooking(null));
    }
  }, [bookingId]);

  if (!booking && bookingId) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  const event = booking?.event;
  if (!event) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Ticket not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const eventDate = event.date ? new Date(event.date) : null;
  const now = new Date();
  const diffMs = eventDate ? eventDate - now : 0;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const countdown =
    diffMs > 0
      ? `${diffDays}d ${String(diffHours).padStart(2, "0")}:${String(diffMins).padStart(2, "0")}`
      : "Started";

  const { weekday, monthDay, time } = formatDateTicket(event.date);
  const location = event.location || event.address || `${event.city || ""}, ${event.area || ""}`.trim() || "TBA";
  const lat = event.latitude ?? 31.6295;
  const lng = event.longitude ?? -7.9811;

  const group = booking?.group || {};
  const industries = group.industries?.join(", ") || "—";
  const nationalities = group.nationalities?.join(", ") || "—";
  const languages = group.languages?.join(", ") || "—";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerIcon}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My ticket</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <TouchableOpacity style={styles.countdownBtn} activeOpacity={0.9}>
          <LinearGradient
            colors={["#eba28a", "#84A8D8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.countdownGradient}
          >
            <Text style={styles.countdownText}>Start in {countdown}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your seat is confirmed</Text>
          <Text style={styles.cardDetail}>
            {weekday}, {monthDay}, {time}
          </Text>
          <Text style={styles.cardDetail}>{location}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.9}>
              <LinearGradient
                colors={["#eba28a", "#84A8D8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <Text style={styles.actionBtnText}>Add to Calendar</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.9}>
              <LinearGradient
                colors={["#eba28a", "#84A8D8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <Text style={styles.actionBtnText}>Bring a +1</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your group</Text>
          <View style={styles.groupRow}>
            <Text style={styles.groupLabel}>Industries:</Text>
            <Text style={styles.groupValue}>{industries}</Text>
          </View>
          <View style={styles.groupRow}>
            <Text style={styles.groupLabel}>Nationalities:</Text>
            <Text style={styles.groupValue}>{nationalities}</Text>
          </View>
          <View style={styles.groupRow}>
            <Text style={styles.groupLabel}>Main language spoken:</Text>
            <Text style={styles.groupValue}>{languages}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Restaurant</Text>
          <Text style={styles.restaurantName}>{event.restaurantName || event.venueName || "Venue TBA"}</Text>
          <Text style={styles.restaurantAddress}>{location}</Text>
          <TouchableOpacity
            style={styles.mapPlaceholder}
            onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
              Linking.openURL(url);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="map-outline" size={36} color="#e85a4a" />
            <Text style={styles.mapPlaceholderText}>View on Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusButtons}>
          <TouchableOpacity style={styles.statusBtnPrimary} activeOpacity={0.9}>
            <LinearGradient
              colors={["#eba28a", "#84A8D8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statusGradient}
            >
              <Text style={styles.statusBtnText}>Confirmed</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusBtnSecondary}>
            <Text style={styles.statusBtnSecondaryText}>{"I'll be late"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusBtnSecondary}>
            <Text style={styles.statusBtnSecondaryText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
