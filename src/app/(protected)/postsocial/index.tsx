import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Button from "@/src/components/Button";

const PostSocial = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [isVideoMode, setIsVideoMode] = useState(true);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      requestPermission();
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleRecord = async () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
    } else {
      if (cameraRef.current) {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        setIsRecording(false);
        if (video) {
          Alert.alert(
            "Video Recorded",
            "Your video has been recorded successfully!",
            [{ text: "OK" }]
          );
          console.log(video.uri);
        }
      }
    }
  };

  const handleCapturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo) return;
      console.log(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log("Open gallery")}
          >
            <Ionicons name="image-outline" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.captureButton,
              isRecording && { backgroundColor: "red" },
            ]}
            onPress={isVideoMode ? handleRecord : handleCapturePhoto}
          >
            <Ionicons
              name={
                isRecording
                  ? "stop-circle"
                  : isVideoMode
                  ? "videocam"
                  : "camera"
              }
              size={50}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsVideoMode(!isVideoMode)}
          >
            <MaterialIcons
              name={isVideoMode ? "photo-camera" : "videocam"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default PostSocial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
  },
  captureButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    padding: 15,
  },
});
