import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import AxiosInstance from "../Axios.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function FormCheckerScreen() {
  const router = useRouter();
  const [videoResult, setVideoResult] = useState<any>(null); // Video metadata
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>(
    undefined
  ); // Display only
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const pickVideoAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      quality: 1,
    });

    setVideoResult(result);
  };

  const VideoPickerScreen = () => {
    useEffect(() => {
      console.log(videoResult);
      if (
        videoResult != null &&
        videoResult != undefined &&
        !videoResult.canceled
      ) {
        const uri = videoResult.assets[0].uri;
        setSelectedVideo(uri);
        setShowAppOptions(true);
      }
    }, [videoResult]);

    return (
      <View style={styles.pickerContainer}>
        <View style={styles.headerCard}>
          <Text style={styles.largeText}>Ready to check your form?</Text>
          <Text style={styles.subtitleText}>
            Upload your video below to get started with form analysis
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={pickVideoAsync}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <AntDesign name="video-camera" size={24} color="#fff" />
              <Text style={styles.buttonText}>Pick Video</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ProceedScreen = () => {
    const player = useVideoPlayer({ uri: selectedVideo }, (player) => {
      player.staysActiveInBackground = true;
      player.play();
    });

    const submit = async () => {
      console.log("SUBMITTING");
      const guest_id = await GenerateGuestID();
      const asset = videoResult.assets[0];

      setShowLoading(true);

      const formData = new FormData();
      formData.append("user_id", guest_id);
      formData.append("width", String(asset.width));
      formData.append("height", String(asset.height));
      formData.append("frames_cut_per_second", String(5));

      // Web: asset.file is a File/Blob. Mobile: use { uri, type, name } so the server receives the file.
      if (asset.file != null && asset.file !== undefined) {
        formData.append("video_data", asset.file);
      } else {
        formData.append("video_data", {
          uri: asset.uri,
          type: "video/mp4",
          name: "video.mp4",
        } as any);
      }

      try {
        await AxiosInstance.post("api/videos/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });
        console.log("Upload success");
      } catch (error) {
        console.error("Upload failed:", error);
      }

      setShowLoading(false);
      router.push("/results");
    };

    return (
      <View style={styles.videoWrapper}>
        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>Preview Your Video</Text>
          <View style={styles.videoContainer}>
            <VideoView
              player={player}
              style={styles.video}
              allowsPictureInPicture
            />
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={pickVideoAsync}
            activeOpacity={0.8}
          >
            <AntDesign name="reload" size={20} color="#667eea" />
            <Text style={styles.secondaryButtonText}>Pick Another Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={submit}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <AntDesign name="check-circle" size={20} color="#fff" />
              <Text style={styles.buttonText}>Analyze Form</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showAppOptions && selectedVideo != undefined ? (
        <ProceedScreen />
      ) : (
        <VideoPickerScreen />
      )}
      {showLoading == true ? (
        <View>
          <Text style={styles.largeText}>Please wait a moment!</Text>
          <Text style={styles.text}>
            Generating analysis... (You will be redirected to the analysis page
            after it is complete)
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

async function GenerateGuestID() {
  console.log("generating");
  const guest_id = await AsyncStorage.getItem("guest_id");
  console.log(guest_id);
  console.log("B");
  if (guest_id == null || guest_id == undefined) {
    await AsyncStorage.setItem("guest_id", String(uuid.v4()));
    const guest_id = await AsyncStorage.getItem("guest_id");
    console.log("A");
    console.log(guest_id);
    console.log("Success");
    return String(guest_id);
  }
  console.log(guest_id);
  console.log("Outside");
  return String(guest_id);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1d24",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  headerCard: {
    backgroundColor: "#2a2f38",
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  largeText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitleText: {
    color: "#d0d0d0",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  text: {
    color: "#fff",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  primaryButton: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#2a2f38",
    borderWidth: 2,
    borderColor: "#667eea",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#667eea",
    fontSize: 16,
    fontWeight: "600",
  },
  videoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  videoCard: {
    backgroundColor: "#2a2f38",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  videoContainer: {
    width: "100%",
    alignItems: "center",
  },
  video: {
    width:
      Dimensions.get("window").height *
      0.5 *
      (Dimensions.get("window").width / Dimensions.get("window").height),
    height: Dimensions.get("window").height * 0.5,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  actionButtons: {
    width: "100%",
    gap: 16,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingCard: {
    backgroundColor: "#2a2f38",
    borderRadius: 16,
    padding: 32,
    margin: 20,
    alignItems: "center",
    maxWidth: 320,
  },
  loadingTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 12,
    textAlign: "center",
  },
  loadingText: {
    color: "#d0d0d0",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
