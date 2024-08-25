import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";

const galleryItems = [
  {
    id: "1",
    uri: require("../../../../../assets/images/feeds/feed2.png"),
    isVideo: false,
  },
  {
    id: "2",
    uri: require("../../../../../assets/images/feeds/feed1.png"),
    isVideo: false,
  },
  {
    id: "4",
    uri: require("../../../../../assets/images/product.png"),
    isVideo: false,
  },
  {
    id: "3",
    uri: require("../../../../../assets/videos/feed2.mp4"),
    isVideo: true,
  },
];

const pictures = () => {
  const { colors } = useTheme();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const renderGalleryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItem?.id === item.id && {
          borderWidth: 5,
          borderColor: colors.primary,
        },
      ]}
      onPress={() => setSelectedItem(item)}
    >
      <Image
        style={styles.image}
        source={item.uri}
        contentFit="cover"
        transition={1000}
      />
      {item.isVideo && (
        <>
          <Ionicons
            name="play-circle"
            size={24}
            color="white"
            style={styles.playIcon}
          />
        </>
      )}
      {selectedItem?.id === item.id && <View style={styles.overlay} />}
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="The Burger Place" />
      </Appbar.Header>
      <FlatList
        data={galleryItems}
        renderItem={renderGalleryItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.galleryGrid}
      />
    </View>
  );
};

export default pictures;
const WIDTH = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  galleryGrid: {},
  itemContainer: {
    width: WIDTH / 3,
    height: WIDTH / 3,
    // padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.8,
  },
  playIcon: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
});
