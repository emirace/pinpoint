import SplashScreen from "@/src/components/SplashScreen";
import Onboarding from "@/src/components/onboarding/Onboarding";
import { useAuth } from "@/src/context/Auth";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function Layout() {
  const { user, loading, onboardingCompleted } = useAuth();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <SplashScreen />;
  }

  if (!onboardingCompleted && Platform.OS !== "web") {
    return <Onboarding />;
  }
  if (!user) {
    return <Redirect href="/login" />;
  }

  // if (user && user === "partner") {
  //   return <Redirect href="/dashboard" />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(socialpost)" />
      <Stack.Screen name="(explores)" />
      <Stack.Screen name="(menu)" />
      <Stack.Screen name="(partner)" />
    </Stack>
  );
}
