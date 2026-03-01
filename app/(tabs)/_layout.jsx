import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useNotifications } from "../../hooks/useNotifications";

export default function TabsLayout() {
  const { unreadCount } = useNotifications();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = `home${focused ? "" : "-outline"}`;
              break;
            case "events":
              iconName = `calendar${focused ? "" : "-outline"}`;
              break;
            case "chats":
              iconName = `chatbubble-ellipses${focused ? "" : "-outline"}`;
              break;
            case "notifications":
              iconName = `notifications${focused ? "" : "-outline"}`;
              break;
            case "profile":
              iconName = `person${focused ? "" : "-outline"}`;
              break;
            default:
              iconName = "ellipse-outline";
          }

          const icon = <Ionicons name={iconName} size={24} color={color} />;

          if (route.name === "notifications" && unreadCount > 0) {
            return (
              <View style={{ position: "relative" }}>
                {icon}
                <View
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -6,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: "#FF4C42",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={{ fontSize: 10, color: "white", fontWeight: "700" }}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              </View>
            );
          }

          return icon;
        },
        tabBarActiveTintColor: "#eba28a", // active color
        tabBarInactiveTintColor: "gray", // inactive color
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "", // "Home"
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "", // "Events"
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "", // "Chats"
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "", // "Notifications"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "", // "Profile"
        }}
      />
    </Tabs>
  );
}
