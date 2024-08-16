import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "react-native-paper";
import { lightColors } from "../utils/colors";

type ButtonVariant = "contained" | "outlined";

type CustomButtonProps = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
};

const Button: React.FC<CustomButtonProps> = ({
  children,
  onPress,
  containerStyle,
  textStyle,
  loading = false,
  disabled = false,
  variant = "contained",
}) => {
  const isOutlined = variant === "outlined";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutlined ? styles.outlinedButton : styles.containedButton,
        containerStyle,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={isOutlined ? lightColors.colors.primary : "#fff"}
        />
      )}
      <Text
        style={[
          styles.buttonText,
          isOutlined ? styles.outlinedText : styles.containedText,
          textStyle,
        ]}
        numberOfLines={1}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    maxHeight: 48,
  },
  containedButton: {
    backgroundColor: lightColors.colors.primary,
    borderColor: lightColors.colors.primary,
  },
  outlinedButton: {
    backgroundColor: "#f1f1f1",
    borderColor: "#D8D8D8",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    borderColor: "#cccccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  containedText: {
    color: "#ffffff",
  },
  outlinedText: {
    color: "gray",
  },
});

export default Button;
