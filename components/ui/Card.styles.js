import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5e9da",
    borderRadius: 16,
    padding: 16,
    // React Native shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Shadow for iOS
    elevation: 3,
  },
});
