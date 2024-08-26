import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Menu } from "react-native-paper";

const Share = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu} style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={24} color="black" />
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      mode="flat"
    >
      <Text style={{ marginBottom: 10, textAlign: "center" }}>Share to</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          padding: 5,
          paddingLeft: 15,
          maxWidth: 300,
        }}
      >
        <FlatList
          data={[1, 2, 3, 4]}
          ListHeaderComponent={() => (
            <View style={{ alignItems: "center", marginRight: 18 }}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: "#e1e1e1",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Ionicons name="link-outline" size={20} />
              </View>
              <Text style={{ fontSize: 12 }}>Copy Link</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", marginRight: 18 }}>
              <Image
                source={require("../../../../assets/images/user1.png")}
                style={styles.avatar}
              />
              <Text style={{ fontSize: 12 }}>Username</Text>
            </View>
          )}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Menu>
  );
};

export default Share;

const styles = StyleSheet.create({
  actionButton: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
});
