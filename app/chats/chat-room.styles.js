import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  backBtn: {
    padding: 4,
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  messageList: {
    flex: 1,
    padding: 12,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 32,
  },
  message: {
    backgroundColor: "#f5e9da",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  sender: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  body: {
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5e9da",
    borderRadius: 10,
    padding: 12,
    marginRight: 8,
  },
  send: {
    backgroundColor: "#eba28a",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  sendText: {
    color: "white",
    fontWeight: "600",
  },
  sendDisabled: {
    opacity: 0.6,
  },
});
