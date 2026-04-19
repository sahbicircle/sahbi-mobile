import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },

  screen: {
    flex: 1,
    justifyContent: "space-between",
  },

  content: {
    gap: 16,
  },

  title: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 600,
    marginBottom: 16,
    fontFamily: "Poppins",
  },

  card: {
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#f5e9da",
  },

  icon: {
    width: 36,
    height: 36,
    display: "flex",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  plan: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  description: {
    fontSize: 12,
    fontFamily: "Poppins",
  },

  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  feature: {
    width: "fit-content",
    borderRadius: 999,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 10,
    color: "white",
    fontFamily: "Poppins",
  },

  price: {
    fontSize: 16,
    fontFamily: "Poppins",
  },

  trial: {
    marginTop: 16,
    color: "#555",
    textAlign: "center",
    fontFamily: "Poppins",
  },

  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  loaderText: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Poppins",
  },
});
