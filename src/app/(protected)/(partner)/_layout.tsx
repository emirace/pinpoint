import React, { useState } from "react";
import { Drawer } from "expo-router/drawer";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Ionicons,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons"; // Import icons
import { Appbar, Menu, useTheme } from "react-native-paper";
import { Image } from "react-native";
import { router } from "expo-router";
import AddPost from "../(socialpost)/addpost";
import Modal from "@/src/components/modals/modal";

export default function Layout() {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#000",
        drawerActiveBackgroundColor: colors.primary,
        drawerStyle: {
          backgroundColor: "#fff",
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        drawerType: "slide",
        header: ({ navigation, route, options }) => {
          return (
            <Appbar.Header mode="small" style={{ backgroundColor: "white" }}>
              {/* Left: Logo */}
              {route.name === "dashboard" || route.name === "socials" ? (
                <>
                  <Appbar.Action
                    icon="menu"
                    onPress={() => navigation.toggleDrawer()} // Toggle the drawer
                    color="black"
                  />
                  <Image
                    source={require("../../../../assets/images/logo2.png")}
                    style={{ width: 150, height: 40 }}
                    resizeMode="contain"
                  />
                  <Appbar.Content title="" />
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <Appbar.Action
                        icon="plus-circle-outline"
                        onPress={openMenu}
                      />
                    }
                    anchorPosition="bottom"
                    mode="flat"
                  >
                    <Modal
                      button={
                        <Menu.Item
                          onPress={() => {
                            closeMenu();
                            router.push("/addpost");
                          }}
                          leadingIcon="pencil-outline"
                          title="Create Post"
                        />
                      }
                    >
                      <AddPost />
                    </Modal>
                    <Menu.Item
                      leadingIcon="movie-open-play-outline"
                      onPress={() => {
                        closeMenu();
                        router.push("/camera");
                      }}
                      title="Create Reel"
                    />
                    <Menu.Item
                      leadingIcon="cube-outline"
                      onPress={() => {
                        closeMenu();
                        router.push("/products/add");
                      }}
                      title="Add Product"
                    />
                    <Menu.Item
                      leadingIcon="account-outline"
                      onPress={() => {
                        closeMenu();
                        router.push("/services/add");
                      }}
                      title="Add Service"
                    />
                    <Menu.Item
                      leadingIcon="map-marker-outline"
                      onPress={() => {
                        closeMenu();
                        router.push("/locations/setup");
                      }}
                      title="Add Location"
                    />
                  </Menu>
                </>
              ) : (
                <>
                  <Appbar.BackAction onPress={() => router.back()} />
                  <Appbar.Content
                    title={options.title || route.name}
                    titleStyle={{
                      // fontSize: 18,
                      // fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                    style={{ alignItems: "center" }}
                  />
                </>
              )}
            </Appbar.Header>
          );
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="leads"
        options={{
          drawerLabel: "Leads",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-edit-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="locations"
        options={{
          drawerLabel: "Locations",
          drawerIcon: ({ color }) => (
            <Ionicons name="location-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="products"
        options={{
          drawerLabel: "Products",
          drawerIcon: ({ color }) => (
            <Ionicons name="bag-handle-outline" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="services"
        options={{
          drawerLabel: "Services",
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="coupons"
        options={{
          headerShown: false,
          drawerLabel: "Coupons",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="badges"
        options={{
          drawerLabel: "Badges",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="shield-star-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="polls"
        options={{
          drawerLabel: "Polls",
          drawerIcon: ({ color }) => (
            <SimpleLineIcons name="chart" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="socials"
        options={{
          drawerLabel: "Pinpoint Socials",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="partnership"
        options={{
          drawerLabel: "Pinpoint Partnership",
          drawerIcon: ({ color }) => (
            <FontAwesome name="diamond" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
