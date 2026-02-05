import React, { useState, useEffect } from "react";
import AxiosInstance from "./Axios.js";
import { Button, TouchableOpacity } from "react-native";
import { Float, Int32 } from "react-native/Libraries/Types/CodegenTypes";
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const scores_dict = {
  20: "Perfect!",
  50: "Great!",
  80: "Good!",
  120: "OK",
};

const colours_dict = {
  "Perfect!": "#3bff48",
  "Great!": "#80ff3b",
  "Good!": "#b7ff3b",
  OK: "#ffef3b",
};

function scoreToLabel(score: Float) {
  for (let key in scores_dict) {
    console.log(score);
    if (score <= (key as unknown as Float)) {
      return scores_dict[key as unknown as keyof typeof scores_dict];
    }
  }
  return "Needs improvement...";
}

const DynamicSize = ({ source }: { source: string }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Image.getSize(source, (width, height) => {
      setWidth(width);
      setHeight(height);
    });
  }, [source]);

  return (
    <Image
      source={{ uri: source }}
      style={{
        width: width / 2,
        height: height / 2,
      }}
    />
  );
};

const AccordionBody = ({ kv_pair, data }: { kv_pair: any; data: any }) => {
  return (
    <View style={styles.accordionBody}>
      <Text style={styles.infoText}>{data["squat"][kv_pair[0]].info}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Deviation Score:</Text>
        <Text style={styles.scoreValue}>{Math.round(kv_pair[1])}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <DynamicSize
          source={`https://raw.githubusercontent.com/12EricB12/Form-Checker/refs/heads/main/squat/${kv_pair[0]}.jpg`}
        />
      </View>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => Linking.openURL(`${data["squat"][kv_pair[0]].link}`)}
      >
        <AntDesign name="link" size={16} color="#667eea" />
        <Text style={styles.linkText}>Learn more about this aspect</Text>
        <AntDesign name="right" size={14} color="#667eea" />
      </TouchableOpacity>
    </View>
  );
};

const Accordion = ({ kv_pair, data }: { kv_pair: any; data: any }) => {
  const [showContent, setShowContent] = useState<boolean | boolean>(false);

  const scoreLabel = scoreToLabel(kv_pair[1]);
  const scoreColor =
    typeof colours_dict[scoreLabel as keyof typeof colours_dict] != "undefined"
      ? colours_dict[scoreLabel as keyof typeof colours_dict]
      : "#FF4444";

  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setShowContent(!showContent)}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <Text style={styles.accordionTitle}>
            {data["squat"][kv_pair[0]].title}
          </Text>
          <View
            style={[
              styles.scoreBadge,
              { backgroundColor: scoreColor + "20", borderColor: scoreColor },
            ]}
          >
            <Text style={[styles.scoreBadgeText, { color: scoreColor }]}>
              {scoreLabel}
            </Text>
          </View>
        </View>
        <AntDesign name={showContent ? "up" : "down"} size={24} color="#fff" />
      </TouchableOpacity>
      {showContent && <AccordionBody kv_pair={kv_pair} data={data} />}
    </View>
  );
};

function AAAA({ results }: { results: any }) {
  if (results != undefined) {
    // Depends on the first two entries being the django assigned id and the user_id tag
    const [currentIndex, setCurrentIndex] = useState(0);

    const w = Object.entries(results.results)[2][1];
    console.log("NOT UNDEFINED");
    const images = Object.values(results.results.analyzed_images);
    console.log(images);
    const keys = Object.keys(Object.values(w[0]));
    const kv = Object.entries(w[currentIndex]);
    const guide_photo_path = "../guide_photos/squat"; // Replace squat with model prediction later
    console.log(images);

    const data = require("./movement_info.json");
    const listValues = kv.map((key) => (
      <View key={key[0]}>
        {/* <h1
          style={{
            color:
              typeof colours_dict[
                scoreToLabel(key[1]) as keyof typeof colours_dict
              ] != "undefined"
                ? colours_dict[
                    scoreToLabel(key[1]) as keyof typeof colours_dict
                  ]
                : "#FF0000",
          }}
        >
          {data["squat"][key[0]].title}: {scoreToLabel(key[1])}
        </h1>
        <text style={{ fontSize: 24 }}>{data["squat"][key[0]].info}</text>
        <br />
        <text style={{ fontSize: 18, color: "gray" }}>
          Your deviation score: {Math.round(key[1])}
        </text>
        <DynamicSize
          source={`https://raw.githubusercontent.com/12EricB12/Form-Checker/refs/heads/main/squat/${key[0]}.jpg`}
        />
        <a href={data["squat"][key[0]].link}>
          Check out the image source for more info!
        </a>
        <br /> */}
        <Accordion data={data} kv_pair={key}></Accordion>
      </View>
    ));

    const ImageValues = (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageScrollView}
        contentContainerStyle={styles.imageScrollContent}
      >
        {images.map((image: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log(index);
              setCurrentIndex(index);
            }}
            style={[
              styles.imageThumbnail,
              currentIndex === index && styles.imageThumbnailActive,
            ]}
          >
            <DynamicSize source={`data:image/jpeg;base64,${image}`} />
            {currentIndex === index && (
              <View style={styles.selectedIndicator}>
                <AntDesign name="check-circle" size={20} color="#667eea" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );

    console.log(images[0]);
    return (
      <View style={styles.resultsContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.resultsTitle}>Form Analysis Results</Text>
          <Text style={styles.resultsSubtitle}>
            Key positions captured during your movement:
          </Text>
        </View>
        {ImageValues}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <AntDesign name="info-circle" size={20} color="#64B5F6" />
            <Text style={styles.infoText}>What am I looking at?</Text>
          </View>
          <Text style={[styles.infoDescription, { marginBottom: 10 }]}>
            Tap on any image above to see detailed analysis for that position.
            Each section below provides feedback on different aspects of your
            form.
          </Text>
          <Text style={styles.infoDescription}>
            The blue dots represent where the model thinks your joints are. If
            they look really off, please submit with a better video. See the
            first page for more information!
          </Text>
        </View>
        <View style={styles.accordionContainer}>{listValues}</View>
      </View>
    );
  }
  return (
    <View>
      <Text>aaa</Text>
    </View>
  );
}

export default function ResultsScreen() {
  const [results, setResults] = useState<any | any>();

  useEffect(() => {
    const fetchData = async () => {
      let guestId = await AsyncStorage.getItem("guest_id");

      // Perform check
      if ((results == undefined || results == null) && guestId) {
        AxiosInstance.get("api/analysis/get", {
          params: {
            user_id: guestId,
          },
        }).then((response) => {
          setResults({ results: response.data });
        });
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#1a1d24", "#2a2f38", "#1a1d24"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <AAAA results={results} />
        </LinearGradient>
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
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  resultsContainer: {
    flex: 1,
  },
  headerSection: {
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  resultsSubtitle: {
    fontSize: 16,
    color: "#d0d0d0",
    lineHeight: 24,
  },
  imageScrollView: {
    marginVertical: 20,
  },
  imageScrollContent: {
    paddingVertical: 10,
  },
  imageThumbnail: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  imageThumbnailActive: {
    borderColor: "#667eea",
  },
  selectedIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 4,
  },
  infoSection: {
    backgroundColor: "#2a2f38",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#64B5F6",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64B5F6",
  },
  infoDescription: {
    fontSize: 14,
    color: "#d0d0d0",
    lineHeight: 20,
  },
  accordionContainer: {
    gap: 16,
  },
  sectionCard: {
    backgroundColor: "#2a2f38",
    borderRadius: 16,
    padding: 0,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
  },
  scoreBadgeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  accordionBody: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: "#1f2529",
  },
  bodyInfoText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 12,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#2a2f38",
    borderRadius: 8,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#d0d0d0",
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  imageWrapper: {
    marginVertical: 16,
    borderRadius: 12,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: "#1a1d24",
    borderRadius: 8,
  },
  linkText: {
    color: "#667eea",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
});
