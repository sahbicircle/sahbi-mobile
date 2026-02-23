import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#f4f6fa",
  },

  inputText: {
    color: "#111",
    "font-size": "16px",
    "font-weight": 500,
    fontFamily: "Poppins",
  },

  placeholder: {
    color: "#999",
    "font-size": "16px",
    fontFamily: "Poppins",
  },

  pickerCard: {
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    "background-color": "rgba(0, 0, 0, 0.45)",
    "justify-content": "center",
    "align-items": "center",
  },

  cancelButton: {
    width: "100%",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    "margin-top": "14px",

    "align-self": "center",
  },

  cancelText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#555",
    fontFamily: "Poppins",
  },
});

export default styles;
