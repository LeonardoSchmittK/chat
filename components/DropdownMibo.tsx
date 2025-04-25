import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Image as RNImage
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { Image } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const screenWidth = Dimensions.get('window').width;

const FAQDropdown: React.FC<FAQItem> = ({ question, answer }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);

    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Function to handle image click
  const handleImageClick = (uri: string) => {
    setSelectedImage(uri);
  };

  // Function to render answer content with clickable images
  const renderAnswerContent = () => {
    if (typeof answer === 'string') {
      return <Text style={styles.answerText}>{answer}</Text>;
    }

    // Clone the answer element and modify Image components to be clickable
    return React.cloneElement(answer as React.ReactElement, {
      children: React.Children.map((answer as React.ReactElement).props.children, (child) => {
        if (child?.type === Image && child.props.source?.uri) {
          return (
            <TouchableOpacity onPress={() => handleImageClick(child.props.source.uri)}>
              {child}
            </TouchableOpacity>
          );
        }
        return child;
      }),
    });
  };

  return (
    <View style={styles.innerContainer}>
      <TouchableOpacity style={styles.innerHeader} onPress={toggleDropdown}>
        <Text style={styles.innerTitle}>{question}</Text>
        <Animated.View style={[{ transform: [{ rotate }] }, styles.chevronCircle]}>
          <Entypo name="chevron-down" size={18} color="rgba(22, 49, 52, 1)" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.innerContent}>
          {renderAnswerContent()}
        </View>
      )}

      <Modal
        visible={!!selectedImage}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedImage && (
                <RNImage
                  source={{ uri: selectedImage }}
                  style={styles.fullSizeImage}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const faqData: FAQItem[] = [
  {
    id: "P1040",
    question: "Como instalar o controlador EWS 1001?",
    answer: (
      <>
        <Text style={{fontFamily:"Inter"}}>
          Todas as conexões devem ser realizadas com a energia desligada para evitar lesões pessoais e dano ao aparelho.
          Antes de iniciar a instalação, verifique se o local possui sinal de sua rede Wi-Fi, o que pode ser feito utilizando o seu celular.
          O produto EWS 211 deve ser instalado onde existe sinal de Wi-Fi 2,4 GHz.
          {'\n'}{'\n'}
          Obs.: esse dispositivo não deve ser utilizado no acionamento direto de motores elétricos e equipamentos eletroeletrônicos
          que possuam corrente de partida maior que a corrente máxima do dispositivo. Por favor, observe os pontos a seguir:
        </Text>
        <View style={{marginVertical:16}}>


          <Text  style={{marginVertical:16}}>Existem alguns motivos que podem fazer com que o seu controlador pare de responder. Por favor, verifique os possíveis motivos abaixo:</Text>
          <Text style={{ paddingLeft: 5, fontFamily:"Inter",marginBottom:12 }}><b>1.</b> Ferramentas necessárias: chave Phillips 3 mm e fita isolante.</Text>
          <Text style={{ paddingLeft: 5, fontFamily:"Inter",marginBottom:12 }}><b>2.</b> Não deve ser conectado mais de 1 fio por borne.</Text>
          <Text style={{ paddingLeft: 5, fontFamily:"Inter",marginBottom:12 }}><b>3.</b> Verifique as conexões antes de ligar a energia para certificar-se de que não haja um curto-circuito e tenha certeza
          de que todas as partes vivas estão isoladas.</Text>
          <Text style={{ paddingLeft:5, fontFamily:"Inter" }}><b>4.</b> Para sua segurança, não abra o produto sob nenhuma circunstância.</Text>
        </View>
       
        <Text style={{marginBottom:16,fontFamily:"Inter"}}>Passo a passo para a instalação:</Text>
        <iframe style={{marginBottom:16,marginTop:16}} width={(screenWidth * 9) / 16} height="" src="https://www.youtube.com/embed/X15nbBc9LeI?si=C0fTapfEx7qFuZi1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        <Image
          source={{ uri: 'https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/goat/bay1638191940106tqAI/1651750219fa8990056e8.jpg' }}
          style={{ width: '100%',height:300 }}
          resizeMode="contain"
        />

        <Image
          source={{ uri: 'https://airtake-public-data-1254153901.cos.ap-shanghai.myqcloud.com/goat/bay1638191940106tqAI/1651750267fa9f9be340f.jpg' }}
          style={{ width: '100%', height: 200 }}
          resizeMode="contain"
        />
      </>
    )
  },
  {
    id: "P1054",
    question: "O controlador Wi-fi EWS não está respondendo, o que fazer?",
      answer: (
        <>
          <Text>Existem alguns motivos que podem fazer com que o seu controlador pare de responder. Por favor, verifique os possíveis motivos abaixo:</Text>
          <Text style={{ paddingLeft: 5 }}><b>1.</b> Certifique-se de que a alimentação esteja conectada e funcionando corretamente.</Text>
          <Text style={{ paddingLeft: 5 }}><b>2.</b> Verifique o LED, e confira o status na tabela de status de funcionamento do LED deste manual.</Text>
          <Text style={{ paddingLeft: 5 }}><b>3.</b> Verifique se a sua rede Wi-Fi é 2.4 GHz e o seu roteador está funcionando.</Text>
        </>
      )
  },
  {
    id: "P1055",
    question: "O Controlador Wi-fi EWS não consegue se conectar à minha rede Wi-Fi.",
    answer: "Desligue o roteador e o produto e aguarde 10s e ligue novamente. Caso necessário, refaça a configuração do produto pressionando a tecla Reset por 5s. Siga as instruções no aplicativo para concluir a configuração de Wi-Fi. Certifique-se que seu dispositivo está conectado à mesma rede para realizar a configuração."
  },
  {
    id: "P1056",
    question: "EWS: Não há resposta após dar comando no app.",
    answer: "Certifique-se de que não tenha obstáculos entre o controle e o dispositivo a ser controlado. Paredes ou outros objetos irão reduzir o alcance efetivo do dispositivo. Envie Sua Sugestão. Para enviar sugestões sobre o aplicativo Mibo Smart, abra o aplicativo, clique em Eu, depois em Dúvidas e Suporte e em envie sua sugestão."
  },
  {
    id: "P1022",
    question: "Como instalar os controles remotos Izy Connect?",
    answer: "Para instalar os controles remotos Izy Connect, siga estes passos:\n1. Conecte o dispositivo ao sistema Izy Connect via o aplicativo correspondente.\n2. Pressione o botão de emparelhamento no controle remoto.\n3. Siga as instruções no aplicativo para adicionar o controle remoto ao seu sistema."
  },
  {
    id: "P1063",
    question: "O sensor de abertura ISA 1001 não está acionando, o que fazer?",
    answer: "Certifique que a bateria está encaixada de forma correta"
  },
  {
    id: "P1064",
    question: "Posso utilizar o sensor de abertura ISA 1001 em locais externos?",
    answer: "O sensor de abertura ISA 1001 foi projetado para uso interno. Para uso externo, é necessário garantir que ele esteja protegido de intempéries. Se o sensor for exposto diretamente a elementos climáticos, pode comprometer seu funcionamento."
  },
  {
    id: "P1065",
    question: "Posso instalar meu sensor ISA 1001 em superfícies metálicas?",
    answer: "Não é recomendado instalar o sensor ISA 1001 diretamente em superfícies metálicas, pois o metal pode interferir no sinal do sensor. Para garantir o funcionamento correto, instale o sensor em superfícies não metálicas ou utilize suportes adequados."
  },
  {
    id: "P1066",
    question: "Qual altura mais adequada para instalação do sensor MSM 1001?",
    answer: "A altura ideal para instalação do sensor MSM 1001 é entre 2,0 e 2,5 metros do solo. Isso permite que o sensor tenha um campo de visão adequado e não seja obstruído por objetos próximos."
  },
  {
    id: "P1067",
    question: "O sensor ISM 1001 é conectado a minha rede Wi-Fi?",
    answer: (
      <>
        <Text> Não. Por se tratar de uma tecnologia Zigbee, ele necessitará de um Hub ICA 1001 ou MCA 1001 para conexão.</Text>
      </>
    )
  },
  {
    id: "P1068",
    question: "Qual a distância máxima de alcance do sensor ISM 1001?",
    answer: (
      <>
        <Text>
        O sensor detecta movimentos até 8m de distância, com um ângulo de detecção de 90°.
        </Text>
        </>
    )
  }
];

const DispositivosMiboDropdown: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);

    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <View>
          <Text style={styles.title}>Dispositivos IZY</Text>
          <Text style={styles.subtitle}>Perguntas frequentes</Text>
        </View>
        <Animated.View style={[{ transform: [{ rotate }] }, styles.chevronCircle]}>
          <Entypo name="chevron-down" size={18} color="rgba(22, 49, 52, 1)" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <ScrollView style={styles.content}>
          {faqData.map((faq) => (
            <FAQDropdown key={faq.id} {...faq} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    shadowColor: "rgba(118, 118, 128, 0.67)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  innerContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerHeader: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1c2b2d',
  },
  innerTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1c2b2d',
    flex: 1,
    marginRight: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#4a4a4a',
    marginTop: 4,
  },
  content: {
    maxHeight: 500,
    paddingVertical: 8,
  },
  innerContent: {
    padding: 12,
    paddingTop: 0,
  },
  chevronCircle: {
    backgroundColor: "rgba(227, 227, 227, 1)",
    borderRadius: 100,
    padding: 6,
  },
  answerText: {
    color: '#2d2d2d',
    lineHeight: 22,
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullSizeImage: {
    width: '100%',
    height: '80%',
  },
});

export default DispositivosMiboDropdown;