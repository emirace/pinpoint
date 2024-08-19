import SplashScreen from "@/src/components/SplashScreen";
import Onboarding from "@/src/components/onboarding/Onboarding";
import { useAuth } from "@/src/context/Auth";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";

export default function Layout() {
  const { user, loading, onboardingCompleted } = useAuth();
  console.log(onboardingCompleted);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (loading) {
    return <SplashScreen />;
  }

  if (!onboardingCompleted) {
    return <Onboarding />;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(socialpost)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="reel" options={{ headerShown: false }} />
    </Stack>
  );
}
