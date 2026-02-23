import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    paddingTop: 60,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 60,
    backgroundColor: "#fafafa",
  },

  screen: {
    flex: 1,
    justifyContent: "space-between",
  },

  content: {
    gap: 16,
  },

  centerBlock: {
    alignItems: "center",
    gap: 24,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 16,
    fontWeight: "600",
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

  option: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 999,
    borderColor: "#ddd",
    alignItems: "center",
  },

  optionSelected: {
    backgroundColor: "#eba28a",
    borderColor: "#eba28a",
  },

  optionText: {
    fontSize: 16,
    color: "#111",
    fontFamily: "Poppins",
  },

  optionTextSelected: {
    color: "#fff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },

  photoWrapper: {
    width: "33.3333%",
    padding: 6,
  },

  photoThumb: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
  },

  plusBox: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  photoPicker: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },

  backBtn: {
    marginBottom: 12,
  },

  buttonBlock: {
    gap: 16,
    display: "grid",
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
    fontWeight: 500,
    textAlign: "center",
    fontFamily: "Poppins",
  },

  primaryBtn: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },

  primaryBtnDisabled: {
    opacity: 0.6,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Poppins",
  },

  errorText: {
    color: "#c62828",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
