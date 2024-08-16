import { Text } from "react-native";
import { Redirect, Stack, Tabs } from "expo-router";
import SplashScreen from "@/src/components/SplashScreen";
import Onboarding from "@/src/components/onboarding/Onboarding";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TabLayout() {
  const loading = false;
  const user = true;
  const onboarding = false;

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <SplashScreen />;
  }

  if (onboarding) {
    return <Onboarding />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: "Social",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-outline" size={24} color={color} />
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
