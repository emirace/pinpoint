import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  Image,
} from "react-native";
import React from "react";
import FeedItem from "@/src/components/social/FeedItem";
import HeaderStories from "@/src/components/social/HeaderStories";
import NearBy from "@/src/components/partner/socials/NearBy";
import { useTheme } from "react-native-paper";
import useDimensions from "@/src/hooks/useDimension";

// Sample data with local images and videos
const data = [
  {
    id: "2",
    username: "Foodie",
    location: "The Burger Place",
    image: null,
    video: null,
    likes: 560,
    comments: 45,
    description:
      "Feast your eyes on the best burgers in town! This place serves up the juiciest, most flavorful patties with the freshest toppings...",
  },
  {
    id: "1",
    username: "Traveler",
    location: "Paris, France",
    image: require("../../../../assets/images/feeds/feed1.png"),
    video: null,
    likes: 245,
    comments: 30,
    description:
      "Exploring the beautiful city of Paris has always been on my bucket list. The Eiffel Tower was absolutely breathtaking...",
  },
  {
    id: "3",
    username: "NatureLover",
    location: "Yosemite National Park",
    image: require("../../../../assets/images/feeds/feed2.png"),
    video: null,
    likes: 876,
    comments: 120,
  },
  {
    id: "4",
    username: "Photographer",
    location: "Santorini, Greece",
    image: require("../../../../assets/images/feeds/feed2.png"),
    video: require("../../../../assets/videos/feed2.mp4"),
    likes: 1024,
    comments: 85,
  },
  {
    id: "5",
    username: "Foodie",
    location: "The Burger Place",
    image: require("../../../../assets/images/feeds/feed2.png"),
    video: require("../../../../assets/videos/feed3.mp4"),
    likes: 560,
    comments: 45,
    description:
      "Feast your eyes on the best burgers in town! This place serves up the juiciest, most flavorful patties with the freshest toppings...",
  },
];

const Socials = () => {
  const { colors } = useTheme();
  const { height, isMobile } = useDimensions();
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <View style={styles.row}>
          <Image
            source={require("../../../../assets/images/logo2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={{ flex: 2 }} />
        </View>
      )}
      <View style={[styles.row, { height: height }]}>
        <FlatList
          data={data}
          renderItem={({ item }) => <FeedItem item={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<HeaderStories />}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          style={{ flex: 3 }}
        />
        {!isMobile && (
          <ScrollView
            style={{ flex: 2, paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.subHeading}>NearBy Users</Text>
              <Text style={[{ color: colors.primary, fontWeight: "500" }]}>
                See More
              </Text>
            </View>
            {data.map((item) => (
              <NearBy key={item.id} item={item} />
            ))}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 50,
              }}
            >
              <Text style={styles.subHeading}>NearBy Partners</Text>
              <Text style={[{ color: colors.primary, fontWeight: "500" }]}>
                See More
              </Text>
            </View>
            {data.map((item) => (
              <NearBy key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Socials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "web" ? 10 : 0,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  subHeading: { fontWeight: "500", fontSize: 18, marginBottom: 20 },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
    alignSelf: "center",
    flex: 3,
    paddingHorizontal: 20,
  },
});
