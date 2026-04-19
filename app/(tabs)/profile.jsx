import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

let didNavigateToVerification = false;

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, profileCompletion, refresh } = useAuth();
  const { bookings, refetch: refetchBookings } = useBookings();

  const [tempValue, setTempValue] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (didNavigateToVerification) {
        setIsVerifying(true);
        refresh().finally(() => {
          setIsVerifying(false);
          didNavigateToVerification = false;
        });
      }
    }, [refresh])
  );
  const [fullUser, setFullUser] = useState(null);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const [showPhotoEditor, setShowPhotoEditor] = useState(false);
  const [savingPhotos, setSavingPhotos] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [cityDraft, setCityDraft] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [settingsSheetVisible, setSettingsSheetVisible] = useState(false);
  const [bookingsSheetVisible, setBookingsSheetVisible] = useState(false);
  const carouselRef = useRef(null);
  const screenW = Dimensions.get("window").width;

  const scrollCarouselTo = (index) => {
    carouselRef.current?.scrollTo({
      x: index * screenW,
      animated: true,
    });
    setCarouselIndex(index);
  };

  const photoUrls = Array.isArray(fullUser?.photoUrl ?? user?.photoUrl)
    ? fullUser?.photoUrl ?? user?.photoUrl ?? []
    : fullUser?.photoUrl || user?.photoUrl
    ? [fullUser?.photoUrl || user?.photoUrl]
    : [];
  const primaryPhoto =
    photoUrls[0] ||
    "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=400&auto=format&fit=crop";

  const handleLogout = async () => {
    await clearAuth();
    router.replace("/(auth)/login");
  };

  const canCancelBooking = (booking) => {
    const eventDate = booking.event?.date ? new Date(booking.event.date) : null;
    if (!eventDate) return true;
    const hoursUntilEvent = (eventDate - new Date()) / (1000 * 60 * 60);
    return hoursUntilEvent > 24;
  };

  const handleCancelBooking = (booking) => {
    if (!canCancelBooking(booking)) {
      Alert.alert(
        "Cannot cancel",
        "You cannot cancel a booking within 24 hours of the event."
      );
      return;
    }
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
    const current = Array.isArray(tempValue)
      ? tempValue
      : user?.interests || [];
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

  const eventsCount = bookings?.length ?? 0;
  const peopleMetEstimate = Math.min(99, eventsCount * 5);

  const openAccountSecurity = () => {
    Alert.alert("Login & security", undefined, [
      {
        text: "Change password",
        onPress: () => router.push("/(auth)/forgot-password"),
      },
      {
        text: "Face verification",
        onPress: () =>
          router.push({
            pathname: "/(auth)/face-verification",
            params: { from: "profile" },
          }),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const openSettingsSheet = () => setSettingsSheetVisible(true);

  const openCityEditor = () => {
    setCityDraft(user?.city || "");
    setShowCityModal(true);
  };

  const saveCity = async () => {
    try {
      const updated = await updateProfile({ city: cityDraft.trim() });
      const auth = await getAuth();
      await setAuth(updated, auth.token);
      setFullUser(updated);
      refresh();
      setShowCityModal(false);
    } catch {
      Alert.alert("Error", "Could not save city.");
    }
  };

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#eba28a" />
  //     </View>
  //   );
  // }

  const showVerifyingLoader = isVerifying;

  return (
    <>
      {showVerifyingLoader && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.9)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <ActivityIndicator size="large" color="#eba28a" />
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "#333",
              fontFamily: "Poppins",
            }}
          >
            Verifying your profile...
          </Text>
        </View>
      )}
      <LinearGradient
        colors={["#FAD6C8", "#F8E4DC", "#FFF2ED", "#FFF5F0"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.screenGradient}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <LinearGradient
            colors={["#FAD6C8", "#F4B8A8", "#F0C4B0"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.headerGradient, { paddingTop: insets.top + 10 }]}
          >
            <View style={styles.topRow}>
              <TouchableOpacity
                style={styles.backHit}
                onPress={() =>
                  router.canGoBack()
                    ? router.back()
                    : router.replace("/(tabs)/home")
                }
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(tabs)/chats")}>
                <Text style={styles.topLink}>Connect</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.headerSecondRow}>
              <TouchableOpacity
                style={styles.sideIconBtn}
                onPress={openSettingsSheet}
                accessibilityLabel="Settings"
              >
                <Ionicons name="settings-outline" size={22} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sideIconBtn}
                onPress={() => setShowCompleteProfile((s) => !s)}
                accessibilityLabel="Edit profile"
              >
                <Ionicons name="create-outline" size={22} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.avatarCenter}>
              <View style={styles.imageWrap}>
                {(fullUser?.faceVerified || user?.faceVerified) && (
                  <View
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      zIndex: 10,
                      backgroundColor: "#2596be",
                      borderRadius: 14,
                      width: 26,
                      height: 26,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="white" />
                  </View>
                )}
                <Svg width={PROFILE_IMAGE_SIZE} height={PROFILE_IMAGE_SIZE}>
                  <Circle
                    stroke="rgba(255,255,255,0.95)"
                    cx={PROFILE_IMAGE_SIZE / 2}
                    cy={PROFILE_IMAGE_SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE_WIDTH}
                  />
                  <Circle
                    stroke="#E9866E"
                    cx={PROFILE_IMAGE_SIZE / 2}
                    cy={PROFILE_IMAGE_SIZE / 2}
                    r={RADIUS}
                    strokeWidth={STROKE_WIDTH}
                    strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                    strokeDashoffset={
                      CIRCUMFERENCE -
                      (Math.min(100, profileCompletion || 0) / 100) *
                        CIRCUMFERENCE
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
                <View style={styles.percentage}>
                  <Text style={styles.percentageText}>
                    {Math.round(profileCompletion || 0)}% complete
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.profileName}>
              {[user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
                "Sahbi"}
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statNumber}>{eventsCount}</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statNumber}>{peopleMetEstimate}</Text>
                <Text style={styles.statLabel}>People met</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{ width: screenW, paddingHorizontal: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (fullUser?.faceVerified || user?.faceVerified) return;
                didNavigateToVerification = true;
                router.push({
                  pathname: "/(auth)/face-verification",
                  params: { from: "profile" },
                });
              }}
              disabled={!!(fullUser?.faceVerified || user?.faceVerified)}
              activeOpacity={0.92}
            >
              {fullUser?.faceVerified || user?.faceVerified ? (
                <View style={[styles.verifyCard, styles.verifyCardVerified]}>
                  <View style={styles.verifyCardInner}>
                    <View style={styles.shieldWrap}>
                      <Ionicons
                        name="shield-checkmark"
                        size={22}
                        color="#FFFFFF"
                      />
                    </View>
                    <View style={styles.verifyContainer}>
                      <Text style={[styles.verifyTitle, { color: "#fff" }]}>
                        Profile verified
                      </Text>
                      <Text
                        style={[
                          styles.verifySubtitle,
                          styles.verifySubtitleMuted,
                        ]}
                      >
                        Face verified
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={22} color="#fff" />
                </View>
              ) : (
                <LinearGradient
                  colors={["#D8EBFA", "#B9D8F0", "#A8CEEC"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.verifyCard}
                >
                  <View style={styles.verifyCardInner}>
                    <View style={styles.shieldWrap}>
                      <Ionicons
                        name="shield-checkmark"
                        size={22}
                        color="#FFFFFF"
                      />
                    </View>
                    <View style={styles.verifyContainer}>
                      <Text style={styles.verifyTitle}>
                        Verify your profile
                      </Text>
                      <Text style={styles.verifySubtitle}>to get for fun</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={22} color="#333" />
                </LinearGradient>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ width: screenW, paddingHorizontal: 20 }}>
            <View style={styles.subscribeWrap}>
              <LinearGradient
                colors={["#F8D4C8", "#F0A090", "#E9866E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.subscribeGradient}
              >
                <View style={styles.subscribeBadgeRow}>
                  <LinearGradient
                    colors={["#6E7FB8", "#E8B4A8", "#F6C7B9"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.basicBadge}
                  >
                    <Text style={styles.basicBadgeText}>Basic</Text>
                  </LinearGradient>
                  <Text style={styles.subscribeHead}>Subscribe</Text>
                </View>
                <Text style={styles.subscribeDesc}>
                  verified friends only! Custom Just for you
                </Text>
                <TouchableOpacity
                  style={styles.saveCtaOuter}
                  activeOpacity={0.9}
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/subscription",
                      params: { fromTicket: "true" },
                    })
                  }
                >
                  <LinearGradient
                    colors={["#ED967F", "#7A6BA8", "#6E7FB8"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.saveCtaGradient}
                  >
                    <Text style={styles.saveCtaText}>Save Up to 60%</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.sectionLabel}>Account</Text>
            <TouchableOpacity
              style={styles.listRow}
              onPress={openAccountSecurity}
              activeOpacity={0.85}
            >
              <Text style={styles.listRowTitle}>Login and security</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>Preferences</Text>
            <TouchableOpacity
              style={styles.listRow}
              onPress={openCityEditor}
              activeOpacity={0.85}
            >
              <Text style={styles.listRowTitle}>City</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
          {showCompleteProfile && (
            <View
              style={[styles.completeProfileForm, { marginHorizontal: 20 }]}
            >
              <CompleteProfileForm
                user={fullUser || user}
                onSaved={() => {
                  refresh();
                  setShowCompleteProfile(false);
                }}
              />
            </View>
          )}

          {showPhotoEditor && (
            <View
              style={[
                styles.completeProfileForm,
                { marginHorizontal: 20, marginTop: 8 },
              ]}
            >
              <Text style={[styles.sectionLabel, { marginTop: 0 }]}>
                My photos
              </Text>
              <Text style={[styles.verifyDescription, { marginBottom: 12 }]}>
                {photoUrls.length} photo{photoUrls.length !== 1 ? "s" : ""}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
                {photoUrls.map((uri, index) => (
                  <View key={index} style={{ position: "relative" }}>
                    <Image
                      source={{ uri }}
                      style={{ width: 80, height: 80, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                    <View
                      style={{ flexDirection: "row", marginTop: 4, gap: 4 }}
                    >
                      {index > 0 && (
                        <TouchableOpacity
                          onPress={() => handleSetPrimaryPhoto(index)}
                          style={{
                            padding: 4,
                            backgroundColor: "#2596be",
                            borderRadius: 4,
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 10 }}>
                            Main
                          </Text>
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
                        <Text style={{ color: "white", fontSize: 10 }}>
                          Remove
                        </Text>
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
                        <Text style={{ color: "white", fontSize: 9 }}>
                          Main
                        </Text>
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
          {showLanguage && (
            <View style={{ marginHorizontal: 20, marginTop: 12 }}>
              <Text style={styles.sectionLabel}>Language</Text>
              <View style={styles.completeProfileForm}>
                {LANGUAGES.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    onPress={() => setTempValue(lang)}
                    style={[
                      styles.pill,
                      {
                        backgroundColor:
                          tempValue === lang ? "#eba28a" : "#eee",
                        marginVertical: 5,
                      },
                    ]}
                  >
                    <Text
                      style={{ color: tempValue === lang ? "#fff" : "#333" }}
                    >
                      {lang}
                    </Text>
                  </TouchableOpacity>
                ))}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 12,
                    gap: 12,
                  }}
                >
                  <TouchableOpacity onPress={() => setShowLanguage(false)}>
                    <Text style={{ color: "#555" }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const updated = await updateProfile({
                          language: tempValue,
                        });
                        const auth = await getAuth();
                        await setAuth(updated, auth.token);
                        refresh();
                        setShowLanguage(false);
                      } catch (err) {
                        console.error("Failed to save:", err);
                      }
                    }}
                  >
                    <Text style={{ color: "#eba28a", fontWeight: "bold" }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {showInterests && (
            <View style={{ marginHorizontal: 20, marginTop: 12 }}>
              <Text style={styles.sectionLabel}>Interests</Text>
              <View style={styles.completeProfileForm}>
                {INTERESTS.map((item) => (
                  <TouchableOpacity
                    key={item}
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
                ))}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 12,
                    gap: 12,
                  }}
                >
                  <TouchableOpacity onPress={() => setShowInterests(false)}>
                    <Text style={{ color: "#555" }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        const updated = await updateProfile({
                          interests: tempValue,
                        });
                        const auth = await getAuth();
                        await setAuth(updated, auth.token);
                        refresh();
                        setShowInterests(false);
                      } catch (err) {
                        console.error("Failed to save:", err);
                      }
                    }}
                  >
                    <Text style={{ color: "#eba28a", fontWeight: "bold" }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        visible={settingsSheetVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSettingsSheetVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(0,0,0,0.35)" },
            ]}
            activeOpacity={1}
            onPress={() => setSettingsSheetVisible(false)}
          />
          <View
            style={[
              styles.settingsSheet,
              { paddingBottom: Math.max(insets.bottom, 14) + 8 },
            ]}
          >
            <Text style={styles.settingsSheetTitle}>Settings</Text>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                router.push("/(tabs)/notifications");
              }}
            >
              <Text style={styles.settingsRowLabel}>Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color="#BBB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                setShowCompleteProfile(true);
              }}
            >
              <Text style={styles.settingsRowLabel}>
                {profileCompletion < 100
                  ? "Complete your profile"
                  : "Edit profile"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#BBB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                setShowPhotoEditor(true);
              }}
            >
              <Text style={styles.settingsRowLabel}>My photos</Text>
              <Ionicons name="chevron-forward" size={18} color="#BBB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                setTempValue(user?.language || LANGUAGES[0]);
                setShowInterests(false);
                setShowLanguage(true);
              }}
            >
              <Text style={styles.settingsRowLabel}>Language</Text>
              <Ionicons name="chevron-forward" size={18} color="#BBB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                setTempValue(user?.interests || []);
                setShowLanguage(false);
                setShowInterests(true);
              }}
            >
              <Text style={styles.settingsRowLabel}>Interests</Text>
              <Ionicons name="chevron-forward" size={18} color="#BBB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                setBookingsSheetVisible(true);
              }}
            >
              <Text style={styles.settingsRowLabel}>My bookings</Text>
              <Ionicons name="chevron-forward" size={18} color="#BBB" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsRow}
              onPress={() => {
                setSettingsSheetVisible(false);
                handleLogout();
              }}
            >
              <Text style={[styles.settingsRowLabel, styles.settingsRowDanger]}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={bookingsSheetVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBookingsSheetVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 24,
              padding: 18,
              maxHeight: "78%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 12,
                fontFamily: "Poppins",
                color: "#111",
              }}
            >
              My bookings
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {bookings?.length > 0 ? (
                bookings.map((item) => (
                  <View
                    key={item._id}
                    style={[
                      styles.subscribeCard,
                      { marginBottom: 10, backgroundColor: "#F5E9DA" },
                    ]}
                  >
                    <View style={styles.subscribeContainer}>
                      <Text style={[styles.subscribeTitle, { color: "#333" }]}>
                        {item.event?.title}
                      </Text>
                      <Text
                        style={[styles.subscribeDescription, { color: "#555" }]}
                      >
                        {item.event?.location}
                      </Text>
                      <Text
                        style={[styles.subscribeDescription, { color: "#555" }]}
                      >
                        {item.event?.date
                          ? new Date(item.event.date).toLocaleString()
                          : ""}
                      </Text>
                    </View>
                    {canCancelBooking(item) ? (
                      <TouchableOpacity
                        onPress={() => {
                          setBookingsSheetVisible(false);
                          handleCancelBooking(item);
                        }}
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
                    ) : null}
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    color: "#666",
                    fontFamily: "Poppins",
                    marginBottom: 16,
                  }}
                >
                  You have no bookings yet.
                </Text>
              )}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setBookingsSheetVisible(false)}
              style={{ alignItems: "center", paddingVertical: 12 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#E9866E",
                  fontFamily: "Poppins",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCityModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCityModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 12,
                fontFamily: "Poppins",
              }}
            >
              City
            </Text>
            <TextInput
              value={cityDraft}
              onChangeText={setCityDraft}
              placeholder="Your city"
              placeholderTextColor="#999"
              style={{
                borderWidth: 1,
                borderColor: "#E5E5E5",
                borderRadius: 14,
                padding: 14,
                fontSize: 16,
                fontFamily: "Poppins",
                marginBottom: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 20,
              }}
            >
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <Text
                  style={{ fontSize: 16, color: "#666", fontFamily: "Poppins" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveCity}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#E9866E",
                    fontFamily: "Poppins",
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
