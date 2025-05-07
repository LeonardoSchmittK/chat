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
import axios from "axios"

const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);
const isPc = !isIos && !isAndroid

export default function ChatScreen() {
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const { messages, addMessage,setUserEndedChat, setForceChatByUser, hasUserEndedChat,setShowFollowUp,sethasUserNeedsToChooseContinueOrNot, hasUserNeedsToChooseContinueOrNot, resetStore,openRatingModal,setOpenRatingModal,setUserExit  } = useStore();
  const [modalVisible, setModalVisible] = useState(true);
  const [rating, setRating] = useState(0);
  const [forceEndUser, setForceEndUser] = useState(false);
  const [inputHeight, setInputHeight] = useState(45);
  useEffect(() => {
      scrollViewRef.current?.scrollToEnd(true );
  }, [messages, hasUserEndedChat, hasUserNeedsToChooseContinueOrNot]);

  async function addUserMessage() {
    if (message.trim() !== "") {
      scrollViewRef.current?.scrollToEnd(true);
      addMessage({ content: message, isUser: true });
      setMessage("");
      Keyboard.dismiss();
      
      setLoading(true);
      const startTime = Date.now();
  
      try {
        const params = new URLSearchParams();
        params.append('question', message);
        params.append('chat_model', "1");
  
        const fetchAnswer = axios.post(
          'http://192.168.10.49:8000/api/chat/',
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
  
        // Create a timeout promise
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 30000) // 30 seconds
        );
  
        // Race between fetch and timeout
        const response = await Promise.race([fetchAnswer, timeout]);
  
        if (response && (response as any).data) {
          const endTime = Date.now();
          const elapsed = Math.floor((endTime - startTime) / 1000);
          setElapsedTime(elapsed);
          if((response as any).data.special_action == "signal_chat_finish") {
            // addMessage({ content: "", isUser: true, forceEnd:true });
            addMessage({ content: "<h6>Finalizando atendimento...</h6>", isUser: false });
            setUserExit(true)
            return
          }
          addMessage({ content: (response as any).data.response || "Resposta não encontrada", isUser: false });
        }
        
      } catch (error) {
        console.error("Erro na chamada ao backend:", error);
  
        // If the error is a timeout, show a fallback message
        if ((error as any).message === 'Timeout') {
          addMessage({ content: "<h6>Tempo de resposta excedido. Por favor, tente mais tarde.<h6>", isUser: false });
        } else {
          addMessage({ content: "<h6>Erro ao buscar resposta. Por favor, Tente novamente mais tarde.<h6>", isUser: false });
        }
      } finally {
        setLoading(false);
        scrollViewRef.current?.scrollToEnd(true);
        

      }
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
        scrollViewRef.current?.scrollToEnd(true);
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
        <InfoBox elapsedTime={elapsedTime}/>
        <View style={styles.chatContainer} >

        {messages
  .map((msg, id) => (
    <View 
      key={id} 
      style={[
        styles.messageBubble,
        msg.isUser ? styles.userMessage : styles.botMessage
      ]}
    >
      <TypingAnimation 
        messageObj={msg} 
        isLastMessage={id === messages.length - 1} 
        scrollViewReff={scrollViewRef} 
      />
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
  onKeyPress={({ nativeEvent }) => {
    if (Platform.OS === 'web' && nativeEvent.key === 'Enter') {
      addUserMessage();
    }
  }}
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
    width: "100%",
    height: windowHeight+20,
    backgroundColor: "#f6f6f6",
    flexDirection:"column",
    marginTop:-75,
  },
  chatContainer: {
    flexGrow:1,
    width:isPc ? "50%" : "100%",
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
    paddingBottom: isIos ? 20 : 40,
    alignSelf: "center",
    maxWidth:"100%",
    padding:16,
    width:isPc ? "50%" : "100%",
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
    marginVertical: 32
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
