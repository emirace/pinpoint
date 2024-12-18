import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";
import { useUser } from "@/src/context/User";

export default function TabLayout() {
  const { user } = useUser();
  // This layout can be deferred because it's not the root layout.

  if (Platform.OS === "web") {
    return <Redirect href="/dashboard" />;
  }
  if (user && user.role === "partner") {
    return <Redirect href="/dashboard" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Social",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <Ionicons name="map-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
