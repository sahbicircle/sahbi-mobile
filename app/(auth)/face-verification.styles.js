import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    minHeight: 400,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    marginBottom: 20,
    fontSize: 16,
  },
  capture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureDisabled: {
    opacity: 0.6,
  },
  permissionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  permissionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  permissionSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  permissionButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#eba28a",
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
