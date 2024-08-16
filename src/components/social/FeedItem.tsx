import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";

interface Feed {
  id: string;
  username: string;
  location: string;
  image?: any;
  video?: any;
  likes: number;
  comments: number;
  description?: string;
}

interface Props {
  item: Feed;
}

const FeedItem: React.FC<Props> = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = useState<any>({});
  return (
    <View style={styles.feedItem}>
      {item.video ? (
        <>
          <Video
            ref={video}
            source={item.video}
            style={styles.mediaBackground}
            isLooping
            // shouldPlay
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={[styles.mediaBackground, styles.videoCont]}>
            <Ionicons
              name={status.isPlaying ? "pause-circle" : "play-circle"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
              size={40}
              color="white"
            />
            <Ionicons
              name={
                status.isMuted ? "volume-mute-outline" : "volume-high-outline"
              }
              style={{ position: "absolute", bottom: 4, right: 4 }}
              size={40}
              color="white"
            />
          </View>
        </>
      ) : item.image ? (
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={styles.mediaBackground}
        >
          <View style={styles.userInfo}>
            <Image source={item.image} style={styles.userAvatar} />
            <View style={styles.userDetails}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.userInfo]}>
          <Image
            source={require("../../../assets/images/slide1.png")}
            style={styles.userAvatar}
          />
          <View style={styles.userDetails}>
            <Text style={[styles.username, { color: "black" }]}>
              {item.username}
            </Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={25} color="gray" />
          </TouchableOpacity>
        </View>
      )}

      {/* Optional Description */}
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}

      {/* Actions Section */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => setLiked(!liked)}
          style={styles.actionButton}
        >
          <AntDesign
            name={liked ? "heart" : "hearto"}
            size={24}
            color={liked ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.stats}>
        {item.likes} Likes · {item.comments} Comments
      </Text>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  feedItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
  videoCont: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
  location: {
    color: "#888",
  },
  description: {
    marginVertical: 10,
  },
  mediaBackground: {
    // width: "100%",
    height: 450,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    marginBottom: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  stats: {},
});
