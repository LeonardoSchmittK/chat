import { Image, StyleSheet, Platform, Text, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ChatScreen from '@/components/ChatScreen';
import TypingAnimation from '@/components/TypingAnimation';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ThemedView >
        <View>
      <Text>Página Inicial</Text>
        <Button title="Acessar Assistente" onPress={() => router.push('/chat')} />
      </View>
      </ThemedView>
    </SafeAreaView>
  );
}

