import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
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
      <TouchableOpacity style={styles.scanButton}>
        <Ionicons name="camera" size={40} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.scanText}>Tap to scan waste item</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type or speak item name..."
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
});
