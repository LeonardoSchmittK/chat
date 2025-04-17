import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import RenderHtml from 'react-native-render-html';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  runOnJS
} from 'react-native-reanimated';

import RenderHTML from './RenderHTML';
import { SvgXml } from 'react-native-svg'; 
import useStore from '../stores/store';
import sparkleSvg from '../assets/svg/sparkle.js';
import audioSvg from '../assets/svg/audio.js';
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
  messageObj:Message,
  isLastMessage: boolean; 
  scrollViewReff:any

}) => {
  const [clickedButton, setClickedButton] = useState<ButtonContinue | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const { width } = useWindowDimensions();
  const {isUser,content,hour } = messageObj
  // Animations for the main message
  const messageOpacity = useSharedValue(0);
  const messageTranslateY = useSharedValue(-20);
  
  // Animations for the follow-up content
  const followUpOpacity = useSharedValue(0);
  const followUpTranslateY = useSharedValue(20);

  const { counterUserMessages, setUserEndedChat, sethasUserNeedsToChooseContinueOrNot, setOpenRatingModal,addMessage } = useStore();

  // Animation styles
  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
    transform: [{ translateY: messageTranslateY.value }],
  }));
  
  const followUpAnimatedStyle = useAnimatedStyle(() => ({
    opacity: followUpOpacity.value,
    transform: [{ translateY: followUpTranslateY.value }],
  }));

  useEffect(() => {
    // Animate main message in without scrolling
    messageOpacity.value = withTiming(1, { duration: 500 });
    messageTranslateY.value = withTiming(0, { duration: 600 });
  
    if (counterUserMessages >= 3 && !isUser && isLastMessage) {
      sethasUserNeedsToChooseContinueOrNot(true);
  
      setTimeout(() => {
        setShowFollowUp(true);
        followUpOpacity.value = withTiming(1, { duration: 300 });
        followUpTranslateY.value = withTiming(0, { duration: 300 });
  
        // Only scroll when follow-up appears
        runOnJS(() => {
          scrollViewReff.current?.scrollToEnd({ animated: true });
        })();
      }, 500);
    }
  }, []);
  

  const handleButtonClick = (button:ButtonContinue) => {
    setClickedButton(button);
    setIsButtonDisabled(true);
    addMessage({content:button, isUser:true})
    if (button === "Não") {
      setUserEndedChat();
      setOpenRatingModal(true);
      scrollViewReff.current?.scrollToEnd({ animated: true });
      return;
    }
    
    // When "Sim" is clicked
    sethasUserNeedsToChooseContinueOrNot(false);
    
    setTimeout(() => {
      scrollViewReff.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.messageContainer}>
      <Animated.View style={[
        isUser ? styles.userContainer : styles.botContainer, 
        messageAnimatedStyle
      ]}>
        {!isUser && 
        <View style={styles.iconRow}>
        <SvgXml xml={sparkleSvg} width={17} height={17} style={styles.sparkleIcon}/>
        <SvgXml xml={audioSvg} width={17} height={17} style={styles.audioIcon}/> 
        </View>}
        <View style={[styles.messageBox, isUser ? styles.userMessage : styles.botMessage]}>
          {/* <Text style={styles.text}>{txt}</Text> */}
          {/* <RenderHtml
            contentWidth={width}
            source={{ html: txt }}
            defaultTextProps={{ selectable: true }}
        /> */}
        <RenderHTML txt={content}/>
        </View>
        <Text style={[styles.time, isUser ? styles.userTime : styles.botTime]}>{hour}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
    marginVertical: 14,
  },
  userContainer: {
    alignSelf: 'flex-end',
    marginRight: 28,
  },
  botContainer: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageBox: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  userMessage: {
    backgroundColor: '#ececec',
  },
  text: {
    fontSize: 16,
    color: '#455154',
  },
  iconRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    paddingHorizontal: 10, 
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    opacity: 0.5
  },
  botTime: {
    alignSelf: 'flex-start',
    marginLeft: 12,
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    opacity: 0.5
  },
  userTime: {
    alignSelf: 'flex-end',
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  followUpContainer: {
    marginTop: 8,
    marginLeft: 20,
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