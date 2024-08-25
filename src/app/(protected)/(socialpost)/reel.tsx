import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Ionicons, Entypo, FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const videos = [
  {
    id: "1",
    uri: require("../../../../assets/videos/feed4.mp4"),
    user: {
      name: "John Doe",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  },
  {
    id: "2",
    uri: require("../../../../assets/videos/feed3.mp4"),
    user: {
      name: "Jane Smith",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  },
  {
    id: "3",
    uri: require("../../../../assets/videos/feed2.mp4"),
    user: {
      name: "Alice Johnson",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  },
];

const Reel = () => {
  const videoRefs = useRef<Video[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(true);

  const togglePlayPause = (videoRef: Video) => {
    if (isPlaying) {
      videoRef.pauseAsync();
    } else {
      videoRef.playAsync();
    }
    setIsPlaying(!isPlaying);
    setShowControls(true);

    setTimeout(() => {
      setShowControls(false);
    }, 2000); // Hide controls after 2 seconds
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (viewableItems.find((item: any) => item.index === index)) {
          video.playAsync();
          setIsPlaying(true);
        } else {
          video.pauseAsync();
        }
      }
    });
  });

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  });

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <View style={styles.videoContainer}>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={() => togglePlayPause(videoRefs.current[index]!)}
            activeOpacity={1}
          >
            {loading && (
              <ActivityIndicator
                size="large"
                color="#ffffff"
                style={styles.loadingIndicator}
              />
            )}
            <Video
              ref={(ref) => {
                videoRefs.current[index] = ref!;
              }}
              style={styles.video}
              source={item.uri}
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay={false}
              onLoadStart={() => setLoading(true)} // Start loading indicator
              onLoad={() => setLoading(false)} // Stop loading indicator when the video is ready
            />

            {showControls && !loading && (
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={70}
                color="white"
                style={styles.playPauseIcon}
              />
            )}
          </TouchableOpacity>

          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]}
            style={styles.gradient}
          />

          {/* User Info */}
          <View style={[styles.userInfo]}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: item.user.profilePic }}
                style={styles.userAvatar}
              />
              <View style={styles.userDetails}>
                <Text style={[styles.username]}>{item.user.name}</Text>
                <Text style={styles.location}>Location will be here</Text>
              </View>
            </View>
            <Text style={{ color: "white", marginTop: 15 }}>
              <Text style={{ color: "#07d64c", fontWeight: "bold" }}>Open</Text>{" "}
              till 5:00pm
            </Text>
          </View>

          {/* Action Icons */}
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Entypo name="dots-three-horizontal" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="heart-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="comment-o" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="paper-plane-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="user-check" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      pagingEnabled
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    height,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playPauseButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseIcon: {
    position: "absolute",
  },
  userInfo: {
    position: "absolute",
    bottom: 50,
    left: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  followButton: {
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 10,
  },
  followButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  actionIcons: {
    position: "absolute",
    bottom: 50,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    marginBottom: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  userDetails: {},
  username: {
    fontWeight: "bold",
    color: "white",
  },
  location: {
    color: "white",
    opacity: 0.5,
  },
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
});

export default Reel;
