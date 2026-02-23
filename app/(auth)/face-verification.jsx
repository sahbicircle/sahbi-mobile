import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { verifyFace } from "../../services/face.service";
import { getProfile } from "../../services/profile.service";
import { getAuth, setAuth } from "../../store/auth.store";
import { styles } from "./face-verification.styles";

export default function FaceVerification() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const { user, from } = useLocalSearchParams();
  const parsedUser = user ? JSON.parse(user) : null;
  const isFromProfile = from === "profile";

  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No camera access</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const capture = async () => {
    if (!cameraRef.current || loading) return;
    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.6 });
      const verificationResult = await verifyFace(photo.uri);

      if (isFromProfile) {
        const updatedUser = await getProfile();
        const auth = await getAuth();
        await setAuth(updatedUser, auth?.token);
        router.back();
      } else {
        const updatedUser = {
          ...parsedUser,
          facialDataId: verificationResult?.facialDataId || true,
          faceVerified: true,
        };
        router.replace({
          pathname: "/(auth)/subscription",
          params: { user: JSON.stringify(updatedUser) },
        });
      }
    } catch (err) {
      console.error("Face verification failed:", err);
      alert("Face verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isFromProfile && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 50,
            left: 16,
            zIndex: 10,
            padding: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 24,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}
      <CameraView ref={cameraRef} style={styles.camera} facing="front" />
      <View style={styles.overlay}>
        <Text style={styles.text}>Align your face inside the frame</Text>

        <TouchableOpacity
          style={[styles.capture, loading && styles.captureDisabled]}
          onPress={capture}
          disabled={loading}
        >
          {loading && <ActivityIndicator color="white" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
