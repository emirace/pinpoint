import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="picture" options={{ headerShown: false }} />
      <Stack.Screen name="detail" options={{ headerShown: false }} />
      <Stack.Screen
        name="gallery"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
