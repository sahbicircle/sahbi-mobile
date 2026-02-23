import { TextInput } from "react-native";
import { styles } from "./Input.styles";

export default function Input(props) {
  return <TextInput {...props} style={[styles.input, props.style]} />;
}
