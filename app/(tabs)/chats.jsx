import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  chatDocumentId,
  eventIdFromChat,
  isEventGroupChat,
  isPrivateChat,
} from "../../helpers/chat.helper";
import { useChats } from "../../hooks/useChats";
import { styles } from "./chats.styles";

function formatRelativeTime(iso) {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Chats() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { chats, isLoading, refreshing, refresh } = useChats();

  const visibleChats = chats.filter((c) => {
    if (isPrivateChat(c)) return true;
    if (isEventGroupChat(c)) {
      const eventDate = c.event?.date ? new Date(c.event.date) : null;
      return eventDate && eventDate <= new Date();
    }
    return true;
  });

  const groupChats = visibleChats.filter(isEventGroupChat);
  const privateChats = visibleChats.filter(isPrivateChat);

  const sections = [
    { title: "Dinner groups", data: groupChats },
    { title: "Private", data: privateChats },
  ].filter((s) => s.data.length > 0);

  const onRefresh = () =>
    refresh({ syncPastEventGroups: true, isUserPull: true });

  const renderItem = ({ item }) => {
    const cid = chatDocumentId(item);
    const group = isEventGroupChat(item);
    const lastAt = item.lastMessageAt || item.updatedAt || item.createdAt;
    const rel = formatRelativeTime(lastAt);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() => router.push(`/chats/${cid}`)}
      >
        <View style={styles.cardRow}>
          <View style={styles.avatarWrap}>
            <LinearGradient
              colors={
                group ? ["#84A8D8", "#e85a4a"] : ["#eba28a", "#f5c4b8"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <Ionicons
                name={group ? "people" : "heart"}
                size={26}
                color="#fff"
              />
            </LinearGradient>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title ||
                (group
                  ? item.event?.title || "Dinner group"
                  : "Private chat")}
            </Text>
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {group ? "Everyone at dinner" : "Mutual match"}
                </Text>
              </View>
            </View>
            <Text style={styles.preview} numberOfLines={2}>
              {item.lastMessage?.text ||
                item.lastMessage ||
                "No messages yet — say hello!"}
            </Text>
            {rel ? <Text style={styles.time}>{rel}</Text> : null}
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#ccc"
            style={styles.chevron}
          />
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading && !chats.length) {
    return (
      <View
        style={[
          styles.safe,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  return (
    <View style={[styles.safe, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>
          Group chats open after your dinner. Private chats appear when you both
          like each other.
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => chatDocumentId(item) || eventIdFromChat(item)}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#eba28a"
            colors={["#eba28a"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="chatbubbles-outline" size={56} color="#dcc" />
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptyText}>
              After a past dinner you booked, your table group chat shows up
              here. When you and someone both tap like, a private chat is
              created automatically.
            </Text>
          </View>
        }
      />
    </View>
  );
}
