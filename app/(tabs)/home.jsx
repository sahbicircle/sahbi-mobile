import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDate } from "../../helpers/functions.helper";
import { useAuth } from "../../hooks/useAuth";
import { useBookings } from "../../hooks/useBooking";
import { useEvents } from "../../hooks/useEvents";
import { useNotifications } from "../../hooks/useNotifications";
import { styles } from "./home.styles";

const EventDetails = ({ item, tone = "coral" }) => {
  const router = useRouter();
  const cardStyle = tone === "blue" ? styles.cardBlue : styles.card;

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => router.push(`/events/${item._id}`)}
    >
      <View style={styles.cradHeader}>
        <Image
          source={{
            uri:
              item.image ||
              "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1169&auto=format&fit=crop",
          }}
          style={styles.cardImage}
        />
        <Text
          style={styles.cardTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {String(item.title || "").toUpperCase()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardMetaContainer}>
          <Ionicons size={16} color="white" name="location-outline" />
          <Text style={styles.cardMeta}>{item.location}</Text>
        </View>
        <View style={styles.cardMetaContainer}>
          <Ionicons size={16} color="white" name="calendar-outline" />
          <Text style={styles.cardMeta}>{formatDate(item.date)}</Text>
        </View>
      </View>
      {/* {bookers?.length ? (
        <View style={styles.cardMetaContainer}>
          <View style={styles.bookersContainer}>
            {bookers.map((booker) => (
              <View key={booker} style={styles.booker}>
                <Ionicons size={12} color="white" name="person-outline" />
              </View>
            ))}
          </View>
        </View>
      ) : null} */}
      {/* {isPassed && (
        <View style={styles.passed}>
          <Text style={styles.passedText}>Passed</Text>
        </View>
      )} */}
    </TouchableOpacity>
  );
};

const EventFeedback = ({ item }) => {
  const router = useRouter();

  const image = require("../../assets/images/About-Us-1--Streamline.png");

  return (
    <TouchableOpacity onPress={() => router.push(`/events/${item._id}`)}>
      <LinearGradient
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        style={styles.feedbackCard}
        colors={["#F6C7B9", "#E8A08A"]}
      >
        <View style={styles.feedbackCardText}>
          <Text
            style={{
              fontSize: 17,
              maxWidth: 200,
              fontWeight: "700",
              textAlign: "left",
              fontFamily: "Poppins",
              color: "#111",
            }}
          >
            How was your group?
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins",
              color: "#333",
            }}
          >
            {"Let's connect with each other"}
          </Text>
          <TouchableOpacity
            style={styles.feedbackBtn}
            onPress={() => router.push(`/profiles/${item._id}`)}
          >
            <Text style={{ fontFamily: "Poppins", fontWeight: "600" }}>
              Share my feedback
            </Text>
          </TouchableOpacity>
        </View>

        <Image source={image} style={styles.feedbackCardImage} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Home() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const router = useRouter();
  const { bookings, isLoading: isLoadingBookings } = useBookings();
  const { events, isLoading: isLoadingEvents } = useEvents();
  const { unreadCount } = useNotifications();
  const loading = isLoadingBookings || isLoadingEvents;

  if (loading && (!bookings?.length || !events?.length)) {
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

  const ListHeader = () => (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>
          Salam, {user?.firstName || "Sahbi"}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/notifications")}
          style={styles.bellCircle}
        >
          <Ionicons name="notifications-outline" size={22} color="#333" />
          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#FF4C42",
                borderWidth: 1.5,
                borderColor: "#fff",
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.headlineSerif1}>{"What's happening in"}</Text>
      <Text style={styles.headlineSerif2}>
        {user?.city || "Marrakech"}
      </Text>

      {bookings?.length > 0 && (
        <View style={styles.section}>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <EventFeedback item={item.event} />}
            horizontal
            pagingEnabled
            snapToAlignment="start"
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            decelerationRate="fast"
            nestedScrollEnabled
          />
        </View>
      )}

      <Text style={styles.smallTitle}>Book your next event</Text>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: insets.top + 12 },
      ]}
      data={events}
      keyExtractor={(e) => e._id}
      renderItem={({ item, index }) => (
        <EventDetails item={item} tone={index % 2 === 1 ? "blue" : "coral"} />
      )}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
    />
  );
}
