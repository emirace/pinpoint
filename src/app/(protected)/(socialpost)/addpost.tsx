import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Image } from "expo-image";
import Button from "@/src/components/Button";
import TextInput from "@/src/components/TextInput";

const detail = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Create Social Post" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Image
            style={styles.mediaBackground}
            source={require("../../../../assets/images/feeds/feed1.png")}
            contentFit="cover"
            transition={1000}
          />
          <View style={[styles.countCont, { backgroundColor: colors.primary }]}>
            <Text style={styles.count}>2</Text>
          </View>
        </View>
        <Text style={{ fontSize: 18, marginVertical: 5 }}>Description</Text>
        <TextInput
          inputStyle={styles.textinput}
          multiline={true}
          numberOfLines={4}
        />
        <Button>Upload</Button>
      </ScrollView>
    </View>
  );
};

export default detail;

const styles = StyleSheet.create({
  content: { padding: 20 },
  mediaBackground: {
    height: 450,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  countCont: {
    position: "absolute",
    bottom: 20,
    right: 10,
    zIndex: 10,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  count: { color: "white" },
  textinput: { height: 100, paddingVertical: 10 },
});
