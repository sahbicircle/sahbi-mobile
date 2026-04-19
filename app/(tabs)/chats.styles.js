import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#faeeeb",
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(235, 162, 138, 0.25)",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    overflow: "hidden",
    marginRight: 14,
  },
  avatarGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(235, 162, 138, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#c45c4a",
  },
  preview: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
  chevron: {
    marginLeft: 8,
    opacity: 0.35,
  },
  emptyWrap: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444",
    textAlign: "center",
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
});
