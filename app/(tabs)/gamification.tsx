import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Summary() {
  type BinType = "Recycle" | "Compost" | "Landfill" | "Hazardous";

  const [counts, setCounts] = useState<Record<BinType, number>>({
    Recycle: 0,
    Compost: 0,
    Landfill: 0,
    Hazardous: 0,
  });

  const loadCounts = async () => {
    const data = await AsyncStorage.getItem("sortHistory");
    const items = data ? JSON.parse(data) : [];

    const newCounts: Record<BinType, number> = {
      Recycle: 0,
      Compost: 0,
      Landfill: 0,
      Hazardous: 0,
    };

    items.forEach((i: { bin: BinType }) => {
      newCounts[i.bin] += 1;
    });

    setCounts(newCounts);
  };

  
  useFocusEffect(
    useCallback(() => {
      loadCounts();
    }, [])
  );

  const summaryData = [
    { label: "♻️ Recycle", count: counts.Recycle, color: "#7ac3ff" },
    { label: "🌱 Compost", count: counts.Compost, color: "#90f7b6" },
    { label: "🗑️ Landfill", count: counts.Landfill, color: "#f28b82" },
    { label: "⚠️ Hazardous", count: counts.Hazardous, color: "#f8bf5c" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sorting Summary</Text>
      {summaryData.map((item) => (
        <View key={item.label} style={[styles.card, { backgroundColor: item.color }]}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.count}>{item.count} items</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 43,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 18, fontWeight: "600", color: "#333" },
  count: { fontSize: 18, fontWeight: "700", color: "#fff" },
});
