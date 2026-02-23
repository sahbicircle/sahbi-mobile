import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4866e",
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    height: 400,
    width: "100%",
    marginBottom: 16,
    overflow: "hidden",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    top: 60,
    left: 16,
    zIndex: 10,
    borderRadius: 9999,
    paddingVertical: 6,
    position: "absolute",
    paddingHorizontal: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  imageTextContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },
  content: {
    gap: 16,
    marginTop: 16,
    display: "grid",
    paddingHorizontal: 16,
  },
  meta: {
    fontSize: 14,
    color: "white",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "white",
  },
  primaryBtn: {
    margin: 16,
    padding: 16,
    borderRadius: 9999,
    alignItems: "center",
  },
  primaryBtnText: {
    fontSize: 16,
    color: "white",
    fontWeight: 600,
  },
});
