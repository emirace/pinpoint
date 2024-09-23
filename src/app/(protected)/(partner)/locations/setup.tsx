import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  Divider,
  TextInput,
  useTheme,
  Button as PaperButton,
} from "react-native-paper";
import Button from "@/src/components/Button";
import MultiSelect from "@/src/components/select/MultiSelect";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import HoursOfOperation from "@/src/components/partner/location/HoursOfOperation";
import useDimensions from "@/src/hooks/useDimension";

const categoriesOption = [
  { label: "Clothing", value: "clothing" },
  { label: "Electronic", value: "electronic" },
];
const Location = () => {
  const { colors } = useTheme();
  const { isMobile } = useDimensions();
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<(string | number)[]>([]);
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <>
          <Text style={styles.breadcrum}>
            <Text style={{ color: colors.primary, fontWeight: "500" }}>
              Dashboard
            </Text>{" "}
            / Location
          </Text>
          <View style={styles.headerCont}>
            <Text style={styles.heading}>Location Setup</Text>
            <Button containerStyle={{ width: 100 }}>Save</Button>
          </View>
        </>
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.photoLabel}>Add a photo of your Location</Text>
        <View
          style={[styles.row, { flexDirection: isMobile ? "column" : "row" }]}
        >
          <View style={[styles.leftCont, !isMobile && { flex: 2 }]}>
            <View style={styles.imageButton}>
              <View
                style={[
                  styles.imageCircle,
                  { backgroundColor: colors.elevation.level4 },
                ]}
              >
                <Image
                  source={require("../../../../../assets/images/logo1.png")}
                  style={[{ height: 35, width: 30, marginTop: 10 }]}
                  resizeMode="contain"
                />
                {Platform.OS !== "web" && (
                  <AntDesign
                    name="edit"
                    size={20}
                    color="white"
                    style={{
                      backgroundColor: "black",
                      borderRadius: 10,
                      padding: 5,
                      overflow: "hidden",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                  />
                )}
              </View>
            </View>
            {Platform.OS === "web" && (
              <View style={[styles.row, { gap: 10 }]}>
                <Button
                  containerStyle={styles.photoButton}
                  textStyle={{ color: "black" }}
                  variant="outlined"
                >
                  Replace Photo
                </Button>
                <Button
                  containerStyle={styles.photoButton}
                  textStyle={{ color: "black" }}
                  variant="outlined"
                >
                  Remove
                </Button>
              </View>
            )}
          </View>
          <View style={[styles.rightCont, !isMobile && { flex: 3 }]}>
            <TextInput
              mode="outlined"
              label="Location Name"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />

            <TextInput
              mode="outlined"
              label="Address"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Location Description"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ marginBottom: 20, height: 100 }}
              multiline
              numberOfLines={3}
              maxLength={100}
            />
            <MultiSelect
              onValuesChange={(value) => setCategory(value)}
              options={categoriesOption}
              placeholder="Location Categories"
            />
            <Divider style={{ marginVertical: 20 }} />
            <Text style={styles.photoLabel}>Menu</Text>
            <View>
              <TextInput
                mode="outlined"
                label="Category"
                // value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
              <View style={styles.addCategory}>
                <Ionicons name="add" size={20} />
                <Text style={{ fontWeight: "500" }}>Add Category</Text>
              </View>
            </View>
            <View>
              {["Men Shirt", "Short", "Women Shirts", "Jaclet"].map((item) => (
                <View style={styles.menu} key={item}>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <MaterialIcons name="drag-indicator" size={20} />
                    <Text>{item}</Text>
                  </View>
                  <Ionicons name="trash-outline" size={20} color="red" />
                </View>
              ))}
              {/* <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <PaperButton mode="text" icon={"plus"}>
                  Add Menu
                </PaperButton>
              </View> */}
            </View>
            <Divider style={{ marginVertical: 20 }} />
            <Text style={styles.photoLabel}>Hours of operation</Text>
            <HoursOfOperation />
            <Divider style={{ marginVertical: 20 }} />
            <Text style={styles.photoLabel}>Add Poll</Text>
            <TextInput
              mode="outlined"
              label="Question"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Option 1"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Option 2"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Option 3"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Option 4"
              // value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            {/* <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <PaperButton mode="text" icon={"plus"}>
                Save Poll
              </PaperButton>
            </View> */}
          </View>
        </View>
        <Button containerStyle={{}}>Save</Button>
      </ScrollView>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  breadcrum: { marginBottom: 30 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  content: {
    backgroundColor: "white",
    padding: 15,
  },
  photoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 30,
  },
  leftCont: {},
  rightCont: {},
  imageButton: {
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    marginBottom: 10,
  },
  imageCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 100,
    minWidth: 100,
    borderWidth: 3,
    borderColor: "white",
  },
  photoButton: {
    backgroundColor: "white",
    flex: 1,
  },

  input: {
    marginBottom: 20,
    height: 50,
  },
  addCategory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    right: 10,
    top: 16,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  menu: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});
