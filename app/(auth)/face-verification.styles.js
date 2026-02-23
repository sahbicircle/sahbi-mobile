import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginBottom: 20,
    fontSize: 16,
  },
  capture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
  },
});
