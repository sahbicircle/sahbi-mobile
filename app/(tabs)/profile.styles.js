import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    gap: 16,
    flexGrow: 1,
    paddingTop: 60,
    display: "flex",
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 60,
    flexDirection: "column",
    backgroundColor: "#efc9be",
    alignContent: "space-between",
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "600",
    fontFamily: "Poppins",
  },

  profileNameContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  profileName: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Poppins",
  },

  imageContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  profileImage: {
    position: "absolute",
  },

  percentage: {
    bottom: 0,
    borderRadius: 9999,
    paddingVertical: 4,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eba28a",
  },

  percentageText: {
    fontSize: 10,
    color: "white",
    fontWeight: 700,
    fontFamily: "Poppins",
  },

  completeProfileCard: {
    padding: 16,
    display: "flex",
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f5e9da",
    borderWidth: 2,
    borderColor: "#eba28a",
    justifyContent: "space-between",
  },
  completeProfileForm: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  verifyCard: {
    padding: 16,
    display: "flex",
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#8ac0e2",
    justifyContent: "space-between",
  },

  verifyCardInner: {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },

  verifyContainer: {
    display: "grid",
    borderRadius: 16,
  },

  verifyTitle: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  verifyDescription: {
    fontSize: 12,
    fontFamily: "Poppins",
  },

  section: {
    gap: 16,
    display: "grid",
  },

  subscribeCard: {
    padding: 16,
    display: "flex",
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eba28a",
    justifyContent: "space-between",
  },

  subscribeCardInner: {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },

  subscribeContainer: {
    display: "grid",
    borderRadius: 16,
  },

  subscribeTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  subscribeDescription: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins",
  },

  selectCard: {
    padding: 16,
    display: "flex",
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#cab9c1",
    justifyContent: "space-between",
  },

  selectCardInner: {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },

  selectContainer: {
    display: "grid",
    borderRadius: 16,
  },

  selectTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  selectDescription: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins",
  },

  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#f5e9da",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  meta: {
    fontSize: 14,
    color: "#666",
    marginTop: 6,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  editButton: {
    borderRadius: 9999,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    backgroundColor: "#eba28a",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#eba28a",
    borderRadius: 9999,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
