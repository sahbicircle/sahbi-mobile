import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e85a4a",
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    height: 320,
    width: "100%",
    overflow: "hidden",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    left: 16,
    zIndex: 10,
    position: "absolute",
  },
  favoriteButton: {
    right: 16,
    zIndex: 10,
    position: "absolute",
  },
  iconButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  imageTextContainer: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 32,
    fontWeight: "700",
    color: "white",
  },
  tagline: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "rgba(255,255,255,0.95)",
    marginTop: 4,
    letterSpacing: 0,
  },
  scrollContent: {
    flex: 1,
  },
  detailsOverlay: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#e85a4a",
  },
  metaColsContainer: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metaCol: {
    flex: 1,
  },
  metaColSeparator: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  metaLabel: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  metaValue: {
    fontFamily: "Poppins",
    fontSize: 13,
    color: "white",
    fontWeight: "600",
  },
  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  aboutTitle: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 8,
  },
  description: {
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 22,
    color: "white",
    opacity: 0.95,
  },
  chatTicketBtn: {
    borderRadius: 9999,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  getTicketBtn: {
    borderRadius: 9999,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
    padding: 6,
  },
  getTicketInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 12,
  },
  getTicketPill: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtn: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "space-between",
  },
  primaryBtnText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  chevrons: {
    flexDirection: "row",
    gap: 2,
  },
});
