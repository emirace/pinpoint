import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  useWindowDimensions,
} from "react-native";

const Carousel = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // List of images for the carousel
  const images = [
    {
      id: 1,
      image: require("../../../assets/images/slide1.png"),
      title: "Discover Local Favorites.",
      subtitle:
        "Quickly find and shop from neeaby small businesses that offer Retail & Servicess",
    },
    {
      id: 2,
      image: require("../../../assets/images/slide2.png"),
      title: "Find Unique Cafes.",
      subtitle: "Explore charming cafes near your location.",
    },
    {
      id: 3,
      image: require("../../../assets/images/slide3.png"),
      title: "Explore Bookstores.",
      subtitle: "Discover bookstores with rare and exciting books.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * screenWidth * 0.55, // Scroll by 55% of the screen width (adjust to match layout)
        animated: true,
      });
    }

    // Animate pagination bar width
    Animated.timing(animation, {
      toValue: currentIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual scrolling
      >
        {images.map((image, index) => (
          <View
            key={image.id}
            style={[
              styles.slide,
              {
                width: screenWidth * 0.55,
              },
            ]}
          >
            <Image source={image.image} style={styles.image} />
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0,1)"]}
              style={[styles.gradient, { height: screenHeight * 0.4 }]}
            />
            <View style={styles.overlayText}>
              <Text style={styles.discoverTitle}>{image.title}</Text>
              <Text style={styles.discoverSubtitle}>{image.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => {
          // Animated width for active dot
          const width = animation.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 50, 8], // Active dot grows, inactive dots are smaller
            extrapolate: "clamp",
          });

          return <Animated.View key={index} style={[styles.dot, { width }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  slide: {
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlayText: {
    position: "absolute",
    bottom: 70,
    left: 40,
    maxWidth: "40%",
  },
  discoverTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  discoverSubtitle: {
    fontSize: 16,
    color: "#fff",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  paginationContainer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    flexDirection: "row",
    zIndex: 100,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    zIndex: 100,
    marginHorizontal: 4,
  },
});

export default Carousel;
