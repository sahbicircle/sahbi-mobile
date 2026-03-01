import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNotifications } from "../../hooks/useNotifications";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "../../services/notification.service";
import { styles } from "../notifications.styles";

export default function NotificationsTab() {
  const { notifications, isLoading, refetch } = useNotifications();

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      refetch();
    } catch (err) {
      console.error("Failed to mark all read:", err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      refetch();
    } catch (err) {
      console.error("Failed to mark read:", err);
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleString(undefined, { dateStyle: "short" }) : "";

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: 56, justifyContent: "space-between" }]}>
        <View style={{ width: 40 }} />
        <Text style={[styles.title, { flex: 1, textAlign: "center" }]}>Notifications</Text>
        {notifications.some((n) => !n.readAt) ? (
          <TouchableOpacity onPress={handleMarkAllRead} style={styles.markAll}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(n) => n._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, !item.readAt && styles.cardUnread]}
            onPress={() => handleMarkRead(item._id)}
          >
            <View style={styles.cardHeader}>
              <Ionicons
                name={item.type === "global" ? "megaphone" : "person"}
                size={24}
                color="#eba28a"
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.body ? (
                  <Text style={styles.cardBody} numberOfLines={2}>
                    {item.body}
                  </Text>
                ) : null}
                <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No notifications yet</Text>
        }
      />
    </View>
  );
}
