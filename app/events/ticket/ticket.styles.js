import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f6f8",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  headerIcon: {
    padding: 8,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 4,
  },
  scroll: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
  },
  countdownBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#eba28a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  countdownGradient: {
    paddingVertical: 18,
    alignItems: "center",
  },
  countdownText: {
    fontSize: 17,
    fontWeight: "700",
    color: "white",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 14,
  },
  cardDetail: {
    fontSize: 15,
    color: "#555",
    marginBottom: 10,
    lineHeight: 22,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  actionGradient: {
    paddingVertical: 12,
    alignItems: "center",
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  groupRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  groupLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  groupValue: {
    fontSize: 14,
    color: "#333",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: "#eba28a",
    fontWeight: "600",
    marginTop: 8,
  },
  statusButtons: {
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  statusBtnPrimary: {
    borderRadius: 16,
    overflow: "hidden",
  },
  statusGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  statusBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  statusBtnSecondary: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
  },
  statusBtnSecondaryText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  backBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#eba28a",
    borderRadius: 12,
  },
  backBtnText: {
    color: "white",
    fontWeight: "600",
  },
});
