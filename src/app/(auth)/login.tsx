import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { Link } from "expo-router";
import { Checkbox, useTheme } from "react-native-paper";
import { router } from "expo-router";

enum Tabs {
  User = "User",
  Partner = "Partner",
  Assistant = "Assistant",
}

const Login = () => {
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.User);
  const [checked, setChecked] = useState(false);

  const renderCommonForm = () => (
    <>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" isPassword />
      <View style={styles.options}>
        <View style={styles.remember}>
          <Checkbox.Android
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
          />
          <Text>Remember me</Text>
        </View>
        <Link
          style={[styles.forgetPassword, { color: colors.primary }]}
          href={"/"}
        >
          Forgot Password
        </Link>
      </View>
      <Button onPress={() => router.push("/verify")} variant="contained">
        Sign In
      </Button>
      <View style={[styles.remember, styles.signupContainer]}>
        <Text>Don't have an account?</Text>
        <Link href={"/register"} style={styles.signup}>
          Sign up
        </Link>
      </View>
    </>
  );

  const renderForm = () => {
    switch (currentTab) {
      case Tabs.User:
      case Tabs.Partner:
        return renderCommonForm();
      case Tabs.Assistant:
        return (
          <View style={{ flex: 1 }}>
            <TextInput placeholder="Email" />
            <Button containerStyle={{ marginTop: 25 }} variant="contained">
              Verify
            </Button>
            <View style={[styles.remember, styles.signupContainer]}>
              <Text>Don't have an account?</Text>
              <Link href={"/register"} style={styles.signup}>
                Sign up
              </Link>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("../../../assets/images/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Welcome back</Text>
        <Text style={styles.header}>to The Pinpoint Social!</Text>
        <Text style={styles.description}>Sign in to access your account</Text>
      </View>
      <View style={styles.tabContainer}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab(Tabs.User)}
            variant={currentTab === Tabs.User ? "contained" : "outlined"}
          >
            As a User
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab(Tabs.Partner)}
            variant={currentTab === Tabs.Partner ? "contained" : "outlined"}
          >
            As a Partner
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setCurrentTab(Tabs.Assistant)}
            variant={currentTab === Tabs.Assistant ? "contained" : "outlined"}
          >
            Assistant
          </Button>
        </View>
      </View>
      {renderForm()}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 30,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgetPassword: {
    fontSize: 14,
    fontWeight: "bold",
  },
  signupContainer: {
    justifyContent: "center",
    marginTop: 15,
  },
  signup: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
