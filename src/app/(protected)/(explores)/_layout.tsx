import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="inquire" />
      <Stack.Screen name="product-detail" />
      <Stack.Screen name="service-detail" />
    </Stack>
  );
}
