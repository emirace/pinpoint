import { Modal, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Checkbox, Divider, TextInput, useTheme } from "react-native-paper";
import Button from "@/src/components/Button";
import { router } from "expo-router";
import LeadsModal from "@/src/components/partner/leads/LeadModal";
import { Feather, Ionicons } from "@expo/vector-icons";

const data = [
  {
    id: "1",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "2",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "3",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "4",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
  {
    id: "5",
    name: "Location name",
    address: "bbbdd",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipird elit, sed do eiusmod tempor incididunt ut labore et e.",
  },
];
const Location = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button
          containerStyle={{ width: 150 }}
          onPress={() => router.push("/locations/setup")}
        >
          Add Location
        </Button>
        <Divider style={{ marginVertical: 20 }} />

        {/* Search Input */}
        <TextInput
          mode="outlined"
          placeholder="Search"
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
          outlineStyle={{
            borderColor: colors.outlineVariant,
            borderRadius: 10,
          }}
        />

        {/* Table Rows */}
        <ScrollView style={styles.body}>
          {data.map((item) => (
            <View style={styles.card} key={item.id}>
              <View style={styles.head}>
                <View style={styles.row}>
                  <Image
                    source={require("../../../../../assets/images/location.png")}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={{}}>
                    <Text style={styles.headerText}>Boulevard</Text>
                    <Text>Blvd</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Feather name="edit" size={24} color="gray" />
                  <Feather name="trash-2" size={24} color="red" />
                </View>
              </View>
              <Text>
                <Text style={{ fontWeight: "500" }}>Description:</Text> Lorem
                ipsum dolor sit amet, cons adipird elit, sed do eiusmod tempor
                incididunt ut labore et e.
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 5,
    padding: 15,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  body: {
    flex: 1,
  },
  image: {
    width: 70,
    height: 50,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 5,
  },
});
