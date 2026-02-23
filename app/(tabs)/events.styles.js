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
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  card: {
    gap: 16,
    padding: 16,
    display: "grid",
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#e4a494",
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
