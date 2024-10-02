import React, { useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useStory } from "@/src/context/Story";
import { useUser } from "@/src/context/User";
import { IStory } from "@/src/types/story";
import { ActivityIndicator } from "react-native-paper";

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
  const { stories, uploading } = useStory();
  const { user } = useUser();
  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotateValue.stopAnimation(); // Stop the current animation
  };

  const renderItem = ({ item }: { item: IStory }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push("/reel")}
        style={styles.storyItem}
      >
        <Image source={{ uri: item.media }} style={styles.storyImage} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Stories</Text>
      <FlatList
        data={stories}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <TouchableOpacity
            onPress={() => router.push("/camera")}
            style={styles.storyItem}
          >
            <View style={styles.addStoryContainer}>
              <Image
                source={{ uri: user?.avatarUrl }}
                style={styles.storyImage}
              />
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  top: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0.5,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "red",
                }}
              ></View>
              <Ionicons
                style={{ position: "absolute" }}
                name="add"
                size={24}
                color="red"
              />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() =>
          uploading ? <ActivityIndicator size={50} /> : null
        }
        keyExtractor={(item) => item._id}
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
