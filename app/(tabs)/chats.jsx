import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useChats } from "../../hooks/useChats";
import { styles } from "./chats.styles";

export default function Chats() {
  const router = useRouter();
  const { chats, isLoading } = useChats();

  if (isLoading) {
    return (
      <View style={[styles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <FlatList
        data={chats}
        keyExtractor={(c) => String(c.id || c._id) || ""}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/chats/${item.id || item._id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.chatIcon}>
                <Ionicons
                  name={item.type === "event" ? "people" : "person"}
                  size={20}
                  color="#eba28a"
                />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.preview} numberOfLines={1}>
                  {item.lastMessage || "No messages yet"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No chats yet. Book an event to join a group chat!
          </Text>
        }
      />
    </View>
  );
}
