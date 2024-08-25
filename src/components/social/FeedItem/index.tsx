import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { Menu } from "react-native-paper";
import { router } from "expo-router";
import CommentModal from "./Comment";
import Share from "./Share";

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
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handlePlayPause = useCallback(() => {
    if (status?.isPlaying) {
      video.current?.pauseAsync();
    } else {
      video.current?.playAsync();
    }
  }, [status]);

  const renderOption = () => (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="ellipsis-horizontal" size={25} color="gray" />
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      mode="flat"
    >
      <TouchableOpacity
        onPress={closeMenu}
        style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
      >
        <Ionicons name="flag-outline" size={20} />
        <Text>Report Partner</Text>
      </TouchableOpacity>
    </Menu>
  );

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
              onPress={handlePlayPause}
              size={40}
              color="white"
            />
            <Ionicons
              name={
                status.isMuted ? "volume-mute-outline" : "volume-high-outline"
              }
              style={{ position: "absolute", bottom: 15, right: 20 }}
              size={40}
              color="white"
            />
            <View
              style={{ position: "absolute", top: 15, left: 20, right: 20 }}
            >
              <View style={styles.userInfo}>
                <Image source={item.image} style={styles.userAvatar} />
                <View style={styles.userDetails}>
                  <Text
                    onPress={() => router.push("/location")}
                    style={styles.username}
                  >
                    {item.username}
                  </Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
                {renderOption()}
              </View>
            </View>
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
              <Text
                onPress={() => router.push("/location")}
                style={styles.username}
              >
                {item.username}
              </Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            {renderOption()}
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.userInfo]}>
          <Image
            source={require("../../../../assets/images/slide1.png")}
            style={styles.userAvatar}
          />
          <View style={styles.userDetails}>
            <Text
              onPress={() => router.push("/location")}
              style={[styles.username, { color: "black" }]}
            >
              {item.username}
            </Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>
          {renderOption()}
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
        <CommentModal />
        <Share />
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
    left: 15,
    top: 15,
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
