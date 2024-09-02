import React, { useState, ReactNode } from "react";
import {
  Modal as DefaultModal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Replace this with your preferred icon library
import { Checkbox } from "react-native-paper";
import Button from "../Button";

type Option = {
  label: string;
  value: string | number;
};

type CustomModalProps = {
  children: ReactNode;
  button: ReactNode;
  buttonStyle?: StyleProp<TextStyle>;
  modalStyle?: StyleProp<ViewStyle>;
};

const Modal: React.FC<CustomModalProps> = ({
  button,
  children,
  modalStyle,
  buttonStyle,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[buttonStyle]}
      >
        {button}
      </TouchableOpacity>

      <DefaultModal
        transparent
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContent, modalStyle]}>{children}</View>
        </TouchableOpacity>
      </DefaultModal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    // maxHeight: "50%",
    // flex: 1,
  },
  info: { fontWeight: "500", fontSize: 18 },
  option: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Modal;
