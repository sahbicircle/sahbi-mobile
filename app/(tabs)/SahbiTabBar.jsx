import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNotifications } from "../../hooks/useNotifications";

const ROUTES = [
  {
    name: "home",
    focusedIcon: "home",
    outlineIcon: "home-outline",
    label: "Home",
  },
  {
    name: "events",
    focusedIcon: "calendar",
    outlineIcon: "calendar-outline",
    label: "",
  },
  {
    name: "chats",
    focusedIcon: "chatbubble-ellipses",
    outlineIcon: "chatbubble-ellipses-outline",
    label: "",
  },
  {
    name: "notifications",
    focusedIcon: "ticket",
    outlineIcon: "ticket-outline",
    label: "",
    badgeFromUnread: true,
  },
  {
    name: "profile",
    focusedIcon: "person",
    outlineIcon: "person-outline",
    label: "profile",
  },
];

export default function SahbiTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { unreadCount } = useNotifications();

  return (
    <View
      style={[
        styles.outer,
        { paddingBottom: Math.max(insets.bottom, 10) + 6 },
      ]}
    >
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const meta = ROUTES.find((r) => r.name === route.name);
          if (!meta) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const showBadge =
            meta.badgeFromUnread && unreadCount > 0;

          if (meta.name === "home" && isFocused) {
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={descriptors[route.key].options.title ?? meta.label}
                onPress={onPress}
                style={styles.homePill}
                activeOpacity={0.9}
              >
                <Ionicons name="home" size={22} color="#FFFFFF" />
                <Text style={styles.homePillLabel}>{meta.label}</Text>
              </TouchableOpacity>
            );
          }

          if (meta.name === "profile" && isFocused) {
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={{ selected: true }}
                accessibilityLabel={
                  descriptors[route.key].options.title ?? meta.label
                }
                onPress={onPress}
                style={styles.profilePill}
                activeOpacity={0.9}
              >
                <Text style={styles.profilePillLabel}>{meta.label}</Text>
                <View style={styles.profileIconBubble}>
                  <Ionicons name="person" size={18} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            );
          }

          const iconName = isFocused ? meta.focusedIcon : meta.outlineIcon;
          const iconColor = isFocused ? "#E9866E" : "#8E8E8E";

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[
                styles.iconCircle,
                isFocused && styles.iconCircleFocused,
              ]}
              activeOpacity={0.85}
            >
              <Ionicons name={iconName} size={24} color={iconColor} />
              {showBadge ? <View style={styles.badgeDot} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 10 },
    }),
  },
  homePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#E9866E",
  },
  homePillLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Poppins",
  },
  profilePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    paddingLeft: 16,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  profilePillLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    fontFamily: "Poppins",
    textTransform: "lowercase",
  },
  profileIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E9866E",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FAFAFA",
  },
  iconCircleFocused: {
    borderColor: "rgba(233, 134, 110, 0.45)",
    backgroundColor: "#FFFFFF",
  },
  badgeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4C42",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
});
