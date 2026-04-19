import { StyleSheet } from "react-native";
import { SAHBI } from "../../constants/sahbiUi";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: SAHBI.black,
  },
  imageDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  welcomeBlock: {
    position: "absolute",
    left: 24,
    right: 24,
  },
  welcomeLine1: {
    fontSize: 34,
    fontWeight: "700",
    color: SAHBI.white,
    fontFamily: "Poppins",
    letterSpacing: -0.5,
  },
  welcomeLine2: {
    fontSize: 34,
    fontWeight: "700",
    color: SAHBI.white,
    fontFamily: "Poppins",
    letterSpacing: -0.5,
  },
  sheet: {
    paddingTop: 36,
    paddingHorizontal: 28,
    paddingBottom: 32,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    gap: 14,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: SAHBI.black,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  sheetSubtitle: {
    fontSize: 14,
    color: SAHBI.textMuted,
    textAlign: "center",
    fontFamily: "Poppins",
    lineHeight: 22,
    marginBottom: 8,
  },
  primaryOuter: {
    marginTop: 8,
    borderRadius: 999,
    overflow: "hidden",
    width: "100%",
    alignSelf: "center",
  },
  primaryBtn: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: SAHBI.white,
    fontFamily: "Poppins",
  },
  secondaryBtn: {
    marginTop: 4,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    backgroundColor: SAHBI.white,
    borderWidth: 1,
    borderColor: SAHBI.borderHairline,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: SAHBI.black,
    fontFamily: "Poppins",
  },
  termsRow: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  termsBase: {
    fontSize: 11,
    color: SAHBI.textMuted,
    fontFamily: "Poppins",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 11,
    color: SAHBI.textMuted,
    fontFamily: "Poppins",
    textDecorationLine: "underline",
  },
});
