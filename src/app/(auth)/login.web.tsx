import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
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

        <TextInput
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              icon={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            />
          }
        />

        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={styles.rememberMeContainer}
        >
          <Checkbox status={rememberMe ? "checked" : "unchecked"} />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>

        <Button mode="contained" onPress={() => console.log("Sign In")}>
          Sign In
        </Button>

        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Image
          source={require("../../../assets/images/slide1.png")}
          style={styles.image}
        />
        <View style={styles.overlayText}>
          <Text style={styles.discoverTitle}>Discover Local Favorites.</Text>
          <Text style={styles.discoverSubtitle}>
            Quickly find and shop from nearby small businesses that offer Retail
            & Services.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  leftContainer: {
    width: "40%",
    justifyContent: "center",
    padding: 40,
  },
  rightContainer: {
    width: "55%",
    padding: 20,
    justifyContent: "center",
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
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    height: 60,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 10,
    color: "#0066cc",
    textAlign: "right",
  },
  signUpText: {
    marginTop: 10,
    fontSize: 16,
  },
  signUpLink: {
    color: "#0066cc",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  overlayText: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  discoverTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  discoverSubtitle: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Login;
