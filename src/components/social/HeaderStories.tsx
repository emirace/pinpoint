import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const storiesData = [
  {
    id: "1",
    image: require("../../../assets/images/stories/story2.png"),
    isAddButton: true,
  },
  {
    id: "2",
    image: require("../../../assets/images/stories/story1.png"),
    username: "User 2",
  },
  {
    id: "3",
    image: require("../../../assets/images/stories/story1.png"),
    username: "User 3",
  },
  {
    id: "4",
    image: require("../../../assets/images/stories/story1.png"),
    username: "User 2",
  },
  {
    id: "5",
    image: require("../../../assets/images/stories/story1.png"),
    username: "User 3",
  },
  {
    id: "6",
    image: require("../../../assets/images/stories/story1.png"),
    username: "User 2",
  },
  {
    id: "7",
    image: require("../../../assets/images/stories/story1.png"),
    username: "User 3",
  },
  // Add more stories as needed
];

const HeaderStories = () => {
  const renderItem = ({ item }: any) => {
    if (item.isAddButton) {
      return (
        <TouchableOpacity
          onPress={() => router.push("/camera")}
          style={styles.storyItem}
        >
          <View style={styles.addStoryContainer}>
            <Image source={item.image} style={styles.storyImage} />
            <Ionicons
              style={{ position: "absolute" }}
              name="add"
              size={24}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => router.push("/reel")}
        style={styles.storyItem}
      >
        <Image source={item.image} style={styles.storyImage} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stories</Text>
      <FlatList
        data={storiesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HeaderStories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  title: { fontWeight: "medium", paddingBottom: 10 },
  storyItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  addStoryContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ff6347", // Customize the background color
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ff6347", // Customize the border color
  },
});
