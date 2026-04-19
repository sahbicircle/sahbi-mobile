import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getMessageSenderId,
  getMessageSenderName,
  isEventGroupChat,
  isPrivateChat,
} from "../../helpers/chat.helper";
import { useAuth } from "../../hooks/useAuth";
import { getChat, getMessages, sendMessage } from "../../services/chat.service";
import { styles } from "./chat-room.styles";

export default function ChatRoom() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  const myId = String(user?._id ?? user?.id ?? "");

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const loadChat = useCallback(async () => {
    if (!id) return;
    try {
      const chatData = await getChat(id);
      setChat(chatData);
    } catch (err) {
      console.error("Failed to load chat:", err);
    }
  }, [id]);

  const loadMessages = useCallback(async () => {
    if (!id) return;
    try {
      const list = await getMessages(id);
      setMessages(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    }
  }, [id]);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadChat(), loadMessages()]).finally(() => setLoading(false));
  }, [loadChat, loadMessages]);

  useEffect(() => {
    if (messages.length) scrollToBottom();
  }, [messages.length, scrollToBottom]);

  useEffect(() => {
    if (!chat || !isEventGroupChat(chat)) return;
    const eventDate = chat.event?.date ? new Date(chat.event.date) : null;
    if (eventDate && eventDate > new Date()) {
      router.back();
    }
  }, [chat, router]);

  const isMine = (msg) => {
    if (msg?.demoAsCurrentUser) return true;
    const sid = getMessageSenderId(msg);
    return Boolean(sid && myId && sid === myId);
  };

  const send = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    try {
      setSending(true);
      const msg = await sendMessage(id, trimmed);
      setMessages((prev) => [...prev, msg]);
      setText("");
    } catch (err) {
      console.error("Failed to send:", err);
    } finally {
      setSending(false);
    }
  };

  const goBack = () => router.back();

  const headerSubtitle = (() => {
    if (!chat) return "";
    if (isEventGroupChat(chat))
      return chat.event?.title
        ? `Dinner · ${chat.event.title}`
        : "Your table group";
    if (isPrivateChat(chat)) return "Private conversation";
    return "";
  })();

  const renderMessage = ({ item }) => {
    const mine = isMine(item);
    const showSender =
      isEventGroupChat(chat) && !mine && getMessageSenderName(item);

    return (
      <View
        style={[styles.row, mine ? styles.rowMine : styles.rowTheirs]}
      >
        {mine ? (
          <LinearGradient
            colors={["#e85a4a", "#84A8D8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bubbleMine}
          >
            <View style={styles.bubbleMineInner}>
              <Text style={[styles.body, styles.bodyMine]}>
                {item.text ?? item.body ?? item.content ?? ""}
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.bubbleTheirs}>
            {showSender ? (
              <Text style={styles.sender}>{getMessageSenderName(item)}</Text>
            ) : null}
            <Text style={styles.body}>
              {item.text ?? item.body ?? item.content ?? ""}
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.flex,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? insets.top + 8 : 0}
    >
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons size={24} color="#e85a4a" name="arrow-back-outline" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {chat?.title ||
              chat?.event?.title ||
              (isPrivateChat(chat) ? "Private chat" : "Chat")}
          </Text>
          {headerSubtitle ? (
            <Text style={styles.headerSub} numberOfLines={1}>
              {headerSubtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <FlatList
        ref={listRef}
        style={styles.messageList}
        contentContainerStyle={styles.listContent}
        data={messages}
        keyExtractor={(m, index) =>
          String(m.id ?? m._id ?? `msg-${index}`)
        }
        renderItem={renderMessage}
        ListEmptyComponent={
          <Text style={styles.empty}>No messages yet. Say hello!</Text>
        }
      />

      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 10 }]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          placeholderTextColor="#999"
          returnKeyType="default"
          multiline
        />
        <TouchableOpacity
          style={[styles.send, sending && styles.sendDisabled]}
          onPress={send}
          disabled={sending || !text.trim()}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={["#e85a4a", "#84A8D8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendInner}
          >
            <Text style={styles.sendText}>Send</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
