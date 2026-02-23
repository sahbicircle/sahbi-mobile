import { Image, View } from "react-native";
import { styles } from "./Avatar.styles";

export default function Avatar({ uri, size = 48 }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
}
