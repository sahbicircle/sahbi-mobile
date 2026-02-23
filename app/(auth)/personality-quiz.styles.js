import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fafafa",
  },
  header: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#eba28a",
  },
  title: {
    fontSize: 26,
    color: "white",
    fontWeight: 700,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5e9da",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  question: {
    fontWeight: 600,
    marginBottom: 12,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    elevation: 3, // for Android shadow
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
  },
  button: {
    padding: 16,
    marginTop: 24,
    borderRadius: 9999,
    alignItems: "center",
    backgroundColor: "#eba28a",
  },
  buttonText: {
    color: "white",
    fontWeight: 600,
  },
});
