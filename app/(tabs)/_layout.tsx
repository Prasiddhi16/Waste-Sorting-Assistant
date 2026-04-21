import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
       <Tabs.Screen name="result" options={{ title: 'Result' }} />
      <Tabs.Screen name="gamification" options={{ title: 'Gamification' }} />
      <Tabs.Screen name="community" options={{ title: 'Community' }} />
    </Tabs>
  );
}

