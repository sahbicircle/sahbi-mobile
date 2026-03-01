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
    gap: 16,
    flex: 1,
    display: "grid",
    // justifyContent: "space-between",
  },

  title: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 600,
    marginBottom: 16,
    fontFamily: "Poppins",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  options: {
    gap: 12,
    flexWrap: "wrap",
    flexDirection: "row",
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

  tabsContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#f4f4f4",
    borderRadius: 9999,
    padding: 8,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9999,
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#eba28a",
  },

  tabText: {
    color: "#555",
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  tabTextActive: {
    color: "#fff",
  },

  tabContent: {
    marginTop: 20,
  },

  tabDescription: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins",
    lineHeight: 22,
  },

  backBtn: {
    marginBottom: 12,
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
    color: "#ea616a",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
});
