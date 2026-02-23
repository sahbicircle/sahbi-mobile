import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
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
  backBtn: {
    position: "absolute",
    top: 48,
    left: 24,
    zIndex: 10,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  loading: {
    marginTop: 24,
    textAlign: "center",
  },
  empty: {
    marginTop: 24,
    textAlign: "center",
    color: "#888",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  cardImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#ddd",
  },
  cardContent: {
    padding: 10,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  passBtn: {
    backgroundColor: "#edc0b1",
  },
  likeBtn: {
    backgroundColor: "#eba28a",
  },
  likedBtn: {
    backgroundColor: "#4ade80",
  },
  card: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f5e9da",
    marginBottom: 16,
  },
  cradHeader: {
    gap: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    gap: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Poppins",
    color: "white",
  },
  cardMetaContainer: {
    gap: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  cardMeta: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins",
  },
  bookersContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  booker: {
    width: 24,
    height: 24,
    marginRight: -12,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecc4ba",

    // ✅ Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  passed: {
    marginTop: 8,
    borderRadius: 9999,
    paddingVertical: 4,
    width: "fit-content",
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    backgroundColor: "#FF4C42",
  },

  passedText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
});
