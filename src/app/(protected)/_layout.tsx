import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="postsocial" options={{ headerShown: false }} />
    </Stack>
  );
}
