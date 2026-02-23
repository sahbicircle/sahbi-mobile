import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
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
            case "profile":
              iconName = `person${focused ? "" : "-outline"}`;
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
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
        name="profile"
        options={{
          title: "", // "Profile"
        }}
      />
    </Tabs>
  );
}
