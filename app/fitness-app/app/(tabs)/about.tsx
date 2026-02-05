import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <Text style={styles.largeText}>About This Project</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Why I Built This</Text>
          <Text style={styles.bodyText}>
            I made this because I thought it was a cool application of AI. I've
            always been interested in fitness and realized there aren't too many
            automated tools to help people see if what they are doing is
            correct. Many new lifters are afraid to ask about their technique,
            so I figured that this app would give them a little confidence boost
            they need to actually ask experienced lifters to critique their form
            (which is the goal!!!)
          </Text>
        </View>

        <View style={styles.importantCard}>
          <View style={styles.importantHeader}>
            <AntDesign name="info-circle" size={24} color="#64B5F6" />
            <Text style={styles.importantTitle}>Important Reminder</Text>
          </View>
          <Text style={styles.importantText}>
            There is no compromise to advice from an actual experienced human
            being! This is only a starting point and advice should be taken with
            caution and at your discretion only!
          </Text>
        </View>

        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <AntDesign name="warning" size={24} color="#FFA726" />
            <Text style={styles.warningTitle}>Early Alpha Development</Text>
          </View>
          <Text style={styles.warningText}>
            This app is still in very early alpha development. Some results may
            be inaccurate, so take everything that this algorithm gives you with
            a grain of salt!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Open Source</Text>
          <Text style={styles.bodyText}>
            All the code for this project is open source and can be found on the
            following Github link:
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => {
              // Add your GitHub link here when ready
              // Linking.openURL('https://github.com/yourusername/yourrepo');
            }}
          >
            <AntDesign name="github" size={20} color="#667eea" />
            <Text style={styles.linkText}>GitHub Repository</Text>
            <AntDesign name="right" size={16} color="#667eea" />
          </TouchableOpacity>
          <Text style={styles.bodyText}>
            All the technical jargon (if you want to look into that) is
            available in the readme file.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Feedback Welcome!</Text>
          <Text style={styles.bodyText}>
            If you have any suggestions, PLEASE PLEASE PLEASE let me know! Any
            data that will help me improve this will be much appreciated!
          </Text>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerText}>
            Thank you so much for checking out this app! {"<3"}
          </Text>
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
  headerCard: {
    marginBottom: 24,
    paddingTop: 10,
  },
  largeText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
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
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  bodyText: {
    color: "#d0d0d0",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  warningCard: {
    backgroundColor: "#3a2f1f",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FFA726",
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  warningTitle: {
    color: "#FFA726",
    fontSize: 18,
    fontWeight: "600",
  },
  warningText: {
    color: "#e0d0c0",
    fontSize: 16,
    lineHeight: 24,
  },
  importantCard: {
    backgroundColor: "#1f2a3a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#64B5F6",
  },
  importantHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  importantTitle: {
    color: "#64B5F6",
    fontSize: 18,
    fontWeight: "600",
  },
  importantText: {
    color: "#c0d0e0",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1a1d24",
    padding: 14,
    borderRadius: 12,
    marginVertical: 12,
  },
  linkText: {
    color: "#667eea",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  footerCard: {
    backgroundColor: "#2a2f38",
    borderRadius: 16,
    padding: 24,
    marginTop: 8,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
