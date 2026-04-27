import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [query, setQuery] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<any>(null);
 

  const handleSearch = async () => {
    try {
     const response = await fetch("http://192.168.1.68:8000/classify", 
 {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: query }),
      });
      const data = await response.json();
      console.log("Backend response:", data);  
      Alert.alert("Result", `Category: ${data.category}`);
    } catch (error) {
      Alert.alert("Error", "Could not connect to backend");
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
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setShowCamera(false);
      Alert.alert("Captured", `Photo saved at: ${photo.uri}`);
      // Later: send photo.uri to backend for identification
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
        colors={['#4CAF50', '#81C784']} // dark → light green
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.cardTitle}>Welcome back!</Text>
        <Text style={styles.cardText}>
          Start sorting waste, check your results, or play games to earn points.
        </Text>
      </LinearGradient>

      {/* Scan Button */}
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Ionicons name="camera" size={40} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.scanText}>Tap to scan waste item</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type or speak item name..."
          value={query}                 // connect to state
          onChangeText={setQuery}       // update state when typing
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {showCamera && (
        <CameraView
          style={StyleSheet.absoluteFillObject} 
          ref={cameraRef}
          
        >
          <TouchableOpacity onPress={capturePhoto}
             style={styles.captureOuter}
>
  <View style={styles.captureInner} />
</TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowCamera(false)}
            style={styles.closeButton}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>x</Text>
          </TouchableOpacity>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, flexDirection: 'column', alignItems: 'center' },
  card: { padding: 15, borderRadius: 10, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: '600', marginBottom: 5, color: '#fff' },
  cardText: { fontSize: 16, color: '#f0f0f0' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 20 },
  headerText: { fontSize: 30, fontWeight: '700', marginLeft: 10, color: '#333' },
  scanButton: {
    backgroundColor: '#4CAF50',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 60,
  },
  scanText: { textAlign: 'center', fontSize: 16, color: '#555', marginBottom: 30 },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 10 },
  searchIcon: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    padding: 5,
    marginLeft: 10,
  },
  captureOuter: {
  position: 'absolute',
  bottom: 40,
  alignSelf: 'center',
  width: 80,
  height: 80,
  borderRadius: 40,
  borderWidth: 4,
  borderColor: 'rgba(255,255,255,0.8)', // transparent white ring
  justifyContent: 'center',
  alignItems: 'center',
},

captureInner: {
  width: 55,
  height: 55,
  borderRadius: 30,
  backgroundColor: 'white',
},
closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
