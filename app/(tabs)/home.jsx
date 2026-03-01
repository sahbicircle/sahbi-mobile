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
import { formatDate } from "../../helpers/functions.helper";
import { useAuth } from "../../hooks/useAuth";
import { useBookings } from "../../hooks/useBooking";
import { useEvents } from "../../hooks/useEvents";
import { useNotifications } from "../../hooks/useNotifications";
import { styles } from "./home.styles";

const EventDetails = ({ item }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
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
        <Text style={styles.cardTitle}>{item.title}</Text>
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
        end={{ x: 0.5, y: 0 }}
        start={{ x: 0.5, y: 1 }}
        style={styles.feedbackCard}
        colors={["#faeeeb", "#eba28a7d"]}
      >
        <View style={styles.feedbackCardText}>
          <Text
            style={{
              fontSize: 18,
              maxWidth: 240,
              fontWeight: 600,
              textAlign: "center",
              fontFamily: "Poppins",
            }}
          >
            How was your group in {item.title}?
          </Text>
          <Text style={{ fontSize: 12, fontFamily: "Poppins" }}>
            let&apos;s connect with each other
          </Text>
          <TouchableOpacity
            style={styles.feedbackBtn}
            onPress={() => router.push(`/profiles/${item._id}`)}
          >
            <Text style={{ fontFamily: "Poppins" }}>Share my feedback</Text>
          </TouchableOpacity>
        </View>

        <Image source={image} style={styles.feedbackCardImage} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function Home() {
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
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.title}>
          Salam, {user?.firstName} {user?.lastName} 👋
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/notifications")}
          style={{ padding: 8, position: "relative" }}
        >
          <Ionicons name="notifications-outline" size={28} color="#333" />
          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: "#FF4C42",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ color: "white", fontSize: 11, fontWeight: "700" }}>
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.bigTitle}>Meet new people in Marrakech</Text>

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
      contentContainerStyle={styles.scrollContent}
      data={events}
      keyExtractor={(e) => e._id}
      renderItem={({ item }) => <EventDetails item={item} />}
      ListHeaderComponent={ListHeader}
      showsVerticalScrollIndicator={false}
    />
  );
}
