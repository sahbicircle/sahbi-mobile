import { Text, View } from "react-native";
import { styles } from "./private-chat.styles";

export default function PrivateChat() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Private Chat (Premium)</Text>
      <Text style={styles.text}>
        Private chats are unlocked only after mutual opt-in.
      </Text>
    </View>
  );
}
