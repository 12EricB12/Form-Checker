import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import * as Video from "expo-video";

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.introText}>
            Want to check your form? Go into the "Form Checker" tab below to
            upload a video and get started!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>How It Works</Text>
          <Text style={styles.bodyText}>
            The program will automatically decide which exercise you are doing
            and profile it's looking at (ex. front, side) and will critique your
            form as "nicely" as it can.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Exercises</Text>
          <Text style={styles.exerciseText}>
            Bench Press • Squat • Deadlift
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            📸 Here's how to get the best results out of this app...
          </Text>

          <View style={styles.tipSection}>
            <Text style={styles.tipTitle}>Avoid weird angles</Text>
            <Text style={styles.bodyText}>
              Avoid taking videos at weird heights or angles.
            </Text>
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.goodExampleLabel}>
              ✅ Examples of good angles/heights:
            </Text>
            <View style={styles.imageRow}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source="https://raw.githubusercontent.com/12EricB12/Form-Checker/refs/heads/main/guide_photos/good_angle_squat_front.jpg"
                  contentFit="cover"
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={
                    "https://raw.githubusercontent.com/12EricB12/Form-Checker/refs/heads/main/guide_photos/good_angle_squat_side.jpg"
                  }
                  contentFit="cover"
                />
              </View>
            </View>
          </View>

          <View style={styles.imageSection}>
            <Text style={styles.badExampleLabel}>
              ❌ Example of bad angles/heights:
            </Text>
            <View style={styles.imageRow}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={
                    "https://raw.githubusercontent.com/12EricB12/Form-Checker/refs/heads/main/guide_photos/bad_angle_squat.jpg"
                  }
                  contentFit="cover"
                />
              </View>
            </View>
          </View>

          <View style={styles.tipSection}>
            <Text style={styles.tipTitle}>Slow, controlled movements</Text>
            <Text style={styles.bodyText}>
              Avoid sudden, fast movement! Submit slow, controlled movements
              instead. We may be able to process the video, but it will take
              much longer.
            </Text>
          </View>

          <View style={styles.tipSection}>
            <Text style={styles.tipTitle}>Keep joints visible</Text>
            <Text style={styles.bodyText}>
              Avoid covering any joints that are key to the movement. (For
              example, a squat mainly centers around the legs, so it's important
              that those aren't obstructed or else the analysis may not be
              accurate or may not happen at all). Better results if everything
              is uncovered, like the example images above.
            </Text>
          </View>

          <View style={styles.tipSection}>
            <Text style={styles.tipTitle}>Trim your video</Text>
            <Text style={styles.bodyText}>
              Try your best to only include the key parts of your lift! If you
              spend time setting up the bar, reracking the weights, etc, try to
              cut it out of the video. There may be a chance the video is
              rejected for going over the file size, or inaccurate analysis may
              occur.
            </Text>
          </View>

          <View style={styles.tipSection}>
            <Text style={styles.tipTitle}>Stay on the app</Text>
            <Text style={styles.bodyText}>
              Stay on the tab/app while the analysis is happening. Don't wipe
              your cookies or mess with your app storage/local storage while
              analysis is running (we won't know who to return it to)!
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1d24",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 24,
    paddingTop: 10,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
  },
  introText: {
    color: "#e0e0e0",
    fontSize: 18,
    lineHeight: 26,
  },
  card: {
    backgroundColor: "#2a2f38",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  bodyText: {
    color: "#d0d0d0",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  exerciseText: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "600",
  },
  tipSection: {
    marginBottom: 20,
  },
  tipTitle: {
    color: "#64B5F6",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  imageSection: {
    marginBottom: 24,
  },
  goodExampleLabel: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  badExampleLabel: {
    color: "#F44336",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  imageRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 180,
    width: 160,
    backgroundColor: "#333",
  },
});
