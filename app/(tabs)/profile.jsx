import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { CompleteProfileForm } from "../../components/CompleteProfileForm";
import { useAuth } from "../../hooks/useAuth";
import { useBookings } from "../../hooks/useBooking";
import { cancelBooking } from "../../services/booking.service";
import { updateProfile } from "../../services/profile.service";
import { clearAuth, getAuth, setAuth } from "../../store/auth.store";
import { styles } from "./profile.styles";

const STROKE_WIDTH = 4;
const PROFILE_IMAGE_SIZE = 120;
const RADIUS = (PROFILE_IMAGE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const LANGUAGES = [
  "Arabic",
  "English",
  "French",
  "German",
  "Chinese",
  "Japanese",
];
const INTERESTS = ["Sports", "Music", "Travel", "Food", "Movies"];

export default function Profile() {
  const router = useRouter();
  const { user, profileCompletion, refresh } = useAuth();
  const { bookings, refetch: refetchBookings } = useBookings();

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState(null);
  const [fullUser, setFullUser] = useState(null);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [savingPhotos, setSavingPhotos] = useState(false);

  const photoUrls = Array.isArray(fullUser?.photoUrl ?? user?.photoUrl)
    ? fullUser?.photoUrl ?? user?.photoUrl ?? []
    : fullUser?.photoUrl || user?.photoUrl
    ? [fullUser?.photoUrl || user?.photoUrl]
    : [];
  const primaryPhoto =
    photoUrls[0] ||
    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=400&auto=format&fit=crop";

  const handleSaveField = async () => {
    try {
      const payload =
        editingField === "interests"
          ? { interests: tempValue }
          : { [editingField]: tempValue };
      const updated = await updateProfile(payload);
      const auth = await getAuth();
      await setAuth(updated, auth.token);
      refresh();
    } catch (err) {
      console.error("Failed to save:", err);
    }
    setEditingField(null);
  };

  const handleLogout = async () => {
    await clearAuth();
    router.replace("/(auth)/login");
  };

  const handleCancelBooking = (booking) => {
    Alert.alert(
      "Cancel booking",
      `Cancel your booking for ${booking.event?.title || "this event"}?`,
      [
        { text: "Keep", style: "cancel" },
        {
          text: "Cancel booking",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelBooking(booking._id);
              refetchBookings();
            } catch (err) {
              Alert.alert(
                "Error",
                err?.response?.data?.message || "Failed to cancel"
              );
            }
          },
        },
      ]
    );
  };

  const toggleInterest = (interest) => {
    const current = user?.interests || [];
    const updated = current.includes(interest)
      ? current.filter((i) => i !== interest)
      : [...current, interest];
    setTempValue(updated);
  };

  const handleAddPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Allow access to your photos to add images."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
    });
    if (result.canceled || !result.assets?.[0]?.uri) return;
    try {
      setSavingPhotos(true);
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      });
      const mime = result.assets[0].mimeType || "image/jpeg";
      const dataUrl = `data:${mime};base64,${base64}`;
      const updated = await updateProfile({
        photoUrl: [...photoUrls, dataUrl],
      });
      const auth = await getAuth();
      await setAuth(updated, auth.token);
      setFullUser(updated);
      refresh();
    } catch (err) {
      console.error("Failed to add photo:", err);
      Alert.alert("Error", "Failed to add photo. Try a smaller image.");
    } finally {
      setSavingPhotos(false);
    }
  };

  const handleRemovePhoto = async (index) => {
    const next = photoUrls.filter((_, i) => i !== index);
    try {
      setSavingPhotos(true);
      const updated = await updateProfile({ photoUrl: next });
      const auth = await getAuth();
      await setAuth(updated, auth.token);
      setFullUser(updated);
      refresh();
    } catch (err) {
      console.error("Failed to remove photo:", err);
    } finally {
      setSavingPhotos(false);
    }
  };

  const handleSetPrimaryPhoto = async (index) => {
    if (index === 0) return;
    const reordered = [
      photoUrls[index],
      ...photoUrls.filter((_, i) => i !== index),
    ];
    try {
      setSavingPhotos(true);
      const updated = await updateProfile({ photoUrl: reordered });
      const auth = await getAuth();
      await setAuth(updated, auth.token);
      setFullUser(updated);
      refresh();
    } catch (err) {
      console.error("Failed to reorder:", err);
    } finally {
      setSavingPhotos(false);
    }
  };

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#eba28a" />
  //     </View>
  //   );
  // }

  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.imageContainer}>
        <View
          style={{
            width: PROFILE_IMAGE_SIZE,
            height: PROFILE_IMAGE_SIZE,
            position: "relative",
          }}
        >
          {(fullUser?.faceVerified || user?.faceVerified) && (
            <View
              style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                zIndex: 10,
                backgroundColor: "#2596be",
                borderRadius: 14,
                width: 28,
                height: 28,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="checkmark-circle" size={22} color="white" />
            </View>
          )}
          <Svg width={PROFILE_IMAGE_SIZE} height={PROFILE_IMAGE_SIZE}>
            <Circle
              stroke="#000"
              cx={PROFILE_IMAGE_SIZE / 2}
              cy={PROFILE_IMAGE_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
            />

            <Circle
              stroke="#eba28a"
              cx={PROFILE_IMAGE_SIZE / 2}
              cy={PROFILE_IMAGE_SIZE / 2}
              r={RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={
                CIRCUMFERENCE - (profileCompletion / 100) * CIRCUMFERENCE
              }
              strokeLinecap="round"
              transform={`rotate(-90, ${PROFILE_IMAGE_SIZE / 2}, ${
                PROFILE_IMAGE_SIZE / 2
              })`}
            />
          </Svg>

          <Image
            source={{ uri: primaryPhoto }}
            style={{
              ...styles.profileImage,
              width: PROFILE_IMAGE_SIZE - STROKE_WIDTH * 2,
              height: PROFILE_IMAGE_SIZE - STROKE_WIDTH * 2,
              borderRadius: (PROFILE_IMAGE_SIZE - STROKE_WIDTH * 2) / 2,
              top: STROKE_WIDTH,
              left: STROKE_WIDTH,
            }}
            resizeMode="cover"
          />

          <View style={{ ...styles.percentage, width: PROFILE_IMAGE_SIZE }}>
            <Text style={styles.percentageText}>
              {profileCompletion}% Completed
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.profileNameContainer}>
        <Text style={styles.profileName}>
          {user?.firstName || ""} {user?.lastName || ""}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => setShowPhotoEditor(!showPhotoEditor)}
      >
        <View style={styles.selectContainer}>
          <Text style={styles.selectTitle}>My Photos</Text>
          <Text style={styles.selectDescription}>
            {photoUrls.length} photo{photoUrls.length !== 1 ? "s" : ""}
          </Text>
        </View>
        <Ionicons
          size={24}
          color="white"
          name={showPhotoEditor ? "chevron-up" : "chevron-down"}
        />
      </TouchableOpacity>
      {showPhotoEditor && (
        <View style={styles.completeProfileForm}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {photoUrls.map((uri, index) => (
              <View key={index} style={{ position: "relative" }}>
                <Image
                  source={{ uri }}
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                  resizeMode="cover"
                />
                <View style={{ flexDirection: "row", marginTop: 4, gap: 4 }}>
                  {index > 0 && (
                    <TouchableOpacity
                      onPress={() => handleSetPrimaryPhoto(index)}
                      style={{
                        padding: 4,
                        backgroundColor: "#2596be",
                        borderRadius: 4,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 10 }}>Main</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => handleRemovePhoto(index)}
                    style={{
                      padding: 4,
                      backgroundColor: "#FF4C42",
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 10 }}>Remove</Text>
                  </TouchableOpacity>
                </View>
                {index === 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: 2,
                      left: 2,
                      backgroundColor: "#2596be",
                      paddingHorizontal: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 9 }}>Main</Text>
                  </View>
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={handleAddPhoto}
              disabled={savingPhotos}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: "#999",
              }}
            >
              <Ionicons name="add" size={32} color="#999" />
            </TouchableOpacity>
          </View>
          {savingPhotos && (
            <Text style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
              Saving...
            </Text>
          )}
        </View>
      )}

      {profileCompletion < 100 && (
        <TouchableOpacity
          style={styles.completeProfileCard}
          onPress={() => setShowCompleteProfile(!showCompleteProfile)}
        >
          <View style={styles.verifyCardInner}>
            <Ionicons size={24} name="person-add-outline" color="#eba28a" />
            <View style={styles.verifyContainer}>
              <Text style={styles.verifyTitle}>Complete your profile</Text>
              <Text style={styles.verifyDescription}>
                Add personality details for better matching
              </Text>
            </View>
          </View>
          <Ionicons
            size={24}
            name={showCompleteProfile ? "chevron-up" : "chevron-down"}
            color="#eba28a"
          />
        </TouchableOpacity>
      )}
      {showCompleteProfile && (
        <View style={styles.completeProfileForm}>
          <CompleteProfileForm
            user={fullUser || user}
            onSaved={() => {
              refresh();
              setShowCompleteProfile(false);
            }}
          />
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.verifyCard,
          (fullUser?.faceVerified || user?.faceVerified) && {
            backgroundColor: "#5cb85c",
            opacity: 0.9,
          },
        ]}
        onPress={() => {
          if (fullUser?.faceVerified || user?.faceVerified) return;
          router.push({
            pathname: "/(auth)/face-verification",
            params: { from: "profile" },
          });
        }}
        disabled={!!(fullUser?.faceVerified || user?.faceVerified)}
      >
        <View style={styles.verifyCardInner}>
          <Ionicons
            size={24}
            name={
              fullUser?.faceVerified || user?.faceVerified
                ? "shield-checkmark"
                : "shield-checkmark-outline"
            }
            color="white"
          />
          <View style={styles.verifyContainer}>
            <Text style={[styles.verifyTitle, { color: "white" }]}>
              {fullUser?.faceVerified || user?.faceVerified
                ? "Profile verified"
                : "Verify your profile"}
            </Text>
            <Text
              style={[
                styles.verifyDescription,
                { color: "rgba(255,255,255,0.9)" },
              ]}
            >
              {fullUser?.faceVerified || user?.faceVerified
                ? "Face verified"
                : "To get more fun"}
            </Text>
          </View>
        </View>
        {!(fullUser?.faceVerified || user?.faceVerified) && (
          <Ionicons size={24} color="white" name="arrow-forward-outline" />
        )}
      </TouchableOpacity>
      <View style={styles.subscribeCard}>
        <View style={styles.subscribeContainer}>
          <Text style={styles.subscribeTitle}>Subscribe</Text>
          <Text style={styles.subscribeDescription}>
            verified friends only! Custom Just for you
          </Text>
        </View>

        <Ionicons size={24} color="white" name="arrow-forward-outline" />
      </View>
      <Text style={styles.title}>Preferences</Text>
      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => {
          setEditingField("language");
          setTempValue(user?.language || LANGUAGES[0]);
        }}
      >
        <View style={styles.selectContainer}>
          <Text style={styles.selectTitle}>Language</Text>
          {user?.language ? (
            <Text style={styles.selectDescription}>{user?.language}</Text>
          ) : null}
        </View>

        <Ionicons size={24} color="white" name="arrow-forward-outline" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectCard}
        onPress={() => {
          setEditingField("interests");
          setTempValue(user?.interests || []);
        }}
      >
        <View style={styles.selectContainer}>
          <Text style={styles.selectTitle}>Interests</Text>
          {user?.interests?.length ? (
            <Text style={styles.selectDescription}>
              {user.interests.join(", ")}
            </Text>
          ) : null}
        </View>

        <Ionicons size={24} color="white" name="arrow-forward-outline" />
      </TouchableOpacity>

      <Text style={styles.title}>My Bookings</Text>
      {bookings?.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.section}
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.subscribeCard}>
              <View style={styles.subscribeContainer}>
                <Text style={styles.subscribeTitle}>{item.event?.title}</Text>
                <Text style={styles.subscribeDescription}>
                  {item.event?.location}
                </Text>
                <Text style={styles.subscribeDescription}>
                  {item.event?.date
                    ? new Date(item.event.date).toLocaleString()
                    : ""}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <TouchableOpacity
                  onPress={() => handleCancelBooking(item)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: "rgba(255,76,66,0.9)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                      fontFamily: "Poppins",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                {/* <Ionicons size={24} color="white" name="arrow-forward-outline" /> */}
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={{ color: "#555" }}>You have no bookings yet.</Text>
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF4C42" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Modal visible={!!editingField} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {editingField}</Text>

            {editingField === "language" ? (
              LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => setTempValue(lang)}
                  style={[
                    styles.pill,
                    {
                      backgroundColor: tempValue === lang ? "#eba28a" : "#eee",
                      marginVertical: 5,
                    },
                  ]}
                >
                  <Text style={{ color: tempValue === lang ? "#fff" : "#333" }}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))
            ) : editingField === "interests" ? (
              <FlatList
                data={INTERESTS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => toggleInterest(item)}
                    style={[
                      styles.pill,
                      {
                        backgroundColor: tempValue.includes(item)
                          ? "#eba28a"
                          : "#eee",
                        marginVertical: 5,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: tempValue.includes(item) ? "#fff" : "#333",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <TextInput
                multiline
                value={tempValue}
                onChangeText={setTempValue}
                style={styles.textArea}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={() => setEditingField(null)}>
                <Text style={{ color: "#555" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveField}>
                <Text style={{ color: "#eba28a", fontWeight: "bold" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
