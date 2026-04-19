import { StyleSheet } from "react-native";
import { SAHBI } from "../../constants/sahbiUi";

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },

  screenGradient: {
    flex: 1,
  },

  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerSecondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingHorizontal: 4,
  },
  avatarCenter: {
    alignItems: "center",
    marginBottom: 14,
  },
  topLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    fontFamily: "Poppins",
  },
  backHit: {
    paddingVertical: 8,
    paddingRight: 12,
  },

  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 12,
  },
  sideIconBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    fontFamily: "Poppins",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 8,
  },
  statBlock: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    fontFamily: "Poppins",
  },
  statLabel: {
    fontSize: 13,
    color: "#D9A08F",
    fontFamily: "Poppins",
    fontWeight: "500",
    marginTop: 2,
  },

  body: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 12,
  },

  carouselPager: {
    marginTop: 4,
  },
  carouselPage: {
    paddingHorizontal: 20,
    paddingBottom: 4,
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    fontFamily: "Poppins",
    marginTop: 6,
    marginBottom: 4,
  },

  verifyCard: {
    padding: 18,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: "#C5DFF5",
  },
  verifyCardVerified: {
    backgroundColor: "#7BC48F",
  },
  verifyCardInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  shieldWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2B7BC8",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    fontFamily: "Poppins",
  },
  verifySubtitle: {
    fontSize: 13,
    color: "#2563B8",
    fontFamily: "Poppins",
    marginTop: 2,
  },
  verifySubtitleMuted: {
    color: "rgba(255,255,255,0.95)",
  },
  verifyDescription: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#666",
  },

  subscribeWrap: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
  },
  subscribeGradient: {
    padding: 18,
  },
  subscribeBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  basicBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  basicBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111",
    fontFamily: "Poppins",
  },
  subscribeHead: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
    fontFamily: "Poppins",
  },
  subscribeDesc: {
    fontSize: 12,
    color: "#555",
    fontFamily: "Poppins",
    lineHeight: 18,
    marginBottom: 14,
  },
  saveCtaOuter: {
    borderRadius: 999,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  saveCtaGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  saveCtaText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Poppins",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#111",
  },

  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: "#ECECEC",
    borderWidth: 0,
  },
  listRowTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    fontFamily: "Poppins",
  },

  moreLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    fontFamily: "Poppins",
    marginTop: 12,
    marginBottom: 4,
  },

  completeProfileCard: {
    padding: 16,
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
  selectCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#cab9c1",
    justifyContent: "space-between",
  },
  selectContainer: {
    flex: 1,
  },
  selectTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  selectDescription: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins",
  },
  subscribeCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eba28a",
    justifyContent: "space-between",
  },
  subscribeContainer: {
    flex: 1,
  },
  subscribeTitle: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  subscribeDescription: {
    fontSize: 12,
    color: "white",
    fontFamily: "Poppins",
  },
  verifyContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#222",
  },
  section: {
    gap: 12,
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
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#f5e9da",
  },

  profileImage: {
    position: "absolute",
  },
  imageWrap: {
    width: 120,
    height: 120,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    position: "absolute",
    bottom: -6,
    alignSelf: "center",
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
    backgroundColor: "#E9866E",
  },
  percentageText: {
    fontSize: 10,
    color: "white",
    fontWeight: "700",
    fontFamily: "Poppins",
  },

  settingsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  settingsSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  settingsSheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#111",
    textAlign: "center",
    marginBottom: 12,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  settingsRowLabel: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#222",
  },
  settingsRowDanger: {
    color: "#C62828",
    fontWeight: "600",
  },
});
