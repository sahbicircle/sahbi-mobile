import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    padding: 12,
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },

  screenContainer: {
    flex: 1,
    padding: 24,
    borderRadius: 24,
    justifyContent: "center",
  },

  screen: {
    gap: 48,
    flex: 1,
    justifyContent: "center",
  },

  content: { gap: 16 },

  centerBlock: { alignItems: "center", gap: 24 },

  title: {
    fontSize: 28,
    color: "white",
    lineHeight: 34,
    marginBottom: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
  },

  description: {
    fontSize: 14,
    color: "white",
    marginBottom: 16,
    fontFamily: "Poppins",
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
    backgroundColor: "#f7dccf",
  },

  primaryBtn: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#f7dccf",
  },

  primaryBtnDisabled: {
    opacity: 0.6,
  },

  primaryBtnText: { fontWeight: 600, fontFamily: "Poppins" },

  link: {
    color: "white",
    fontWeight: 500,
    textAlign: "center",
    fontFamily: "Poppins",
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dividerText: {
    color: "white",
    fontSize: 14,
  },
  errorText: {
    borderRadius: 999,
    color: "#ea616a",
    textAlign: "center",
    paddingVertical: 14,
    fontFamily: "Poppins",
    paddingHorizontal: 18,
    backgroundColor: "#fdeeea",
  },
});
