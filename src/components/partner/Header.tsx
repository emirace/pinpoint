import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Appbar, Avatar, Menu, useTheme } from "react-native-paper";
import { Link, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { lightColors } from "@/src/utils/colors";
import { navList } from "./Sidebar";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { width, height } = useWindowDimensions();
  const { colors } = useTheme();
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
    Animated.timing(animatedHeight, {
      toValue: isCollapsed ? height * 0.8 : 0, // Set max height when expanded
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        {Platform.OS === "web" && width > 768 ? (
          <>
            <Appbar.Action icon="star" onPress={() => {}} color="gray" />
            <Appbar.Content
              title="Search (Ctrl+/)"
              titleStyle={{ fontSize: 16, color: "gray" }}
            />
          </>
        ) : (
          <>
            <Image
              source={require("../../../assets/images/logo2.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Appbar.Content title="" />
          </>
        )}

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="plus" onPress={openMenu} />}
          anchorPosition="bottom"
          mode="flat"
        >
          <Menu.Item
            leadingIcon="image-edit-outline"
            onPress={() => {
              closeMenu();
              router.push("/addpost");
            }}
            title="Post"
          />
          <Menu.Item
            leadingIcon="movie-open-play-outline"
            onPress={() => {
              closeMenu();
              router.push("/camera");
            }}
            title="Reel"
          />
        </Menu>

        {Platform.OS === "web" && width > 768 ? (
          <>
            <Appbar.Action icon="bell-outline" onPress={() => {}} />
            <Appbar.Action icon="email-outline" onPress={() => {}} />
            <Appbar.Action
              icon="shield-outline"
              onPress={() => {}}
              color="red"
            />
            <Text style={{ marginRight: 20 }}>Verified</Text>
            <Avatar.Image
              size={35}
              source={require("../../../assets/images/user1.png")}
              style={{ marginRight: 15 }}
            />
          </>
        ) : (
          <Appbar.Action icon="menu" onPress={toggleMenu} />
        )}
      </Appbar.Header>

      {/* Collapsible Menu */}
      <Animated.View style={[styles.menuContainer, { height: animatedHeight }]}>
        <ScrollView contentContainerStyle={styles.menuItems}>
          {navList.map((item, index) => {
            const isActive = false;
            return (
              <Link
                href={item.path}
                key={index}
                style={{ textDecorationLine: "none" }}
                onPress={toggleMenu}
              >
                <View
                  style={[
                    styles.menuItem,
                    isActive ? styles.activeItem : null, // Apply active styles
                  ]}
                >
                  <item.iconType name={item.icon} size={20} />
                  <Text style={[styles.menuText]}>{item.name}</Text>
                </View>
              </Link>
            );
          })}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: { height: 40, width: 150 },
  menuContainer: {
    overflow: "hidden", // Ensures smooth animation of collapsing
    marginTop: 5,
    backgroundColor: "white",
  },
  menuItems: { paddingTop: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 5,
    width: "100%",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  collapseButton: {
    position: "absolute",
    top: 20,
    right: 5,
  },
  activeItem: {
    backgroundColor: lightColors.colors.primary, // Light blue background for active item
    borderRadius: 5,
  },
});
