import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfoBox() {
  return (
    <View style={styles.wholeHeader}>
        <View style={styles.container}>

      <Text style={styles.text}>Como obter respostas mais precisas do assistente?</Text>
      <TouchableOpacity style={styles.iconButton} onPress={() => alert("Mais informações")}>
        <Ionicons name="information-circle" size={16} color="white" />
      </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>Este chat ainda está em período de teste.</Text>

      <View style={styles.chatBox}>
        <Text style={styles.greeting}>Olá, <Text style={styles.bold}>Carlos!</Text></Text>
        <Text style={styles.subText}>Como posso te ajudar?</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    chatBox: {
        alignItems: "center",
        marginTop: 20,
      },
      greeting: {
        fontSize: 24,
        color: "#333",
      },
      bold: {
        fontWeight: "bold",
      },
      subText: {
        fontSize: 16,
        color: "#666",
      },
    wholeHeader: {
      marginTop:54   
    },
    infoText: {
        fontSize: 12,
        color: "gray",
        alignSelf:"center",
        marginTop:10
      },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 12,
    borderRadius: 8,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width:"88%",
    alignSelf:'center'
  },
  text: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  iconButton: {
    backgroundColor: "#1DB954",
    borderRadius: 12,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
