import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  chatDocumentId,
  findGroupChatForEvent,
} from "../../helpers/chat.helper";
import { formatDateShort } from "../../helpers/functions.helper";
import { useBookings } from "../../hooks/useBooking";
import { ensureEventGroupChat, listChats } from "../../services/chat.service";
import { getEventById } from "../../services/event.service";
import { styles } from "./event-details.styles";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookings } = useBookings();
  const [event, setEvent] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [openingChat, setOpeningChat] = useState(false);

  const goBack = () => router.back();

  useEffect(() => {
    getEventById(id).then(setEvent);
  }, [id]);

  const bookingList = bookings ?? [];
  const isBooked = bookingList.some(
    (b) => String(b.event?._id ?? b.event?.id) === String(id)
  );
  const eventPassed = event?.date && new Date(event.date) < new Date();

  const openTableGroupChat = async () => {
    if (!event?._id) return;
    try {
      setOpeningChat(true);
      await ensureEventGroupChat(event._id);
      const all = await listChats();
      const found = findGroupChatForEvent(all, event._id);
      const cid = chatDocumentId(found);
      if (cid) router.push(`/chats/${cid}`);
      else {
        Alert.alert(
          "Group chat",
          "Your table chat is not available yet. Open the Chats tab to refresh, or try again shortly."
        );
      }
    } catch (err) {
      Alert.alert(
        "Chat",
        err?.response?.data?.message ||
          "Could not open the group chat. Try from the Chats tab."
      );
    } finally {
      setOpeningChat(false);
    }
  };

  if (!event) {
    return (
      <View
        style={[
          styles.container,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  const description =
    event.description ||
    "Brunch is a popular late-morning to early-afternoon meal (typically 10 a.m. to 3 p.m.) that combines breakfast and lunch items, often featuring both sweet and savory dishes, such as Eggs Benedict, pancakes, and cocktails like mimosas.";

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri:
              event.image ||
              "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1169&auto=format&fit=crop",
          }}
          style={styles.cardImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)", "#e85a4a"]}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientOverlay}
          />

          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + 8 }]}
            onPress={goBack}
            activeOpacity={0.7}
          >
            <View style={styles.iconButtonInner}>
              <Ionicons size={22} color="#333" name="chevron-back" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.favoriteButton, { top: insets.top + 8 }]}
            onPress={() => setFavorited(!favorited)}
            activeOpacity={0.7}
          >
            <View style={styles.iconButtonInner}>
              <Ionicons
                size={22}
                color={favorited ? "#c9a227" : "#333"}
                name={favorited ? "star" : "star-outline"}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.imageTextContainer}>
            <Text style={styles.title}>{event.title?.toUpperCase()}</Text>
            <Text style={styles.tagline}>
              {description.split(".")[0]}.
            </Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.detailsOverlay}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaColsContainer}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>{formatDateShort(event.date)}</Text>
          </View>
          <View style={styles.metaColSeparator} />
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Location</Text>
            <Text style={styles.metaValue}>
              {[event.city?.toUpperCase(), event.area || event.location]
                .filter(Boolean)
                .join("\n")}
            </Text>
          </View>
          <View style={styles.metaColSeparator} />
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Rate</Text>
            <View style={styles.rateRow}>
              <Ionicons name="star" size={14} color="#ffd700" />
              <Text style={styles.metaValue}>{event.rate ?? "4.8"}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.aboutTitle}>About event</Text>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        {eventPassed && isBooked ? (
          <TouchableOpacity
            onPress={openTableGroupChat}
            activeOpacity={0.85}
            style={styles.getTicketBtn}
            disabled={openingChat}
          >
            <LinearGradient
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={[
                styles.primaryBtn,
                { justifyContent: "center", columnGap: 10 },
              ]}
              colors={["#84A8D8", "#e85a4a"]}
            >
              <Ionicons name="chatbubbles-outline" size={20} color="white" />
              <Text style={styles.primaryBtnText}>
                {openingChat ? "Opening…" : "Table group chat"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : !eventPassed ? (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/events/booking-confirmation",
                params: { eventId: event._id },
              })
            }
            activeOpacity={0.85}
            style={styles.getTicketBtn}
          >
            <LinearGradient
              end={{ x: 1, y: 0 }}
              start={{ x: 0, y: 0 }}
              style={styles.primaryBtn}
              colors={["#e85a4a", "#f4866e"]}
            >
              <Text style={styles.primaryBtnText}>Get Ticket</Text>
              <View style={styles.chevrons}>
                <Ionicons size={16} color="white" name="chevron-forward" />
                <Ionicons size={16} color="white" name="chevron-forward" />
                <Ionicons size={16} color="white" name="chevron-forward" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
