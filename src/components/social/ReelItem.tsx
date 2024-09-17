import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Ionicons, Entypo, FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Menu } from "react-native-paper";
import MultiSelect from "../select/MultiSelect";
import CommentModal from "./FeedItem/Comment";
import Share from "./FeedItem/Share";

export const reportOption = [
  { label: "Nodity or Sexual Activity", value: "Nodity or Sexual Activity" },
  { label: "Bullyor Harassment", value: "Bullyor Harassment" },
  { label: "Suicide or Self-Injury", value: "Suicide or Self-Injury" },
  {
    label: "Promote Violence, Hate or Exploitation",
    value: "Promote Violence, Hate or Exploitation",
  },
  {
    label: "Selling or Promoting Restricted Items",
    value: "Selling or Promoting Restricted Items",
  },
  {
    label: "Scam, Fraud or False Impersonation",
    value: "Scam, Fraud or False Impersonation",
  },
  { label: "Intellectual Property", value: "Intellectual Property" },
  { label: "Other (Add Description)", value: "Other" },
];

const { height } = Dimensions.get("screen");

interface VideoItemProps {
  item: any;
  index: number;
  videoRefs: React.RefObject<Video[]>;
  isPlaying: boolean;
  showControls: boolean;
  togglePlayPause: (videoRef: Video) => void;
}

const ReelItem: React.FC<VideoItemProps> = ({
  item,
  index,
  videoRefs,
  isPlaying,
  showControls,
  togglePlayPause,
}) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.videoContainer}>
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={() => togglePlayPause(videoRefs.current![index])}
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
            videoRefs.current![index] = ref!;
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
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
              <Entypo name="dots-three-horizontal" size={30} color="white" />
            </TouchableOpacity>
          }
          anchorPosition="bottom"
          mode="flat"
        >
          <MultiSelect
            button={
              <View
                style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
              >
                <Ionicons name="flag-outline" size={20} />
                <Text>Report Partner</Text>
              </View>
            }
            options={reportOption}
            onValuesChange={() => {}}
            containerStyle={{ borderWidth: 0 }}
            buttonText="Report"
          />
        </Menu>
        <TouchableOpacity
          onPress={() => setIsLiked(!isLiked)}
          style={styles.iconButton}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={30}
            color={isLiked ? "red" : "white"}
          />
        </TouchableOpacity>
        <CommentModal
          buttonStyle={[styles.iconButton, { marginRight: 0 }]}
          icon={<Ionicons name="chatbubble-outline" size={30} color="white" />}
        />
        <Share
          buttonStyle={[styles.iconButton, { marginRight: 0 }]}
          icon={<Ionicons name="paper-plane-outline" size={30} color="white" />}
        />
        <TouchableOpacity
          onPress={() => setIsFollowing(!isFollowing)}
          style={styles.iconButton}
        >
          <Feather
            name={isFollowing ? "user-check" : "user-plus"}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReelItem;

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
