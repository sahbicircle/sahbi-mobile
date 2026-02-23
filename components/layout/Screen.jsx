import { View } from "react-native";
import { styles } from "./Screen.styles";

export default function Screen({ children, style }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}
