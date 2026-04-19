import { StyleSheet } from "react-native";
import { SAHBI } from "../../constants/sahbiUi";

export const styles = StyleSheet.create({
  onboardingRoot: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  backBtnOnboarding: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingRight: 12,
  },
  onboardingBody: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
  },
  onboardingHi: {
    fontSize: 20,
    fontWeight: "700",
    color: SAHBI.black,
    fontFamily: "Poppins",
    marginBottom: 20,
  },
  onboardingStat: {
    fontSize: 72,
    fontWeight: "800",
    color: SAHBI.black,
    fontFamily: "Poppins",
    lineHeight: 80,
  },
  onboardingSub: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    textAlign: "center",
    fontFamily: "Poppins",
    paddingHorizontal: 12,
    maxWidth: 340,
  },
  onboardingIllustration: {
    width: 280,
    height: 220,
    marginTop: 24,
  },
  onboardingFooter: {
    gap: 16,
    width: "100%",
  },
  skipTextDark: {
    color: "#8A6A62",
    fontSize: 15,
    fontFamily: "Poppins",
    textAlign: "center",
  },

  main: {
    flexGrow: 1,
    paddingTop: 56,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 48,
    backgroundColor: SAHBI.white,
  },

  screen: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: 480,
  },

  content: {
    gap: 14,
  },

  centerBlock: {
    alignItems: "center",
    gap: 24,
  },

  title: {
    fontSize: 26,
    lineHeight: 32,
    marginBottom: 8,
    fontWeight: "700",
    color: SAHBI.black,
    fontFamily: "Poppins",
  },

  registerDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  registerDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  registerDividerText: {
    color: "#999",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    fontFamily: "Poppins",
  },

  input: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 999,
    borderColor: "#ddd",
    fontFamily: "Poppins",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: SAHBI.accentPink,
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: "Poppins",
    color: SAHBI.black,
  },

  profileHint: {
    fontSize: 13,
    color: SAHBI.textMuted,
    fontFamily: "Poppins",
    marginTop: 8,
  },
  profileHintBold: {
    fontSize: 13,
    color: "#444",
    fontWeight: "600",
    fontFamily: "Poppins",
  },

  birthdayHint: {
    fontSize: 13,
    color: SAHBI.textMuted,
    fontFamily: "Poppins",
    marginTop: 12,
  },

  photoSubtitle: {
    fontSize: 14,
    color: SAHBI.textMuted,
    fontFamily: "Poppins",
    marginBottom: 8,
  },

  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  optionOutline: {
    backgroundColor: SAHBI.white,
    borderWidth: 1,
    borderColor: SAHBI.borderHairline,
  },

  optionSelectedFill: {
    borderWidth: 0,
  },

  optionText: {
    fontSize: 16,
    color: SAHBI.black,
    fontFamily: "Poppins",
  },

  optionTextOnFill: {
    color: SAHBI.black,
    fontWeight: "500",
  },

  topicsList: {
    gap: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    justifyContent: "center",
    maxWidth: 360,
    alignSelf: "center",
  },

  photoWrapper: {
    width: "33.3333%",
    padding: 6,
  },

  photoThumb: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 16,
  },

  plusBox: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: SAHBI.peachLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B8B8B8",
  },

  photoPicker: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },

  backBtn: {
    marginBottom: 12,
    alignSelf: "flex-start",
  },

  buttonBlock: {
    gap: 16,
  },

  stepActions: {
    gap: 12,
  },
  skipLink: {
    paddingVertical: 8,
    alignItems: "center",
  },
  skipText: {
    color: "#888",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  link: {
    color: "#555",
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Poppins",
  },

  primaryBtn: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },

  primaryBtnDisabled: {
    opacity: 0.6,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Poppins",
    fontSize: 16,
  },

  errorText: {
    color: "#c62828",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
