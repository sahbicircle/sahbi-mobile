import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
import { getChat, getMessages, sendMessage } from "../../services/chat.service";
import { styles } from "./chat-room.styles";

export default function ChatRoom() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={[styles.container, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#eba28a" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Ionicons size={24} color="#eba28a" name="arrow-back-outline" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {chat?.title || "Chat"}
        </Text>
      </View>

      <FlatList
        style={styles.messageList}
        data={messages}
        keyExtractor={(m) => m.id || m._id || String(Math.random())}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.sender}>{item.senderName}</Text>
            <Text style={styles.body}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No messages yet. Say hello!</Text>
        }
        inverted={false}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={send}
        />
        <TouchableOpacity
          style={[styles.send, sending && styles.sendDisabled]}
          onPress={send}
          disabled={sending || !text.trim()}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
