import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState, useRef } from "react";
import Button from "@/src/components/Button";
import { useTheme } from "react-native-paper";
import { Link } from "expo-router";
import { useAuth } from "@/src/context/Auth";

const OTPVerification = () => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const inputRefs = useRef<TextInput[]>([]);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);

    // Simulate OTP verification process
    try {
      // Here you would usually call your API for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // On successful verification
      console.log("OTP Verified:", otp);
    } catch (error) {
      // Handle error
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // Simulate OTP resend
    console.log("OTP resent.");
  };

  const handleChangeText = (text: string, index: number) => {
    const otpArr = otp.split("");
    otpArr[index] = text;
    setOtp(otpArr.join(""));

    // Move to next input field
    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Move to previous input field
    if (key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/images/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Verify Your Account</Text>
        <Text style={styles.description}>
          Enter the Verification Code that has been sent to your registered
          email address
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <TextInput
            style={styles.otpInput}
            key={index}
            keyboardType="numeric"
            placeholder="_"
            placeholderTextColor={"#2F2F2F"}
            maxLength={1}
            ref={(ref: TextInput) => (inputRefs.current[index] = ref!)}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            value={otp[index] || ""}
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.resendContainer}>
        <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
          <Text style={[styles.resendText, { color: colors.primary }]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <Button loading={loading} onPress={() => login("username")}>
        Verify
      </Button>
      <View style={[styles.remember, styles.signupContainer]}>
        <Text>Don't have an account?</Text>
        <Link href={"/register"} style={styles.signup}>
          Sign up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    margin: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#F1F1F1",
  },
  errorText: {},
  resendButton: {
    marginTop: 20,
  },
  resendContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
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
