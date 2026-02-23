import { Text, View } from "react-native";
import { styles } from "./Header.styles";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
