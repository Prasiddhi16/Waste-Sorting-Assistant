import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function History() {
  const { bin } = useLocalSearchParams<{ bin: string }>();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("sortHistory");
      const allItems = data ? JSON.parse(data) : [];
      setItems(allItems.filter((i: any) => i.bin === bin));
    })();
  }, [bin]);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {bin} History
      </Text>
      {items.length === 0 ? (
        <Text>No items sorted yet.</Text>
      ) : (
        items.map((item, idx) => (
          <View key={idx} style={{ marginBottom: 15 }}>
            {item.imageUri && (
              <Image
                source={{ uri: item.imageUri }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
            )}
            <Text>{item.category} ({Math.round(item.confidence * 100)}%)</Text>
            <Text style={{ color: "#666" }}>
              {new Date(item.timestamp).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
