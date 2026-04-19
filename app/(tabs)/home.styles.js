import { StyleSheet } from "react-native";
import { SAHBI } from "../../constants/sahbiUi";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SAHBI.bgPeach,
  },
  scrollContent: {
    gap: 16,
    flexGrow: 1,
    paddingTop: 0,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 120,
    backgroundColor: SAHBI.bgPeach,
  },
  headlineSerif1: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "Jazmin",
    color: "#111",
    marginTop: 8,
  },
  headlineSerif2: {
    fontSize: 34,
    fontWeight: "700",
    fontFamily: "Jazmin",
    color: "#8A8A8A",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#111",
  },
  bellCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#C8C8C8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: SAHBI.salmonCard,
  },
  cardBlue: {
    gap: 16,
    padding: 16,
    marginBottom: 12,
    borderRadius: 24,
    backgroundColor: SAHBI.padelBlue,
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
    flex: 1,
    fontSize: 22,
    color: "white",
    fontWeight: "700",
    fontFamily: "Poppins",
    letterSpacing: 0.5,
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
    padding: 18,
    borderRadius: 28,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 140,
    width: 300,
  },
  feedbackCardImage: {
    width: 120,
    height: 120,
  },
  feedbackCardText: {
    gap: 8,
    fontFamily: "Poppins",
    alignItems: "flex-start",
    flex: 1,
    paddingRight: 8,
  },
  feedbackBtn: {
    borderRadius: 999,
    paddingVertical: 6,
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "white",
  },

  /** Horizontal “How was your group?” carousel row */
  section: {
    marginBottom: 8,
  },
});
