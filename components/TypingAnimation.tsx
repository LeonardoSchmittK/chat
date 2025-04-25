import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform, Pressable } from 'react-native';
import RenderHtml from 'react-native-render-html';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  runOnJS
} from 'react-native-reanimated';

import * as Speech from 'expo-speech';
import striptags from 'striptags';

import RenderHTML from './RenderHTML';
import { SvgXml } from 'react-native-svg'; 
import useStore from '../stores/store';
import sparkleSvg from '../assets/svg/sparkle.js';
import audioSvg from '../assets/svg/audio.js';
import pauseSvg from '../assets/svg/pause.js';
import getHoursAndMinutesFormatted from '@/utils/getHoursAndMinutesFormatted';

interface Message {
  content: string;
  isUser: boolean;
  hour?: string
}

type ButtonContinue = "Sim" | "Não";

const TypingAnimation = ({ 
  messageObj,
  isLastMessage,
  scrollViewReff
}: { 
  messageObj: Message,
  isLastMessage: boolean; 
  scrollViewReff: any
}) => {
  const [clickedButton, setClickedButton] = useState<ButtonContinue | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // reading out loud

  const { width } = useWindowDimensions();
  const { isUser, content, hour } = messageObj;

  // Animations for the main message
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(-20);

  // Animations for the follow-up content
  const followUpOpacity = useSharedValue(0);
  const followUpTranslateY = useSharedValue(20);

  const { counterUserMessages, setUserEndedChat, sethasUserNeedsToChooseContinueOrNot, setOpenRatingModal, addMessage } = useStore();

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));

  const followUpAnimatedStyle = useAnimatedStyle(() => ({
    opacity: followUpOpacity.value,
    transform: [{ translateY: followUpTranslateY.value }],
  }));

  const playAudio = async (htmlContent: string) => {
    const cleanText = striptags(htmlContent);
    if (!cleanText.trim()) return;
  
    if (isPlaying) {
      await Speech.stop();
      setIsPlaying(false);
    } else {
      Speech.speak(cleanText, {
        language: 'pt-BR',
        onStart: () => setIsPlaying(true),
        onDone: () => setIsPlaying(false),
        onError: (err) => {
          console.error("Speech error:", err);
          setIsPlaying(false);
        },
      });
    }
  };
  
  

  useEffect(() => {
    messageOpacity.value = withTiming(1, { duration: 500 });
    messageTranslateY.value = withTiming(0, { duration: 600 });

    if (counterUserMessages >= 2 && !isUser && isLastMessage) {
      sethasUserNeedsToChooseContinueOrNot(true);

      setTimeout(() => {
        setShowFollowUp(true);
        followUpOpacity.value = withTiming(1, { duration: 300 });
        followUpTranslateY.value = withTiming(0, { duration: 300 });

        setTimeout(() => {
          runOnJS(scrollViewReff.current?.scrollToEnd)({ animated: true });
        }, 500);
      }, 500);
    }
  }, []);

  const handleButtonClick = (button: ButtonContinue) => {
    setClickedButton(button);
    setIsButtonDisabled(true);
    addMessage({ content: button, isUser: true });
    if (button === "Não") {
      setUserEndedChat();
      setOpenRatingModal(true);
      scrollViewReff.current?.scrollToEnd({ animated: true });
      return;
    }

    sethasUserNeedsToChooseContinueOrNot(false);

    setTimeout(() => {
      scrollViewReff.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.messageContainer}>
      <Animated.View style={[isUser ? styles.userContainer : styles.botContainer, messageAnimatedStyle]}>
        
        {!isUser && (
          
          <View style={styles.iconRow}>
            <SvgXml xml={sparkleSvg} width={18} height={18}  />
              {/* <Pressable onPress={() => playAudio(content)}>
                <SvgXml xml={isPlaying ? pauseSvg : audioSvg} width={17} height={17} />
              </Pressable> */}
          </View>
        )}
        <View style={[styles.messageBox, isUser ? styles.userMessage : styles.botMessage]}>
          <RenderHtml contentWidth={width} source={{ html: content }} defaultTextProps={{ selectable: true }} tagsStyles={{
            body: { color: "rgba(69, 81, 84, 1)" },
            p: { backgroundColor: "red", color: "red" },
            h6: { fontSize: 16, marginBottom: 10, fontWeight: "normal", lineHeight: 24 },
            ul: { paddingLeft: 16, marginVertical: 8 },
            li: { marginBottom: 6, fontSize: 15, color: '#333', lineHeight: 22, paddingLeft: 5 },
          }} />
        </View>
      </Animated.View>

      {showFollowUp && (
        <Animated.View style={[styles.followUpContainer, followUpAnimatedStyle]}>
          <Text style={styles.followUpText}>Ajudo em algo mais?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, clickedButton === 'Sim' && styles.clickedButton]}
              onPress={() => handleButtonClick('Sim')}
              disabled={isButtonDisabled}>
              <Text style={[styles.buttonText, clickedButton === 'Sim' && styles.clickedButtonText]}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, clickedButton === 'Não' && styles.clickedButton]}
              onPress={() => handleButtonClick('Não')}
              disabled={isButtonDisabled}>
              <Text style={[styles.buttonText, clickedButton === 'Não' && styles.clickedButtonText]}>Não</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      


      )}
      {
        isUser ?
        <Animated.View>
<Text style={[ styles.userTime]}>{hour}</Text> 
        </Animated.View>
        :

        <Animated.View>
        <Text style={[ styles.botTime]}>{hour}</Text> 
                </Animated.View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
  },
  userContainer: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  messageBox: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  userMessage: {
    backgroundColor: '#ececec',
  },
  botMessage: {
    paddingHorizontal: 0,
  },
  text: {
    fontSize: 16,
    color: '#455154',
  },
  iconRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    marginTop: 25,
    marginBottom: -32,
    zIndex:100
  },
  botTime: {
    fontSize: 12,
    color: 'rgba(69, 81, 84, 1)',
    opacity: 0.5,
    marginTop: -16,
    marginBottom: 32,
  },
  userTime: {
    alignSelf: 'flex-end',
    marginTop: 8,
    fontSize: 12,
    opacity: 0.5,
    color: 'rgba(69, 81, 84, 1)',
  },
  followUpContainer: {
    marginTop: 8,
    marginBottom: 12,
    opacity: 0,
  },
  followUpText: {
    fontSize: 16,
    color: '#455154',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginBottom: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#E3E3E3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'flex-start',
    width: '100%',
  },
  clickedButton: {
    backgroundColor: 'green',
  },
  clickedButtonText: {
    color: 'white',
  },
  buttonText: {
    color: '#455154',
    textAlign: 'center',
  },
});

export default TypingAnimation;