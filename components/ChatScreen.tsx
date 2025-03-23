import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import InfoBox from "./InfoBox";
import TypingAnimation from "./TypingAnimation";

export default function ChatScreen() {
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>


      <InfoBox/>
      <TypingAnimation txt={"Geofencing é legale"}/>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a sua mensagem"
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity   style={[styles.sendButton, { backgroundColor: message ? "#1d966e" : "#3bd4a1" }]}  onPress={() => alert("Mensagem enviada!")}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    height:"100%",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  header: {
    padding: 10,
    alignItems: "center",
  },

  
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    marginHorizontal: 10,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333",

  },
  sendButton: {
    backgroundColor: "#6FCF97",
    padding: 10,
    borderRadius: 10,
  },
});
