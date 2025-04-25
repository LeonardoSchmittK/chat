import { Image, StyleSheet, Platform, Text, View, Button, Pressable, Dimensions, StatusBar } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ChatScreen from '@/components/ChatScreen';
import TypingAnimation from '@/components/TypingAnimation';
import { router } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import bolaBanner from '@/assets/svg/bola-banner.js';
import DropdownCard from '@/components/DropdownCard';
import BolaBanner from '@/assets/svg/bola-banner';
import FAQDropdowns from '@/components/DropdownCard';
import DispositivosIzyDropdown from '@/components/DropdownCard';
import DispositivosMiboDropdown from '@/components/DropdownMibo';

export default function HomeScreen() {
  
  return (
    <SafeAreaView >
      <ThemedView style={styles.container}>
        <View style={styles.content}>

        <View style={styles.upperTitleCard}>
          <Text>Como podemos ajudar?
        </Text>
      </View>
      <Pressable style={styles.cardAssistant} onPress={() => router.push('/chat')}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Assistente!</Text>
          <Text style={styles.cardDesc}>
            Venha conhecer a nova funcionalidade de inteligência artificial que criamos para você.
          </Text>
        </View>

      <View style={styles.imageWrapper}>
      
    <Image
      source={require('@/assets/images/bola-banner.png')}
      style={styles.image}
      resizeMode="contain"
    />
        {/* <SvgXml xml={bolaBanner} width={120} height={120} /> */}
    </View>
</Pressable>
      <DispositivosIzyDropdown/>
      <DispositivosMiboDropdown/>
      {/* <FAQDropdowns/> */}
      </View>
      </ThemedView>
    </SafeAreaView>
  );
}
const { height: screenHeight } = Dimensions.get('screen');
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight || 0;
const navigationBarHeight = screenHeight - windowHeight - statusBarHeight;
const screenWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
  container: { 
    height: windowHeight + statusBarHeight + 20,
    padding: 16,
    backgroundColor: "#f6f6f6"
  },
  content:{
    ...(Platform.OS === "web" ? { width: "100%" } : { width: "100%" }), 
    marginHorizontal:"auto"
  },

  cardHeader:{
    marginRight: 15,
    width:"70%",
    padding: 16,
    backgroundColor:"#fafafa"
  },
  cardDesc: {
    color: "rgba(69, 81, 84, 1)",
  },
  cardTitle: {
    fontSize: 32,
    color: "rgba(44, 44, 44, 1)",
    fontWeight:"bold"
  },
  cardAssistant: {
    width: "100%",
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    backgroundColor:"#fafafa",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom:24,
    shadowColor: "rgba(118, 118, 128, 0.67)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 40,
  },
  image:{
    position:"absolute",
    top:-100,
    left:0,
    width:200,
    height: 300,
  },
  imageWrapper: {
  },
  upperTitleCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#fafafa",
    borderRadius: 4,
    padding: 8,
    shadowColor: "rgba(118, 118, 128, 0.67)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  
});



