import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [query, setQuery] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<any>(null);

  // Animated scan line
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (showCamera) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, { toValue: 100, duration: 2000, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -120, duration: 2000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [showCamera]);

  const handleSearch = async () => {
    try {
      const response = await fetch("https://ravine-sapling-glare.ngrok-free.dev/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query }),
      });
      const data = await response.json();

      router.push({
        pathname: "/result",
        params: {
          category: data.category,
          confidence: data.confidence,
          imageUri: null,
        },
      });
    } catch (error) {
      router.push({ pathname: "/result", params: { category: "Error" } });
    }
  };

  const handleScan = () => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
      return;
    }
    setShowCamera(true);
  };

  const capturePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setShowCamera(false);

      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        name: "waste.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch("https://ravine-sapling-glare.ngrok-free.dev/classify", {
        method: "POST",
        body: formData,
      });

      const raw = await response.text();
      const data = JSON.parse(raw);

      router.push({
        pathname: "/result",
        params: {
          category: data.category,
          confidence: data.confidence,
          imageUri: photo.uri,
        },
      });
    } catch (error: any) {
      router.push({ pathname: "/result", params: { category: "Error" } });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="leaf" size={28} color="#4CAF50" />
        <Text style={styles.headerText}>Eco Sort</Text>
      </View>

      {/* Gradient Card */}
      <LinearGradient
        colors={['#4CAF50', '#81C784']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>Welcome back!</Text>
        <Text style={styles.cardText}>
          Start sorting waste, check your results, or play games to earn points.
        </Text>
      </LinearGradient>

      
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Ionicons name="camera" size={40} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.scanText}>Tap to scan waste item</Text>

      

      {/* Quick Action Row */}
      <View style={styles.actionRow}>
      <TouchableOpacity
  style={[styles.actionCard, { backgroundColor: '#E8F0FE' }]}
  onPress={() => router.push({ pathname: "/history", params: { bin: "Recycle" } })}
>
  <Ionicons name="sync" size={24} color="#2563EB" />
  <Text style={[styles.actionText, { color: '#2563EB' }]}>Recycle</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.actionCard, { backgroundColor: '#E9FBEA' }]}
  onPress={() => router.push({ pathname: "/history", params: { bin: "Compost" } })}
>
  <Ionicons name="leaf" size={24} color="#16A34A" />
  <Text style={[styles.actionText, { color: '#16A34A' }]}>Compost</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.actionCard, { backgroundColor: '#FEECEC' }]}
  onPress={() => router.push({ pathname: "/history", params: { bin: "Landfill" } })}
>
  <Ionicons name="trash" size={24} color="#DC2626" />
  <Text style={[styles.actionText, { color: '#DC2626' }]}>Landfill</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.actionCard, { backgroundColor: '#FFF7E6' }]}
  onPress={() => router.push({ pathname: "/history", params: { bin: "Hazardous" } })}
>
  <Ionicons name="flame" size={24} color="#f5320b" />
  <Text style={[styles.actionText, { color: '#F59E0B' }]}>Hazardous</Text>
</TouchableOpacity>
</View>


      {showCamera && (
        <CameraView style={StyleSheet.absoluteFillObject} ref={cameraRef}>
          {/* Scanner overlay */}
          <View style={styles.overlay}>
            <View style={styles.scanBox}>
              <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
            </View>
          </View>

          {/* Tap anywhere to scan */}
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={capturePhoto} />

          {/* Close button */}
          <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.closeButton}>
            <Text style={{ color: 'white', fontSize: 18 }}>x</Text>
          </TouchableOpacity>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, alignItems: 'center' },
  card: { padding: 15, borderRadius: 10, marginBottom: 50,marginTop:20 },
  cardTitle: { fontSize: 20, fontWeight: '600', marginBottom: 5, color: '#fff' },
  cardText: { fontSize: 16, color: '#f0f0f0' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 20 },
  headerText: { fontSize: 30, fontWeight: '700', marginLeft: 10, color: '#333' },
  scanButton: {
    backgroundColor: '#4CAF50', width: 120, height: 120, borderRadius: 60,
    justifyContent: 'center', alignItems: 'center', marginBottom: 30,
  },
  scanText: { textAlign: 'center', fontSize: 16, color: '#555', marginBottom: 30 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  actionCard: { width: 75, height: 50, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  actionText: { fontSize: 10, fontWeight: '600', marginTop: 5 },
  closeButton: { position: 'absolute', top: 20, right: 20 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanBox: {
    width: 250, height: 250, borderWidth: 2, borderColor: 'white',
    borderRadius: 10, justifyContent: 'center', alignItems: 'center',
  },
  scanLine: {
    width: '100%', height: 2, backgroundColor: 'red', opacity: 0.7,
  },
});