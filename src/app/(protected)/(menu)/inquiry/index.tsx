import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { Appbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Section from "@/src/components/menu/inquiry/Section";

const inquiry = () => {
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ borderBottomWidth: 1, borderBottomColor: "#f1f1f1" }}
      >
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Inquires" />
      </Appbar.Header>
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <Section headerName="Pending Inquiries" data={[1, 2, 3]} />
        <Section headerName="Active Inquiries" data={[]} />
        <Section headerName="Completed Inquiries" data={[1, 2, 3]} />
      </ScrollView>
    </View>
  );
};

export default inquiry;

const styles = StyleSheet.create({});
