import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";
import { Link } from "expo-router";
import { Checkbox, useTheme } from "react-native-paper";
import Select from "@/src/components/Select";

const businessType = [
  { label: "Product", value: "product" },
  { label: "Service", value: "service" },
  { label: "Product & Services", value: "product & service" },
];

const Register = () => {
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState("User");
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState<string | number>("");
  const [city, setCity] = useState<string | number>("");

  const renderForm = () => {
    switch (currentTab) {
      case "User":
        return (
          <View style={styles.formContainer}>
            <TextInput placeholder="First Name" />
            <TextInput placeholder="Last Name" />
            <TextInput placeholder="Username" />
            <View style={styles.selectContainer}>
              <Select
                containerStyle={{ flex: 1 }}
                placeholder="State"
                options={[]}
                selectedValue={state}
                onValueChange={(value) => setState(value)}
              />
              <Select
                containerStyle={{ flex: 1 }}
                placeholder="City"
                options={[]}
                selectedValue={city}
                onValueChange={(value) => setCity(value)}
              />
            </View>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Password" isPassword />
            <TextInput placeholder="Confirm Password" isPassword />
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
              />
              <Text>
                I agree to Pinpoints{" "}
                <Link href="/terms" style={styles.boldText}>
                  Terms and Condition
                </Link>
              </Text>
            </View>
            <Button variant="contained">Sign Up</Button>
            <View style={styles.linkContainer}>
              <Text>Already have an account?</Text>
              <Link href={"/login"} style={styles.signup}>
                Log in
              </Link>
            </View>
          </View>
        );
      case "Partner":
        return (
          <View style={styles.formContainer}>
            <TextInput placeholder="Business Legal Name" />
            <TextInput placeholder="Username" />
            <View style={styles.nameContainer}>
              <TextInput
                containerStyle={{ flex: 1 }}
                placeholder="Owner First Name"
              />
              <TextInput
                containerStyle={{ flex: 1 }}
                placeholder="Owner Last Name"
              />
            </View>
            <TextInput placeholder="Business Physical Address" />
            <View style={styles.selectContainer}>
              <Select
                containerStyle={{ flex: 1 }}
                placeholder="State"
                options={[]}
                selectedValue={state}
                onValueChange={(value) => setState(value)}
              />
              <Select
                containerStyle={{ flex: 1 }}
                placeholder="City"
                options={[]}
                selectedValue={city}
                onValueChange={(value) => setCity(value)}
              />
            </View>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Zip Code" />
            <Select
              placeholder="Business Type"
              options={businessType}
              selectedValue={city}
              onValueChange={(value) => setCity(value)}
              containerStyle={styles.selectContainerStyle}
            />
            <TextInput placeholder="EIN/SSN" />
            <TextInput placeholder="Password" isPassword />
            <TextInput placeholder="Confirm Password" isPassword />
            <View style={styles.checkboxContainer}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
              />
              <Text>
                I agree to Pinpoints{" "}
                <Link href="/terms" style={styles.boldText}>
                  Terms and Condition
                </Link>
              </Text>
            </View>
            <Button variant="contained">Sign Up</Button>
            <View style={styles.linkContainer}>
              <Text>Already have an account?</Text>
              <Link href={"/login"} style={styles.signup}>
                Log in
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
        <Text style={styles.description}>Sign up to access your account</Text>
      </View>
      <View style={styles.tabContainer}>
        <Button
          onPress={() => setCurrentTab("User")}
          variant={currentTab === "User" ? "contained" : "outlined"}
        >
          As a User
        </Button>
        <Button
          onPress={() => setCurrentTab("Partner")}
          variant={currentTab === "Partner" ? "contained" : "outlined"}
        >
          As a Partner
        </Button>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  formContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  selectContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: "row",
    gap: 10,
    // marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  signup: {
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  selectContainerStyle: {
    marginBottom: 20,
  },
});
