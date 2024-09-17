import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import { Video } from "expo-av";
import ReelItem from "@/src/components/social/ReelItem";

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
        <ReelItem
          item={item}
          index={index}
          videoRefs={videoRefs}
          isPlaying={isPlaying}
          showControls={showControls}
          togglePlayPause={togglePlayPause}
        />
      )}
      pagingEnabled
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Reel;
