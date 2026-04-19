import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: "#f8f6f8",
  },

  scrollWrap: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 24,
  },
  screen: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 600,
    fontFamily: "Poppins",
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginTop: 20,
    marginBottom: 10,
  },

  dropdown: {
    borderRadius: 16,
    overflow: "hidden",
  },

  dropdownGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },

  dropdownText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins",
  },

  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
  },
  radioSelected: {
    backgroundColor: "#fff5f2",
    borderColor: "#eba28a",
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioCircleFilled: {
    borderColor: "#eba28a",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#eba28a",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins",
  },
  checkboxGroup: {
    gap: 12,
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
  },
  checkboxSelected: {
    backgroundColor: "#fff5f2",
    borderColor: "#eba28a",
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Poppins",
  },
  reviewBg: {
    flex: 1,
    padding: 20,
    minHeight: 300,
    borderRadius: 16,
    overflow: "hidden",
  },
  reviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  reviewCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reviewLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins",
  },

  reviewValue: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#333",
  },

  editPrefsBtn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
    alignSelf: "flex-start",
    marginTop: 16,
  },

  editPrefsText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins",
    fontWeight: "500",
  },

  planSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 20,
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderRadius: 9999,
    padding: 6,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 9999,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: "#eba28a",
  },
  tabText: {
    color: "#555",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  planCards: {
    gap: 16,
  },
  planCard: {
    padding: 24,
    minHeight: 200,
    borderRadius: 16,
    position: "relative",
    border: "1px solid #f1d2ca",
  },
  planCardPremium: {},
  ticketPlanTouchable: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
  },
  ticketPlanSelected: {
    borderColor: "#e85a4a",
  },
  ticketPlanCardPremium: {
    minHeight: 200,
  },
  includedCard: {
    backgroundColor: "#f0fdf4",
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#86efac",
  },
  includedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#166534",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  includedDesc: {
    fontSize: 15,
    color: "#15803d",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "Poppins",
  },
  planCrown: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 6,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  planBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  planBadgeText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  planName: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  planSubname: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  planDesc: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
    fontFamily: "Poppins",
  },
  planSubtext: {
    fontSize: 13,
    color: "#555",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  planFeature: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
    fontFamily: "Poppins",
  },
  planPriceBox: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
  },
  planPrice: {
    color: "#333",
    fontFamily: "Poppins",
  },
  ticketContent: {
    marginTop: 16,
  },
  tabDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e0e0e0",
  },
  stepDotActive: {
    backgroundColor: "#eba28a",
  },
  stepDotCurrent: {
    width: 24,
    backgroundColor: "#e85a4a",
  },
  headerSpacer: {
    width: 32,
  },
  primaryBtn: {
    width: "100%",
    borderRadius: 9999,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#e85a4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  errorText: {
    color: "#ea616a",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 8,
    maxHeight: 400,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  modalOption: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
  },

  paymentModeSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  paymentModeOption: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    marginBottom: 10,
  },
  paymentModeOptionActive: {
    borderColor: "#eba28a",
    backgroundColor: "#fff5f2",
  },
  paymentModeRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  paymentModeRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#eba28a",
  },
  paymentModeTexts: {
    flex: 1,
  },
  paymentModeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Poppins",
  },
  paymentModeDesc: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    lineHeight: 18,
    fontFamily: "Poppins",
  },
});
