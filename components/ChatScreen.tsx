import React, { useState, useRef, useEffect } from "react";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InfoBox from "./InfoBox";
import TypingAnimation from "./TypingAnimation";
import useStore from '../stores/store';
import LottieView from 'lottie-react-native'; 
import CustomModal from "./CustomModal";
import getHoursAndMinutesFormatted from "@/utils/getHoursAndMinutesFormatted";

export default function ChatScreen() {
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const { messages, addMessage, hasUserEndedChat, hasUserNeedsToChooseContinueOrNot, resetStore,openRatingModal,setOpenRatingModal  } = useStore();
  const [modalVisible, setModalVisible] = useState(true);
  const [rating, setRating] = useState(0);
  const [inputHeight, setInputHeight] = useState(45);

  useEffect(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, hasUserEndedChat, hasUserNeedsToChooseContinueOrNot]);

  function addUserMessage() {

    if (message.trim() !== "") {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      addMessage({content:message,isUser: true});
      setMessage("");
      Keyboard.dismiss();
  
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
        addMessage({content:`<div>
    <h1>Geofencing</h1>
    <ul>
        <li>Geofencing is a location-based service.</li>
        <li>Uses GPS, Wi-Fi, or cellular data.</li>
        <li>Creates a virtual boundary (geofence).</li>
        <li>Triggers actions when a device enters or exits the boundary.</li>
    </ul>
</div>`,isUser:false});
        
        // Scroll to bottom after new message is added
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 4000);
    }
  }
  

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Listen for keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd()
        }, 100);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
    );

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70} 
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
      
      <KeyboardAwareScrollView 
        contentContainerStyle={styles.messagesContainer}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={90} 
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <InfoBox/>
        <View style={styles.chatContainer} >
          {messages.map((msg, id) => (
            <View 
              key={id} 
              style={[
                styles.messageBubble,
                msg.isUser ? styles.userMessage : styles.botMessage
              ]}
            >
              <TypingAnimation messageObj={msg} isLastMessage={id === messages.length - 1} scrollViewReff={scrollViewRef} />
            </View>
          ))}

          {loading && (
            <View style={styles.loadingBox}>
              <LottieView
                source={require('../assets/lottie/loading.json')}
                autoPlay
                loop
                style={styles.loadingAnimation}
                />
            </View>
          )}

          {hasUserEndedChat && (
            <View style={styles.endedChatContainer}>
              <Text style={styles.endedChatDescription}>Obrigado! Volte sempre que tiver dúvidas</Text>
              <TouchableOpacity onPress={resetStore}>
                <Text style={styles.endedChatInitNewChat}>
                  Iniciar novo chat
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>

      {!hasUserNeedsToChooseContinueOrNot && (
        <View style={styles.inputContainerBox}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { height: Math.max(45, inputHeight) }]}
              placeholder="Digite a sua mensagem"
              placeholderTextColor="#aaa"
              value={message}
              onChangeText={setMessage}
              onContentSizeChange={(event) => {
                const newHeight = event.nativeEvent.contentSize.height;
                setInputHeight(newHeight);
              }}
              onSubmitEditing={addUserMessage}
              returnKeyType="send"
              multiline
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sendButton,
              { 
                backgroundColor: loading || !message ? "#9FD0A1" : "#07862B"
              },
            ]}

            onPress={addUserMessage}
            disabled={loading || hasUserNeedsToChooseContinueOrNot}
          >
            <Ionicons name="send" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const { height: screenHeight } = Dimensions.get('screen');
const windowHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight || 0;
const navigationBarHeight = screenHeight - windowHeight - statusBarHeight;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height: windowHeight+20,
    backgroundColor: "#f6f6f6",
    flexDirection:"column",
    marginTop:-75,
  },
  chatContainer: {
    flexGrow:1,
    ...(Platform.OS === "web" ? { width: "100%" } : { width: "100%" }), 
    margin:"auto",
    paddingHorizontal:16,
  },
  messagesContainer: {
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: "95%",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  botMessage: {
    alignSelf: "flex-start",
  },
  inputContainerBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 40,
    alignSelf: "center",
    maxWidth:"100%",
    padding:16,
    ...(Platform.OS === "web"
      ? { width: screenWidth < 768 ? "100%" : "100%" }
      : { width: "100%" }),
  },
  
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(236, 236, 236, 1)",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#979797",
    paddingVertical:12,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}), 
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 10,
  },
  endedChatContainer: {
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center', 
    padding: 20,
    marginVertical: 10
  },
  endedChatDescription: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10, 
  },
  endedChatInitNewChat: {
    fontSize: 16,
    color: '#07862B', 
    textAlign: 'center',
    textDecorationLine: 'underline', 
  },
  loadingAnimation: {
  },
  loadingBox: {
    width:"24%",
    height:42,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:14,
    transform:"scale(2)",
    marginLeft:-16
  }
});
