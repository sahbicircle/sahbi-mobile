import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./booking-success.styles";

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking confirmed 🎉</Text>
      <Text style={styles.text}>
        You’ll receive the venue location 24h before the event.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}
