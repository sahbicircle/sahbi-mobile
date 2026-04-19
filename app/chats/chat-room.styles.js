import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: "#f6f0ed",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  backBtn: {
    padding: 10,
    marginRight: 4,
  },
  headerCenter: {
    flex: 1,
    minWidth: 0,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  headerSub: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  listContent: {
    paddingVertical: 16,
    paddingBottom: 8,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 15,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    maxWidth: "100%",
  },
  rowMine: {
    justifyContent: "flex-end",
  },
  rowTheirs: {
    justifyContent: "flex-start",
  },
  bubbleMine: {
    maxWidth: "82%",
    borderRadius: 18,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  bubbleTheirs: {
    maxWidth: "82%",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(235, 162, 138, 0.35)",
  },
  bubbleMineInner: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sender: {
    fontSize: 12,
    fontWeight: "700",
    color: "#c45c4a",
    marginBottom: 4,
  },
  body: {
    fontSize: 15,
    lineHeight: 21,
    color: "#222",
  },
  bodyMine: {
    color: "#fff",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  input: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: "#f0e8e4",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222",
    marginRight: 10,
    marginBottom: 0,
  },
  send: {
    marginBottom: 2,
    borderRadius: 22,
    overflow: "hidden",
  },
  sendInner: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  sendDisabled: {
    opacity: 0.45,
  },
});
