import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDate } from "../../helpers/functions.helper";
import { useEvents } from "../../hooks/useEvents";
import { styles } from "./events.styles";

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
        <Text
          style={styles.cardTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
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
    </TouchableOpacity>
  );
};

export default function Events() {
  const insets = useSafeAreaInsets();
  const { events } = useEvents();

  return (
    <FlatList
      data={events}
      keyExtractor={(e) => e._id}
      renderItem={({ item }) => <EventDetails item={item} />}
      ListHeaderComponent={() => <Text style={styles.title}>All Events</Text>}
      contentContainerStyle={[
        styles.main,
        { paddingTop: insets.top + 12 },
      ]}
    />
  );
}
