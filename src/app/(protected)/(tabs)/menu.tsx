import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { Appbar, useTheme } from "react-native-paper";

const Menu = () => {
  const { colors } = useTheme();

  const renderGridItem = (icon: React.ReactNode, label: string) => (
    <TouchableOpacity style={styles.gridItem}>
      {icon}
      <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
        mode="small"
      >
        <Appbar.Content title="Menu" titleStyle={{ fontWeight: "bold" }} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.selectedItem}>
          <Image
            source={require("../../../../assets/images/user1.png")}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userDetail}>
          <View style={styles.name}>
            <Text
              onPress={() => router.push("/profile")}
              style={styles.fullname}
            >
              Username Last name
            </Text>
            <Text style={styles.username}>User nickname</Text>
            <View style={styles.editCont}>
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Edit Profile
              </Text>
              <Feather name="edit" size={20} color={colors.primary} />
            </View>
          </View>
          <MaterialCommunityIcons
            name="shield-star-outline"
            size={35}
            color="red"
          />
        </View>
        <View style={styles.container}>
          <View style={styles.gridContainer}>
            {renderGridItem(
              <MaterialIcons name="question-answer" size={24} color="#555" />,
              "Inquiries"
            )}
            {renderGridItem(
              <MaterialCommunityIcons
                name="shield-star-outline"
                size={24}
                color="#555"
              />,
              "Badges"
            )}
            {renderGridItem(
              <FontAwesome name="ticket" size={24} color="#555" />,
              "Coupons"
            )}
            {renderGridItem(
              <Ionicons name="notifications-outline" size={24} color="#555" />,
              "Notification settings"
            )}
            {renderGridItem(
              <Ionicons name="heart-outline" size={24} color="#555" />,
              "Favorites"
            )}
            {renderGridItem(
              <Ionicons name="headset-outline" size={24} color="#555" />,
              "Support"
            )}
            {renderGridItem(
              <Ionicons name="document-text-outline" size={24} color="#555" />,
              "Terms"
            )}
            {renderGridItem(
              <Ionicons name="document-lock-outline" size={24} color="#555" />,
              "Privacy Policy"
            )}
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log out</Text>
            <Ionicons name="log-out-outline" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete Account</Text>
            <Ionicons name="trash-outline" size={20} color="#f00" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;

const { width: WIDTH } = Dimensions.get("screen");
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    zIndex: 20,
  },
  selectedItem: {
    // width: WIDTH,
    height: WIDTH * 0.5,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  mainImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  userDetail: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  name: {},
  username: {
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 5,
  },
  fullname: { fontSize: 24, fontWeight: "600" },
  editCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 5,
  },
  container: { borderTopColor: "#f1f1f1", borderTopWidth: 1, paddingTop: 30 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 40,
    gap: 15,
  },
  gridItem: {
    width: WIDTH * 0.2,
    height: WIDTH * 0.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
  },
  gridLabel: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "#555",
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    borderColor: "#f00",
    borderWidth: 1,
  },
  deleteText: {
    fontSize: 16,
    color: "#f00",
  },
});
