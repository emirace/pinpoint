import Header from "@/src/components/partner/Header";
import Sidebar from "@/src/components/partner/Sidebar";
import { Stack } from "expo-router";
import { View, useWindowDimensions, Platform } from "react-native";

export default function Layout() {
  const { height, width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#f5f5f5" }}>
      {Platform.OS === "web" && width > 768 && <Sidebar />}
      <View style={{ height: height, overflow: "hidden", flex: 1 }}>
        <Header />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="leads" />
        </Stack>
      </View>
    </View>
  );
}
