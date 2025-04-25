import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import useStore from '../stores/store';
import CustomModal from "./CustomModal";
import salute from "../utils/salute";
import {router} from "expo-router"

type InfoBoxProps = {
  elapsedTime: number;
};

function InfoBox({ elapsedTime }: InfoBoxProps) {
  const { hasUserSentMessage } = useStore();
  
  // Individual state for each modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(true);
  const [tipsModalVisible, setTipsModalVisible] = useState(false);
  const { messages, addMessage, hasUserEndedChat, hasUserNeedsToChooseContinueOrNot, resetStore,openRatingModal,setOpenRatingModal  } = useStore();
 
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  



  async function sendFeedback() {
    try {
      const response = await fetch("http://192.168.10.19:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          question2: JSON.stringify(messages.filter(msg => msg.isUser).map(msg => msg.content)),
          response: JSON.stringify(messages.filter(msg => !msg.isUser).map(msg => msg.content)),
          score: rating.toString(),
          feedback: feedbackText,
          elapsedTime: elapsedTime.toString(),
          chat_model: "1",
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Erro ao enviar feedback:", data);
      } else {
        console.log("Feedback enviado com sucesso:", data);
      }
    } catch (error) {
      console.error("Erro de conexão ao enviar feedback:", error);
    }
  }

  return (
    <View style={styles.wholeHeader}>
<TouchableOpacity style={styles.container} onPress={() => setTipsModalVisible(true)}>
  <View style={styles.contentWrapper}>
    <Text
      style={styles.text}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      Como obter respostas mais precisas do assistente?
    </Text>
    <Ionicons name="information-circle" size={16} color="#06CB3F" style={styles.icon} />
  </View>
</TouchableOpacity>

      <Text style={styles.infoText}>Este chat ainda está em período de teste.</Text>

      {!hasUserSentMessage && (
        <View style={styles.chatBox}>
          <Text style={styles.greeting}>Olá, <Text style={styles.bold}>{salute()}!</Text></Text>
          <Text style={styles.subText}>Como posso te ajudar?</Text>
        </View>
      )}

      {/* Delete Confirmation Modal */}
      <CustomModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Tem certeza de que deseja excluir?"
        content={
          <View>
            <Text>
              Ao confirmar a exclusão, essa ação será irreversível. Todos os dados associados serão removidos de forma permanente.
            </Text>
          </View>
        }
        primaryButtonText="Continuar"
        onPrimaryPress={() => setDeleteModalVisible(false)}
        secondaryButtonText="Voltar"
        onSecondaryPress={() => setDeleteModalVisible(false)}
      />

      {/* Terms Modal */}
      <CustomModal
        visible={termsModalVisible}
        onClose={() => setTermsModalVisible(false)}
        title="Atenção!"
        content={
          <View>
            <Text>
              Este site registra suas perguntas, as respostas do chat e seu feedback para aprimorar continuamente sua experiência. Nenhuma informação pessoal é solicitada ou armazenada.
            </Text>
            <Text></Text>
            <Text>
              Se não concordar com os termos, clique em "Voltar" para retornar ao menu.
            </Text>
          </View>
        }
        primaryButtonText="Continuar"
        onPrimaryPress={() => setTermsModalVisible(false)}
        secondaryButtonText="Voltar"
        onSecondaryPress={() => {
          setTermsModalVisible(false);
          router.push("/");
        }}
      />

      {/* Tips Modal */}
      <CustomModal
        visible={tipsModalVisible}
        onClose={() => setTipsModalVisible(false)}
        title="Dicas para respostas mais assertivas com o Assistente Mibo:"
        content={
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Descreva o contexto com clareza</Text> – Quanto mais detalhes você fornecer, melhor será a resposta.
            </Text>
            <Text>{"\n"}</Text>
            <Text>
            <Text style={{ fontWeight: "bold" }}>Seja específico</Text> – Explique o que deseja alcançar para que o Assistente possa considerar sua situação personalizada.
            </Text>
            <Text>{"\n"}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Evite perguntas genéricas:</Text> Qual a melhor câmera interna?</Text>
            <Text>{"\n"}</Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Recomendado:</Text> Tenho uma casa e gostaria de monitorar minha porta de entrada. Qual a melhor câmera para essa necessidade?
            </Text>
          </View>
        }
        primaryButtonText="Continuar"
        onPrimaryPress={() => setTipsModalVisible(false)}
        secondaryButtonText="Voltar"
        onSecondaryPress={() => setTipsModalVisible(false)}
      />

      {/* Rating Modal */}
      <CustomModal
        visible={openRatingModal}
        onClose={() => setOpenRatingModal(false)}
        title="Sua opinião importa!"
        content={
          <View style={{ width: '100%' }}>
            <Text style={{ marginBottom: 16, textAlign: "center" }}>
              O nosso chat atendeu às suas expectativas?
            </Text>
            <Text style={{ marginBottom: 16, textAlign: "center", marginTop: -12 }}>
              Conte-nos sua experiência!
            </Text>
           
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <FontAwesome
                    name={star <= rating ? 'star' : 'star-o'}
                    size={42}
                    color={star <= rating ? '#07862B' : '#ccc'}
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {rating ? <Text style={{ marginBottom: 32, color: "#2C2C2C", textAlign: "center" }}>Você avaliou o Assistente Mibo com {rating} estrelas</Text>
              :
              <View style={{
                width: "70%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "auto"
              }}>
                <Text style={{ marginBottom: 32, color: "#979797" }}>Ruim</Text>
                <Text style={{ marginBottom: 32, color: "#979797" }}>Ótimo</Text>
              </View>
            }
           
           <TextInput
            placeholder="Digite aqui o seu feedback"
            style={{
              backgroundColor: '#ECECEC',
              borderRadius: 4,
              padding: 10,
              marginBottom: 16,
              height: 100,
              textAlignVertical: 'top'
            }}
            onChangeText={setFeedbackText}
            value={feedbackText}
            multiline
          />
          </View>
        }
        primaryButtonText="Continuar"
        onPrimaryPress={() => {
          sendFeedback();
          setOpenRatingModal(false);
          setRating(0); 
          setFeedbackText(""); 
        }}
        secondaryButtonText="Voltar"
        onSecondaryPress={() => setOpenRatingModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
    alignItems: "center",
  },
  greeting: {
    fontSize: 20 ,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14 ,
    color: "rgba(69, 81, 84, 1)",
  },
  wholeHeader: {
    marginTop: 54,
    padding:16,

  },
  infoText: {
    fontSize: 12,
    alignSelf: "center",
    marginBottom: 12,
    marginTop: 15,
    
    color:"#979797"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 8,
    width: "99%",
    alignSelf: "center",

    shadowColor: "rgba(118, 118, 128, 0.67)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 40,
  },
  
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 6 
  },
  userContainer: {
    flexDirection: "row-reverse", 
    justifyContent: "flex-end",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  iconButton: {
    marginLeft: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    textAlign: "left",
  },
  recommended: {
    fontSize: 14,
    textAlign: "left",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  closeButton: {
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#07862B",
    backgroundColor: "transparent",
    width: "100%",
  },
  closeButtonText: {
    color: "#07862B",
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#07862B",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
  }
});


export default InfoBox;