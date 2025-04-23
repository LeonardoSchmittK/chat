import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { TouchableOpacity, View, Text, Pressable, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg'; 
import documentSvg from '../../assets/svg/document.js'

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{
          title: 'Home', 
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="chat"
        options={{
          headerShadowVisible: false,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#2C2C2C', fontSize: 18, fontWeight: '600' }}>
                Assistente Inteligente
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#f6f6f6',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleAlign: 'center',
          headerTintColor: "#f6f6f6",
          headerBackTitle: 'Voltar',

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/")} style={{ paddingLeft: 15 }}>
              <Ionicons name="chevron-back" size={24} color="#2C2C2C" />
            </TouchableOpacity>
          ),

          // headerRight: () => (
          //   <Pressable onPress={() => router.push('/chatHistory')}>
          //     <View style={{ marginRight: 15 }}>
          //       <SvgXml xml={documentSvg} width={26} height={17} />
          //     </View>
          //   </Pressable>
          // ),
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
