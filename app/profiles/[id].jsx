import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { getBookingUsers } from "../../services/booking.service";
import { likeProfile } from "../../services/profile.service";
import { styles } from "./profiles.styles";

export default function Profiles() {
  const { id: eventId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [bookingUsers, setBookingUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { users } = await getBookingUsers(eventId);
        if (!users?.length) {
          setBookingUsers([]);
          return;
        }
        // Exclude current user and ensure we have firstName/lastName (backend returns them)
        const currentUserId = user?.id || user?._id;
        const filtered = users.filter(
          (u) => u._id.toString() !== currentUserId?.toString()
        );
        setBookingUsers(filtered);
      } catch (err) {
        console.error("Failed to load users:", err);
        setBookingUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) load();
  }, [eventId, user?.id, user?._id]);

  const goBack = () => {
    router.back();
  };

  const handleLike = async (profileId) => {
    try {
      const data = await likeProfile(profileId);
      setBookingUsers((prev) =>
        prev.map((u) =>
          u._id === profileId || u._id?.toString() === profileId
            ? { ...u, liked: true }
            : u
        )
      );

      if (data.match && data.chat?.id) {
        Alert.alert(
          "It's a match! 💕",
          "You both liked each other. Start a conversation!",
          [
            {
              text: "Chat now",
              onPress: () => router.push(`/chats/${data.chat.id}`),
            },
            { text: "Later" },
          ]
        );
      }
    } catch (err) {
      console.error("Failed to like profile:", err);
    }
  };

  const handlePass = (profileId) => {
    setBookingUsers((prev) =>
      prev.map((u) =>
        u._id === profileId || u._id?.toString() === profileId
          ? { ...u, passed: true }
          : u
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <TouchableOpacity style={styles.backBtn} onPress={goBack}>
        <Ionicons size={24} color="#eba28a" name="arrow-back-outline" />
      </TouchableOpacity>

      <Text style={styles.title}>How was it?</Text>
      <Text style={styles.subtitle}>Like or pass on your event buddies</Text>

      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <View style={styles.grid}>
          {bookingUsers
            .filter((u) => !u.passed)
            .map((item) => (
              <View key={item._id} style={styles.card}>
                <Image
                  source={{
                    uri:
                      item?.photoUrl?.[0] ||
                      "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=400&auto=format&fit=crop",
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>
                    {item.firstName} {item.lastName}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.passBtn]}
                    onPress={() => handlePass(item._id)}
                  >
                    <Ionicons size={24} color="white" name="close-outline" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      styles.likeBtn,
                      item.liked && styles.likedBtn,
                    ]}
                    onPress={() => handleLike(item._id)}
                    disabled={item.liked}
                  >
                    <Ionicons
                      size={24}
                      color="white"
                      name={item.liked ? "heart" : "heart-outline"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      )}

      {!loading && bookingUsers.length === 0 && (
        <Text style={styles.empty}>No one else from this event yet.</Text>
      )}
    </ScrollView>
  );
}
