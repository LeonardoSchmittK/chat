import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{
          title: 'Home', 
          headerShown:false
        }}
      />
      <Stack.Screen
        name="explore" 
        options={{
          title: 'Explore',
        }}
      />
    </Stack>
  );
}