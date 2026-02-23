import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fafafa",
    height: "80%",
  },

  card: {
    gap: 16,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#fafafa",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f1f1f",
    textAlign: "center",
    fontFamily: "Poppins",
  },

  subtitle: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    fontFamily: "Poppins",
  },

  button: {
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
    // backgroundColor: "#eba28a",
    backgroundImage: "linear-gradient(-90deg, #2596be 0%, #eba28a 100%)",
  },

  buttonWhite: {
    borderWidth: 1,
    backgroundImage: "none",
    backgroundColor: "white",
    borderColor: "#eba28a",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "Poppins",
  },

  link: {
    fontSize: 12,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
