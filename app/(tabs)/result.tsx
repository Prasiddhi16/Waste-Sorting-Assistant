import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Explicitly type your params
type ResultParams = {
  category?: string;
  confidence?: string;
  imageUri?: string;
};

export default function Results() {
  // Map detailed categories into bins
  const categoryMap: Record<string, "Recycle" | "Compost" | "Landfill" | "Hazardous"> = {
    Cardboard: "Recycle",
    Paper: "Recycle",
    Plastic: "Recycle",
    Glass: "Recycle",
    Metal: "Recycle",

    "Food Organics": "Compost",
    Vegetation: "Compost",

    "Textile Trash": "Landfill",
    "Miscellaneous Trash": "Landfill",
  };

  const binStyles: Record<string, any> = {
    Recycle: {
      backgroundColor: "#7ac3ff",
      icon: "repeat",
      subtitle: "Recyclable",
      tips: [
        "Remove caps and lids",
        "Rinse containers",
        "Flatten boxes to save space",
        "Labels can stay on",
      ],
    },
    Compost: {
      backgroundColor: "#90f7b6",
      icon: "leaf",
      subtitle: "Compostable",
      tips: [
        "Keep food scraps separate",
        "Avoid plastics or metals",
        "Add dry leaves for balance",
      ],
    },
    Landfill: {
      backgroundColor: "#a23b3b",
      icon: "trash",
      subtitle: "Landfill Waste",
      tips: [
        "Dispose in sealed bags",
        "Avoid mixing with recyclables",
        "Reduce usage where possible",
      ],
    },
    Hazardous: {
      backgroundColor: "#f8bf5c",
      icon: "flame",
      subtitle: "Hazardous Material",
      tips: [
        "Handle with care",
        "Do not mix with regular trash",
        "Take to a hazardous waste facility",
      ],
    },
  };

  // Use typed params
  const { category, confidence, imageUri } = useLocalSearchParams<ResultParams>();

  const categoryStr = category || "";
  const confidenceValue = confidence ? parseFloat(confidence) : 0;
  const imageUriStr = imageUri || "";

  // Map detailed category to bin
  const bin = categoryStr ? categoryMap[categoryStr] || "Landfill" : null;
  const styleConfig = bin ? binStyles[bin] : null;

  const handleMarkAsSort = async () => {
    if (!bin) return;

    const sortedItem = {
      category: categoryStr,
      bin,
      imageUri: imageUriStr,
      confidence: confidenceValue,
      timestamp: Date.now(),
    };

    try {
      const existing = await AsyncStorage.getItem("sortHistory");
      const items = existing ? JSON.parse(existing) : [];

      items.push(sortedItem);

      await AsyncStorage.setItem("sortHistory", JSON.stringify(items));

      alert(`Stored in ${bin} history!`);
    } catch (err) {
      console.error("Error saving sort history", err);
    }
  };

  if (!categoryStr) {
    return (
      <View style={styles.defaultContainer}>
        <Ionicons name="leaf" size={50} color="#4CAF50" />
        <Text style={styles.defaultTitle}>No scan yet</Text>
        <Text style={styles.defaultText}>
          Start by scanning an item .
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50", marginTop: 20 }]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="leaf" size={28} color="#4CAF50" />
        <Text style={styles.headerText}>Scan Result</Text>
      </View>

      {/* Show captured photo */}
      {imageUriStr && (
        <Image
          source={{ uri: imageUriStr }}
          style={styles.resultImage}
          resizeMode="contain"
        />
      )}

      {/* Dynamic Result Card */}
      <View style={[styles.card, { backgroundColor: styleConfig.backgroundColor }]}>
        <View style={styles.cardHeader}>
          <Ionicons name={styleConfig.icon as any} size={28} color="#fff" />
          <Ionicons name="checkmark-circle" size={28} color="#fff" />
        </View>

        <Text style={styles.cardTitle}>{categoryStr}</Text>
        <Text style={styles.cardSubtitle}>{styleConfig.subtitle}</Text>
        <Text style={styles.cardConfidence}>
          {Math.round(confidenceValue * 100)}% confident
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${confidenceValue * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Dynamic Tips */}
      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>{styleConfig.subtitle} Tips</Text>
        {styleConfig.tips.map((tip: string, idx: number) => (
          <Text key={idx} style={styles.tip}>• {tip}</Text>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Scan Another</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2563EB" }]}
          onPress={handleMarkAsSort}
        >
          <Text style={styles.buttonText}>Mark as Sort</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContent: { padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 24, fontWeight: "700", marginLeft: 10, color: "#333" },
  resultImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#afb2b9",
    resizeMode: "cover",
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#fff" },
  cardSubtitle: { fontSize: 16, color: "#342731", marginTop: 4 },
  cardConfidence: { fontSize: 14, color: "#052b4b", marginTop: 8 },
  progressBar: {
    height: 8,
    backgroundColor: "#90CAF9",
    borderRadius: 4,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0D47A1",
  },
  tipsBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    elevation: 2,
  },
  tipsTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  tip: { fontSize: 14, color: "#444", marginBottom: 5 },
  actions: { flexDirection: "row", justifyContent: "space-around", marginBottom: 40 },
  button: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  // Default page styles
  defaultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  defaultTitle: { fontSize: 24, fontWeight: "700", marginTop: 10, color: "#333" },
  defaultText: { fontSize: 16, color: "#555", marginTop: 10, textAlign: "center" },
});
