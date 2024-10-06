import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import { Video } from "expo-av";
import ReelItem from "@/src/components/social/ReelItem";
import { useStory } from "@/src/context/Story";

const Reel = () => {
  const { getSortedStoryMedia } = useStory();
  const videoRefs = useRef<Video[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);

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
      data={getSortedStoryMedia("66fb6135020ae25804306aa9")}
      keyExtractor={(item) => item._id}
      renderItem={({ item, index }) => (
        <ReelItem
          key={item._id}
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
