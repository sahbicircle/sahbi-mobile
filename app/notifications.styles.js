import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faeeeb",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#faeeeb",
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Poppins",
  },
  markAll: {
    padding: 8,
  },
  markAllText: {
    fontSize: 14,
    color: "#eba28a",
    fontWeight: "600",
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  cardUnread: {
    backgroundColor: "#f5e9da",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  cardBody: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: "Poppins",
  },
  cardDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
    fontSize: 16,
  },
});
