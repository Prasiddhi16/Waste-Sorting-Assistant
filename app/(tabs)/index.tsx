import { Button, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Waste Sorting Assistant</Text>
      <Button title="Scan Waste Item" onPress={() => alert("Camera coming soon haii kids!")} />
    </View>
  );
}
