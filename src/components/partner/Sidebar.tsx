import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons"; // You can also use other icon libraries
import { usePathname } from "expo-router";
import { Link } from "expo-router";
import { lightColors } from "../../utils/colors";
import { Href } from "expo-router";
import { useTheme } from "react-native-paper";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export const navList = [
  {
    name: "Dashboard",
    icon: "home",
    iconType: Feather,
    path: "/dashboard",
  },
  {
    name: "Leads",
    icon: "clipboard-edit-outline",
    iconType: MaterialCommunityIcons,
    path: "/leads",
  },
  {
    name: "Location",
    icon: "location-outline",
    iconType: Ionicons,
    path: "/location",
  },
  {
    name: "Products",
    icon: "bag-handle-outline",
    iconType: Ionicons,
    path: "/products",
  },
  {
    name: "Services",
    icon: "user",
    iconType: FontAwesome5,
    path: "/services",
  },
  {
    name: "Coupons",
    icon: "ticket-percent-outline",
    iconType: MaterialCommunityIcons,
    path: "/coupons",
  },
  {
    name: "Badges",
    icon: "shield-star-outline",
    iconType: MaterialCommunityIcons,
    path: "/badges",
  },
  {
    name: "Polls",
    icon: "chart",
    iconType: SimpleLineIcons,
    path: "/polls",
  },
  {
    name: "Pinpoint Partnership",
    icon: "diamond",
    iconType: FontAwesome,
    path: "/polls",
  },
  {
    name: "Settings",
    icon: "settings-outline",
    iconType: Ionicons,
    path: "/settings",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth] = useState(new Animated.Value(60)); // Initial sidebar width
  const pathname = usePathname();
  const { colors } = useTheme();

  const toggleSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: isCollapsed ? 250 : 80, // Expanded width or collapsed width
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Animated.View style={[styles.sidebarContainer]}>
      <View style={styles.logoContainer}>
        {!isCollapsed ? (
          <Image
            source={require("../../../assets/images/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../../assets/images/logo1.png")}
            style={[styles.logo, { height: 35, width: 30, marginTop: 10 }]}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.menuItems}>
        {navList.map((item, index) => {
          const isActive = pathname === item.path; // Check if current path matches the link
          return (
            <Link
              href={item.path}
              key={index}
              style={{ textDecorationLine: "none" }}
            >
              <View
                style={[
                  styles.menuItem,
                  isActive ? styles.activeItem : null, // Apply active styles
                ]}
              >
                <item.iconType
                  name={item.icon}
                  size={20}
                  color={isActive ? "white" : colors.primary}
                />
                {!isCollapsed && (
                  <Text
                    style={[
                      styles.menuText,
                      { color: isActive ? "white" : colors.primary },
                    ]}
                  >
                    {item.name}
                  </Text>
                )}
              </View>
            </Link>
          );
        })}
      </View>

      {/* Toggle button */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.collapseButton}>
        <Feather
          name={isCollapsed ? "chevrons-right" : "chevrons-left"}
          size={20}
          color="gray"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    flexDirection: "column",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 20,
  },
  logoContainer: {},

  logo: {
    width: 120,
    height: 50,
  },
  menuItems: {
    marginTop: 20,
  },
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
    color: "gray",
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

export default Sidebar;
