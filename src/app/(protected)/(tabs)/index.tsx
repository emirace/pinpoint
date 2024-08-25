import { FlatList, SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";
import { Appbar, Divider, Menu } from "react-native-paper";
import FeedItem from "@/src/components/social/FeedItem";
import HeaderStories from "@/src/components/social/HeaderStories";
import { router } from "expo-router";

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
      "Feast your eyes on the best burgers in town! This place serves up the juiciest, most flavorful patties with the freshest toppings. Whether you like your burger simple or loaded with extras, The Burger Place has got you covered. The vibe here is casual and fun, making it the perfect spot to hang out with friends. Don’t forget to try their crispy fries and creamy milkshakes. It's an experience you won't forget!",
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
      "Exploring the beautiful city of Paris has always been on my bucket list. The Eiffel Tower was absolutely breathtaking, especially at night when it's all lit up. The food, the people, and the architecture are simply stunning. There's something magical about wandering through the streets, discovering little cafés, and soaking in the rich history and culture. Every corner you turn, there's a new adventure waiting. Can't wait to come back!",
  },
  {
    id: "3",
    username: "NatureLover",
    location: "Yosemite National Park",
    image: require("../../../../assets/images/feeds/feed2.png"),
    video: null,
    likes: 876,
    comments: 120,
    // description:
    //   "Yosemite National Park is a slice of paradise on Earth. The towering waterfalls, the lush meadows, and the majestic cliffs take your breath away. I spent the day hiking and every trail led to a view more stunning than the last. There's something humbling about being surrounded by nature in all its glory. It’s the perfect place to disconnect from the world and reconnect with yourself. Highly recommend this to anyone who loves the great outdoors!",
  },
  {
    id: "4",
    username: "Photographer",
    location: "Santorini, Greece",
    image: require("../../../../assets/images/feeds/feed2.png"),
    video: require("../../../../assets/videos/feed2.mp4"),
    likes: 1024,
    comments: 85,
    // description:
    //   "Santorini is a photographer's dream come true. The iconic white-washed buildings with blue domes, set against the backdrop of the Aegean Sea, create a picture-perfect setting. The sunsets here are nothing short of spectacular, painting the sky in hues of orange, pink, and purple. Walking through the narrow streets, you can feel the history and culture that permeates every corner. Whether you're here for the views, the food, or the culture, Santorini never disappoints.",
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
      "Feast your eyes on the best burgers in town! This place serves up the juiciest, most flavorful patties with the freshest toppings. Whether you like your burger simple or loaded with extras, The Burger Place has got you covered. The vibe here is casual and fun, making it the perfect spot to hang out with friends. Don’t forget to try their crispy fries and creamy milkshakes. It's an experience you won't forget!",
  },
];

const Social = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Image
          source={require("../../../../assets/images/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Appbar.Content title="" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="plus" onPress={openMenu} />}
          anchorPosition="bottom"
          mode="flat"
        >
          <Menu.Item
            leadingIcon="image-edit-outline"
            onPress={() => {
              closeMenu();
              router.push("/addpost");
            }}
            title="Post"
          />
          {/* <Menu.Item
            leadingIcon="book-open-page-variant"
            onPress={() => {}}
            title="Story"
          /> */}
          <Menu.Item
            leadingIcon="movie-open-play-outline"
            onPress={() => {
              closeMenu();
              router.push("/camera");
            }}
            title="Reel"
          />
        </Menu>
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell-outline" onPress={() => {}} />
        <Appbar.Action icon="email-outline" onPress={() => {}} />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <FeedItem item={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<HeaderStories />}
        />
      </SafeAreaView>
    </View>
  );
};

export default Social;

const styles = StyleSheet.create({
  logo: { height: 40, width: 150 },
  story: {
    fontSize: 14,
    fontWeight: "medium",
    paddingVertical: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  storiesContainer: {
    height: 100,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
  },
});
