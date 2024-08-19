import { Stack } from "expo-router";
import {
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { lightColors } from "../utils/colors";
import { KeyboardAvoidingView, Platform } from "react-native";
import merge from "deepmerge";
import { AuthProvider } from "../context/Auth";

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

const CombinedDefaultTheme = merge(LightTheme, {
  ...MD3LightTheme,
  colors: lightColors.colors,
});

export default function Root() {
  return (
    <AuthProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <ThemeProvider value={CombinedDefaultTheme}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <Stack>
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="terms" options={{ headerShown: false }} />
            </Stack>
          </KeyboardAvoidingView>
        </ThemeProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
