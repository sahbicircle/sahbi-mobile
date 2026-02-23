import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
    flexGrow: 1,
    paddingTop: 60,
    display: "flex",
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 60,
    flexDirection: "column",
    backgroundColor: "#faeeeb",
    alignContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#f5e9da",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    // React Native shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3, // for Android
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#faeeeb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  preview: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});
