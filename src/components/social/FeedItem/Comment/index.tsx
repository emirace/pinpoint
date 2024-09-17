import React, { useRef, useState, ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Comment as IComment } from "@/src/types/comment";
import Comment from "./Comment";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

const comments: IComment[] = [
  {
    id: "1",
    username: "Username",
    content:
      "Lorem ipsum dolor sit amet, consectetur adip Ut enim ad minim veniam, quis",
    likes: 10,
    time: "1d",
    replies: [
      {
        id: "1-1",
        username: "Username",
        content:
          "Lorem ipsum dolor sit amet, ctetur adip Ut enim ad minim veniam, uis",
        likes: 10,
        time: "1d",
      },
    ],
  },
  {
    id: "2",
    username: "Username",
    content:
      "Lorem ipsum dolor sit amet, consectetur adip Ut enim ad minim veniam, quis",
    likes: 10,
    time: "1d",
    replies: [],
  },
  {
    id: "3",
    username: "Username",
    content:
      "Lorem ipsum dolor sit amet, consectetur adip Ut enim ad minim veniam, quis",
    likes: 10,
    time: "1d",
    replies: [
      {
        id: "3-1",
        username: "Username",
        content:
          "Lorem ipsum dolor sit amet, ctetur adip Ut enim ad minim veniam, uis",
        likes: 10,
        time: "1d",
      },
    ],
  },
];

interface Props {
  buttonStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
}
const CommentModal: React.FC<Props> = ({ buttonStyle, icon }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isReplying, setIsReplying] = useState<string | null>(null);

  const openSheet = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.present();
    }
  };
  return (
    <>
      <TouchableOpacity
        style={[styles.actionButton, buttonStyle]}
        onPress={openSheet}
      >
        {icon ? (
          icon
        ) : (
          <Ionicons name="chatbubble-outline" size={24} color="black" />
        )}
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        enableOverDrag={false}
        index={0}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.headerText}>23 Comments</Text>
          <BottomSheetFlatList
            data={comments}
            renderItem={({ item }) => (
              <Comment comment={item} isReplying={setIsReplying} />
            )}
            keyExtractor={(item) => item.id}
            style={{ paddingHorizontal: 16 }}
          />
          <View
            style={{
              paddingHorizontal: 16,
              borderTopWidth: 1,
              borderColor: "#ddd",
              paddingVertical: 8,
            }}
          >
            {isReplying ? (
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text>
                  Replying to{" "}
                  <Text style={{ fontWeight: "600" }}>{isReplying}</Text>
                </Text>
                <Ionicons
                  name="close"
                  size={18}
                  onPress={() => setIsReplying(null)}
                />
              </View>
            ) : null}
            <View style={styles.inputContainer}>
              <Image
                source={require("../../../../../assets/images/user1.png")}
                style={styles.avatar}
              />
              <View style={styles.inputCont}>
                <TextInput
                  style={styles.input}
                  placeholder="Add your comment..."
                  placeholderTextColor={"gray"}
                />
                <TouchableOpacity style={styles.sendButton}>
                  <Ionicons name="send" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
    flex: 1,
  },
  actionButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "medium",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  inputCont: {
    flex: 1,
    borderRadius: 20,
    height: "100%",
    borderColor: "#f0f0f0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    height: "100%",
    fontSize: 16,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonText: {
    fontSize: 18,
    color: "#007bff",
  },
});

export default CommentModal;
