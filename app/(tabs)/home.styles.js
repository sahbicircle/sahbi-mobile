import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faeeeb",
  },
  scrollContent: {
    gap: 16,
    flexGrow: 1,
    display: "grid",
    paddingTop: 60,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 40,
    backgroundColor: "#faeeeb",
  },
  bigTitle: {
    fontSize: 32,
    fontWeight: 700,
    fontFamily: "Jazmin",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "Poppins",
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 16,
    fontFamily: "Poppins",
  },
  smallTitle: {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "Poppins",
    marginBottom: 16,
  },
  card: {
    gap: 16,
    padding: 16,
    display: "grid",
    marginBottom: 12,
    borderRadius: 24,
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
    fontSize: 24,
    color: "white",
    fontWeight: 600,
    fontFamily: "Poppins",
    maxWidth: 300,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
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

  feedbackCard: {
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f5e9da",
    border: "1px solid gray",
    justifyContent: "space-between",
  },
  feedbackCardImage: {
    width: 140,
    height: 140,
  },
  feedbackCardText: {
    gap: 8,
    fontFamily: "Poppins",
    alignItems: "center",
  },
  feedbackBtn: {
    borderRadius: 999,
    paddingVertical: 6,
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
});
