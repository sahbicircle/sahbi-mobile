import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDate } from "../../helpers/functions.helper";
import { getEventById } from "../../services/event.service";
import { styles } from "./event-details.styles";

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  const goBack = () => {
    router.replace("/(tabs)/home"); // navigate back
  };

  useEffect(() => {
    getEventById(id).then(setEvent);
  }, [id]);

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

  return (
    <View style={styles.container}>
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
            colors={["rgba(0,0,0,0)", "#f4866e"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientOverlay}
          />

          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons size={24} color="white" name="arrow-back-outline" />
          </TouchableOpacity>

          <View style={styles.imageTextContainer}>
            <Text style={styles.title}>{event.title}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <View style={styles.metaColsContainer}>
          <View style={styles.metaCol}>
            <Text style={styles.metaTitle}>Location</Text>
            <Text style={styles.meta}>{event.city}</Text>
          </View>
          <View style={styles.metaColSeparator} />
          <View style={styles.metaCol}>
            <Text style={styles.metaTitle}>Date</Text>
            <Text style={styles.meta}>{formatDate(event.date)}</Text>
          </View>
          {/* <View style={styles.metaColSeparator} /> */}
          {/* <View style={styles.metaCol}>
            <Text style={styles.metaTitle}>Price</Text>
            <Text style={styles.meta}>{event.budget || 600} MAD</Text>
          </View> */}
        </View>
        <Text style={styles.meta}>About the event</Text>
        <Text style={styles.description}>
          {event.description || "Join us for a memorable dining experience."}
          Brunch is a popular late-morning to early-afternoon meal (typically 10
          a.m. to 3 p.m.) that combines breakfast and lunch items, often
          featuring both sweet and savory dishes, such as Eggs Benedict,
          pancakes, and cocktails like mimosas
        </Text>
      </View>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/events/booking-confirmation",
            params: { eventId: event._id },
          })
        }
        activeOpacity={0.85}
      >
        <LinearGradient
          end={{ x: 0, y: 1 }}
          start={{ x: 1, y: -0.2 }}
          style={styles.primaryBtn}
          locations={[0, 0.15, 0.65, 1]}
          colors={["#6A78B8", "#84A8D8", "#B796A3", "#DD866E"]}
        >
          <Text style={styles.primaryBtnText}>Get ticket</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
