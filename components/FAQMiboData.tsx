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
	Image as RNImage,
	Image,
	Linking
} from 'react-native';

interface FAQCategory {
	id: string;
	name: string;
	items: FAQItem[];
}

interface FAQItem {
	id: string;
	question: string;
	answer: string | React.ReactNode;
}

const faqDataMibo: FAQCategory[] = [
	{
    	id: "app",
    	name: "Aplicativo Mibo Smart",
    	items: [
        	{
            	id: "P007",
            	question: "Como adiciono câmeras a minha conta Mibo Smart?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 10 }}>
                        	Você pode adicionar as câmeras a sua conta Mibo Smart seguindo o passo a passo do vídeo abaixo:
                    	</Text>
                    	<iframe
                        	className="yvideo"
                        	src="https://www.youtube.com/embed/f99Og25Rz1Y"
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                        	style={{ width: '100%', maxWidth: 350, height: 200 }}
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P009",
            	question: "Quantas câmeras posso adicionar à minha conta Mibo Smart?",
            	answer: <Text>Até 32 câmeras por conta</Text>
        	},
        	{
            	id: "P011",
            	question: "Com quantas pessoas posso compartilhar minhas câmeras?",
            	answer: (
                	<Text>
                    	Você pode compartilhar sua câmera com até outras 6 contas diferentes, e poderá configurar as permissões que cada conta irá ter sobre sua câmera.
                	</Text>
            	)
        	},
        	{
            	id: "P039",
            	question: "Não consigo cadastrar o meu dispositivo smart em mais de um smartphone.",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Os dispositivos smart devem ser cadastrados apenas em um único dispositivo e caso queira utilizar em mais de um smartphone é possível compartilhá-lo com outro smartphone. Para isso é necessário que o outro smartphone tenha o app Mibo Smart instalado.
                    	</Text>
                    	<Text style={{ marginBottom: 16 }}>
                        	Para saber como compatilhar o dispositivo assista o vídeo a seguir:
                    	</Text>
                    	<iframe
                        	className="yvideo"
                        	src="https://www.youtube.com/embed/YbVg85We26Y"
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P069",
            	question: "O aplicativo Mibo Smart é um novo aplicativo da Intelbras?",
            	answer: (
                	<Text>
                    	Não, o app Mibo Smart é uma atualização do aplicativo Mibo Cam que traz diversas novidades, com destaque especial para as novas funcionalidades de Casa Inteligente.
                	</Text>
            	)
        	},
        	{
            	id: "P070",
            	question: "O que temos de novidades no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	A possibilidade de controlar no mesmo aplicativo as câmeras da linha Mibo e produtos de casa inteligente da Intelbras, como interruptores, lâmpadas, fechaduras, sensores, detectores, controle remoto inteligente e muito mais, permitindo a criação de rotinas inteligentes com todos esses produtos.
                	</Text>
            	)
        	},
        	{
            	id: "P071",
            	question: "Utilizo atualmente o app Mibo Cam, vou precisar recadastrar minhas câmeras Mibo para utilizar o Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Não, as câmeras cadastradas anteriormente continuarão funcionamento normalmente no app Mibo Smart.
                	</Text>
            	)
        	},
        	{
            	id: "P072",
            	question: "O App Mibo Smart é compatível com a linha de produtos Izy?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Sim, com exceção das câmeras IZC 1003, IZC 1004 e IZC 1005 e do videoporteiro IVW 3000 e IVW 3000+ da linha Izy.
                	</Text>
            	)
        	},
        	{
            	id: "P074",
            	question: "Posso utilizar a mesma conta Izy Smart para logar no app Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Não. É necessário escolher entre utilizar o Izy smart ou o Mibo Smart, os dispositivos não podem ser cadastrados simultaneamente nos dois apps.
                	</Text>
            	)
        	},
        	{
            	id: "P075",
            	question: "Ao adicionar no Mibo Smart os meus produtos que estavam no Izy Smart, as automações migrarão também?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Não, será necessário recriá-las no app Mibo Smart
                	</Text>
            	)
        	},
        	{
            	id: "P076",
            	question: "O que são as Rotinas no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Rotinas são ações que você pode criar no aplicativo para controlar os dispositivos inteligentes. Existem rotinas que são acionadas manualmente, também conhecidas como cenas, e também as automações, que são ações que ocorrem automaticamente.
                	</Text>
            	)
        	},
        	{
            	id: "P077",
            	question: "O que é uma Cena no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Cena é uma ação ou conjunto de ações que é ativada manualmente pelo app ou através de comandos de voz. Por exemplo, você pode criar a cena "hora de dormir" que tem como ações desligar as luzes ou interruptores inteligentes de casa e desligar a TV através do controle remoto inteligente.
                	</Text>
            	)
        	},
        	{
            	id: "P078",
            	question: "O que é uma Automação no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Automação: é um conjunto de ações pré-configuradas no aplicativo, que serão executadas quando algum gatilho for acionado. O gatilho pode ser algum evento em outro dispositivo, uma agenda de funcionamento, uma condição climática, etc.
                	</Text>
            	)
        	},
        	{
            	id: "P079",
            	question: "Posso comandar os dispositivos e cenas através de comandos de voz no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Sim. Para isso, você precisa vincular sua conta Mibo Smart com algum dos assistentes virtuais compatíveis, Amazon Alexa e/ou Google Assistente.
                	</Text>
            	)
        	},
        	{
            	id: "P080",
            	question: "Até quantos usuários consigo compartilhar um ambiente?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Você pode adicionar até 15 membros a um mesmo ambiente
                	</Text>
            	)
        	},
        	{
            	id: "P081",
            	question: "Quantos ambientes podem ser adicionados?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Podem ser adicionados até 8 ambientes.
                	</Text>
            	)
        	},
        	{
            	id: "P082",
            	question: "Quantos dispositivos podem ser adicionados por ambiente no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Não há limite de dispositivos a serem adicionados no aplicativo Mibo Smart.
                	</Text>
            	)
        	},
        	{
            	id: "P083",
            	question: "Quantas cenas podem ser criadas dentro de um ambiente no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Podem ser criadas no máximo 60 cenas no aplicativo Mibo Smart
                	</Text>
            	)
        	},
        	{
            	id: "P084",
            	question: "Quantas automações podem ser criadas dentro de um ambiente no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Podem ser criadas no máximo 30 automações dentro de um ambiente no aplicativo Mibo Smart
                	</Text>
            	)
        	},
        	{
            	id: "P085",
            	question: "Qual número máximo de ações em uma cena no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	O número máximo é de 16 ações em uma cena.
                	</Text>
            	)
        	},
        	{
            	id: "P086",
            	question: "Qual número máximo de ações em uma automação no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	O número máximo é de 16 ações em uma automação.
                	</Text>
            	)
        	},
        	{
            	id: "P087",
            	question: "Qual número máximo de condições em uma automação no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	O número máximo é de 3 condições em uma automação no aplicativo Mibo Smart.
                	</Text>
            	)
        	},
        	{
            	id: "P088",
            	question: "Qual número de logins simultâneos no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Somente um.
                	</Text>
            	)
        	},
        	{
            	id: "P089",
            	question: "Quantos cômodos podem ser criados no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Máximo de 32 cômodos
                	</Text>
            	)
        	},
        	{
            	id: "P090",
            	question: "Número de dispositivos por cômodos no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Sem limite.
                	</Text>
            	)
        	},
        	{
            	id: "P091",
            	question: "Quantos dispositivos podem ser adicionados a um grupo no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	No máximo 30 dispositivos.
                	</Text>
            	)
        	},
        	{
            	id: "P092",
            	question: "Quantos grupos de dispositivos podem ser criados em um ambiente no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	No máximo 30 grupos
                	</Text>
            	)
        	},
        	{
            	id: "P093",
            	question: "Número máximo de compartilhamentos de dispositivos no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Máximo de 10 compartilhamentos sem o serviço Mibo + (vai para 20 compartilhamentos).
                	</Text>
            	)
        	},
        	{
            	id: "P094",
            	question: "Quantos ambientes uma conta consegue receber como compartilhamento no aplicativo Mibo Smart?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Máximo de 10 ambientes
                	</Text>
            	)
        	},
        	{
            	id: "P095",
            	question: "Posso utilizar o app Izy Smart e o Mibo Smart ao mesmo tempo para gerenciar os mesmos produtos?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Não. É necessário escolher entre utilizar o Izy smart ou o Mibo Smart, os dispositivos não podem ser cadastrados simultaneamente nos dois apps
                	</Text>
            	)
        	}
    	]
	},
	{
    	id: "lighting",
    	name: "Iluminação",
    	items: [
        	{
            	id: "P041",
            	question: "Posso acender e apagar a lâmpada smart por um interruptor normal?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Sim, é possível apagar ou acender a lâmpada smart por um interruptor normal. Porém, ao acionar a lâmpada smart pelo aplicativo Mibo Smart, o interruptor deve estar sempre na posição ligado.
                	</Text>
            	)
        	},
        	{
            	id: "P042",
            	question: "Qual é a diferença entre os modelos EWS 410, WES 409, EWS 407 e MLS 4100?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	A diferença entre elas está na potência. A potência do modelo EWS 407 é de 7 watts, do EWS 409 é de 9 watts e do modelo EWS 410 é de 10 watts. Os modelos EWS 407 e EWS 409 tem conexão via Bluetooth.
                	</Text>
            	)
        	},
        	{
            	id: "P044",
            	question: "Caso configure a lâmpada smart para ligar e desligar automaticamente, vai funcionar na falta de internet, mesmo estando em offline?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Quando a lâmpada estiver offline, não haverá comunicação entre o servidor e o dispositivo smart. Para utilizá-la é necessário aguardar o retorno da internet.
                	</Text>
            	)
        	},
        	{
            	id: "P046",
            	question: "Para a instalação de um interruptor inteligente é necessário utilizar o fio neutro?",
            	answer: (
                	<Text style={{ marginBottom: 16 }}>
                    	Sim, pois o neutro junto com o fio fase irá alimentar o dispositivo smart. Você pode utilizar o neutro do circuito de iluminação mais próximo.
                	</Text>
            	)
        	},
        	{
            	id: "P047",
            	question: "Posso controlar meus dispositivos smart por comandos de voz?",
            	answer: (
                	<>
                    	<View style={{ marginBottom: 16 }}>
                        	<Text>
                            	Sim, você pode controlar por voz através de um speaker como a Alexa ou Google Home. Para isso é necessário ter o dispositivo adicionado à conta do Mibo Smart e vinculá-la ao aplicativo da Alexa, por exemplo, por meio da skill.
                        	</Text>
                    	</View>
                    	<View style={{ marginBottom: 16 }}>
                        	<Text>Para baixar a skill, veja o passo a passo no link:</Text>
                        	<Text
                            	style={{ color: 'green' }}
                            	onPress={() => Linking.openURL('https://backend.intelbras.com/sites/default/files/2021-05/como-ativar-a-skill-izy-smart-no-aplicativo-amazon-alexa.pdf')}
                        	>
                            	Link de vídeo passo a passo!
                        	</Text>
                    	</View>
                	</>
            	)
        	},
        	{
            	id: "P049",
            	question: "Como instalar uma lâmpada smart?",
            	answer: (
                	<>
                    	<Text>
                        	Certifique-se de que a energia esteja desligada antes de começar a instalação e de que o local de instalação possua sinal Wi-Fi 2,4GHz. Uma vez configurada, a lâmpada pode ser utilizada como uma lâmpada comum, podendo ser acionada pelo interruptor.
                    	</Text>
                    	<Text>
                        	No entanto, as funcionalidades inteligentes estão restritas ao uso do aplicativo e controle por voz
                    	</Text>
                    	<Image
                        	source={require('../assets/images/modo-ez-lampada.jpg')}
                        	style={{ width: '100%'}}
                        	resizeMode="contain"
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P049",
            	question: "Como instalar um interruptor smart?",
            	answer: (
                	<>
                    	<Text>
                        	Aprenda a instalar um interruptor touch:
                    	</Text>
                    	<iframe
                        	className="yvideo"
                        	src="https://youtu.be/JDmhcTRhiT8"
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    	/>
                    	<Image
                        	source={require('../assets/images/interruptor-desenho.jpg')}
                        	style={{ width: '100%'}}
                        	resizeMode="contain"
                    	/>
                    	<Text style={{marginBottom: 16}}>Modo EZ</Text>
                    	<Text style={{marginBottom: 16}}>
                        	Com o aparelho já energizado, verifique se a luz de indicação pisca rapidamente. Caso isso não aconteça, mantenha a tecla touch pressionada por aproximadamente 15 segundos. A luz de indicação deve começar a piscar rapidamente. Certifique-se que seu smartphone esteja conectado à uma rede Wi-Fi 2,4 GHz com acesso à internet.
                    	</Text>
                    	<Image
                        	source={require('../assets/images/interruptor-no-app.jpg')}
                        	style={{ width: '100%', maxWidth: 350 }}
                        	resizeMode="contain"
                    	/>
                    	<Text style={{marginBottom: 16}}>Modo AP</Text>
                    	<Text style={{marginBottom: 16}}>
                        	Para iniciar a instalação nesse modo, certifique-se que a luz de indicação do produto esteja piscando rapidamente. Com o produto já piscando rapidamente, repita o procedimento de manter a tecla touch pressionada por aproximadamente 15 segundos. A luz de indicação deverá começar a piscar lentamente.
                    	</Text>
                    	<Image
                        	source={require('../assets/images/interruptor-no-app.jpg')}
                        	style={{ width: '100%', maxWidth: 350 }}
                        	resizeMode="contain"
                    	/>
                    	<Text style={{marginBottom: 16}}>
                        	Com a luz piscando de maneira correta, marque o campo A luz pisca lentamente e pressione o botão próximo. Você será direcionado para tela abaixo.
                    	</Text>
                    	<Text style={{marginBottom: 16}}>
                        	O modo BLE (Bluetooth Low Energy) é o modo mais simples e rápido de emparelhamento disponível no Mibo Smart. Para se conectar em um dispositivo, primeiramente certifique-se que o Bluetooth do seu celular esteja ativo. Entre no modo de emparelhamento EZ seguindo o manual de instruções do mesmo. Em poucos segundos o dispositivo será encontrado automaticamente. Escolha a rede que deseja utilizar para conexão (2,4 GHz), insira a senha e avance. No final deste processo seu dispositivo estará conectado e disponível para operação.
                    	</Text>
                    	<Image
                        	source={require('../assets/images/modo-ble.jpg')}
                        	style={{ width: '100%', maxWidth: 350 }}
                        	resizeMode="contain"
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P037",
            	question: "Posso ligar interruptor three-way no minicontrolador?",
            	answer: (
                	<>
                    	<View>
                        	<Text style={{marginBottom: 16}}>
                            	Sim, é possível conectar interruptor three-way no minicontrolador. Para isso conecte um fio entre o S1 e a segunda saída do interruptor three way, conforme o esquema a seguir:
                        	</Text>
                    	</View>
                    	<Image
                        	source={require('../assets/images/minicontrolador.jpg')}
                        	style={{ width: '100%', maxWidth: 350 }}
                        	resizeMode="contain"
                    	/>
                	</>
            	)
        	}
    	]
	},
	{
    	id: "voice-assistants",
    	name: "Alexa e Google Assistente",
    	items: [
        	{
            	id: "P032",
            	question: "Os dispositivos inteligentes da linha Mibo possuem integração com Alexa?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 10 }}>
                        	Sim, eles possuem integração com Alexa. Caso tenhas dúvidas sobre como conectar os seus dispositivos ao seu assistente de voz, assista o vídeo abaixo e saiba como fazer a vinculação com sua conta Alexa:
                    	</Text>
                    	<iframe
                        	className="yvideo"
                        	src="https://www.youtube.com/embed/ag_BBmYIzsc"  
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	style={{ width: '100%', height: 200 }}
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P033",
            	question: "Os dispositivos inteligentes da linha Mibo possuem integração com Google Assistant?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 10 }}>
                        	Sim, eles possuem integração com Google Assistant. Caso tenhas dúvidas sobre como conectar os seus dispositivos ao seu assistente de voz, assista o vídeo abaixo e saiba como fazer a vinculação com sua conta Google Assistant:
                    	</Text>
                    	<iframe
                        	className="yvideo"
                        	src="https://www.youtube.com/embed/STiY9wznk5s"  
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	style={{ width: '100%', height: 200 }}
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P047",
            	question: "Posso controlar meus dispositivos smart por comandos de voz?",
            	answer: (
                	<>
                    	<View style={{ marginBottom: 16 }}>
                        	<Text>
                            	Sim, você pode controlar por voz através de um speaker como a Alexa ou Google Home. Para isso é necessário ter o dispositivo adicionado à conta do Mibo Smart e vinculá-la ao aplicativo da Alexa, por exemplo, por meio da skill.
                        	</Text>
                    	</View>
                    	<View style={{ marginBottom: 16 }}>
                        	<Text>Para baixar a skill, veja o passo a passo no link:</Text>
                        	<Text
                            	style={{ color: 'green' }}
                            	onPress={() => Linking.openURL('https://backend.intelbras.com/sites/default/files/2021-05/como-ativar-a-skill-izy-smart-no-aplicativo-amazon-alexa.pdf')}
                        	>
                            	Link de vídeo passo a passo!
                        	</Text>
                    	</View>
                	</>
            	)
        	},
        	{
            	id: "P079",
            	question: "Posso comandar os dispositivos e cenas através de comandos de voz no aplicativo Mibo Smart?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Sim. Para isso, você precisa vincular sua conta Mibo Smart com algum dos assistentes virtuais compatíveis, Amazon Alexa e/ou Google Assistente. Você pode fazer isso através das configurações de sua conta no aplicativo Mibo Smart, ou através dos aplicativos dos assistentes.
                    	</Text>
                    	<Text style={{ marginBottom: 16 }}>
                        	Por exemplo, no caso da Amazon Alexa, basta procurar e ativar a skill Mibo Smart através do app da Alexa e seguir as instruções apresentadas.
                    	</Text>
                	</>
            	)
        	}
    	]
	},
	{
    	id: "mibo-plus-cloud",
    	name: "Mibo+ e Mibo Cloud",
    	items: [
        	{
            	id: "P003",
            	question: "Como saber se meu Mibo Cloud foi cancelado com sucesso?",
            	answer: (
                	<>
                    	<Text>Para saber se seu cloud foi cancelado com sucesso, siga os passos abaixo:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>1. Clique no ícone de nuvem ao lado do nome da câmera.</Text>
                    	<Image
                        	source={require('@/assets/images/Cloud.jpg')}
                        	style={{ width: '100%', height: 200 }}
                        	resizeMode="contain"
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text>2. Verifique o ticket de gravação em nuvem. Caso não haja nada escrito no canto inferior direito do ticket, ele está cancelado.</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>Cloud cancelado:</Text>
                    	<Image
                        	source={require('../assets/images/Ticket1.png')}
                        	style={{ width: '100%', height: 200 }}
                        	resizeMode="contain"
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text>Cloud não cancelado:</Text>
                    	<Image
                        	source={require('../assets/images/Ticket2.png')}
                        	style={{ width: '100%', height: 200 }}
                        	resizeMode="contain"
                    	/>
                    	<Text style={{ fontSize: 18, marginTop: 20 }}>
                        	Caso ele não tenha sido cancelado e você queira cancelá-lo, siga os procedimentos abaixo:
                    	</Text>
                    	<Text style={{ fontSize: 16, marginTop: 20 }}>Cancelamento do Cloud no Android:</Text>
                    	<Text style={{ marginTop: 10 }}>Selecione o card do plano que deseja cancelar.</Text>
                    	<Image
                        	source={require('../assets/images/Ticket3.png')}
                        	style={{ width: '100%', maxWidth: 350, marginTop: 10 }}
                    	/>
                    	<Text style={{ marginTop: 10 }}>Em seguida, clique em Cancelar renovação automática.</Text>
                    	<Image
                        	source={require('../assets/images/Cancelar.png')}
                        	style={{ width: '100%', maxWidth: 350, marginTop: 10 }}
                    	/>
                    	<Text style={{ marginTop: 10 }}>Pronto, seu Plano de gravação em nuvem está cancelado.</Text>
                    	<Text style={{ fontSize: 16, marginTop: 20 }}>Cancelamento do Cloud no iOS:</Text>
                    	<iframe
                        	width="100%"
                        	height="200"
                        	src="https://www.youtube.com/embed/h8P3E9lbdO8"
                    	/>
                    	<Text style={{ marginTop: 10 }}>Selecione o card do plano que deseja cancelar.</Text>
                    	<Image
                        	source={require('../assets/images/imagem1_ios.png')}
                        	style={{ width: '100%', maxWidth: 350, marginTop: 10 }}
                    	/>
                    	<Text style={{ marginTop: 10 }}>Em seguida clique em Gerenciar assinaturas.</Text>
                    	<Image
                        	source={require('../assets/images/imagem2_ios.png')}
                        	style={{ width: '100%', maxWidth: 350, marginTop: 10 }}
                    	/>
                    	<Text style={{ marginTop: 10 }}>Acesse o plano ativo que deseja cancelar.</Text>
                    	<Image
                        	source={require('../assets/images/imagem3_ios.png')}
                        	style={{ width: '100%', maxWidth: 350, marginTop: 10 }}
                    	/>
                    	<Text style={{ marginTop: 10 }}>Clique em Cancelar assinatura.</Text>
                    	<Image
                        	source={require('../assets/images/imagem4_ios.png')}
                        	style={{ width: '100%', maxWidth: 350, marginTop: 10 }}
                    	/>
                    	<Text style={{ marginTop: 10 }}>Pronto, seu Plano de gravação em nuvem está cancelado.</Text>
                    	<Text style={{ fontSize: 12, marginTop: 20, fontStyle: 'italic' }}>
                        	*Obs: Após cancelar o Cloud no iOS a mensagem de renovação automática continuará aparecendo.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P004",
            	question: "Como saber se meu Mibo+ foi cancelado com sucesso?",
            	answer: (
                	<>
                    	<Text>Clique no ícone de serviços presente no rodapé do app</Text>
                    	<Image
                        	source={require('../assets/images/mibo+.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text style={{marginTop:16, marginBottom:16}}>Dentro do menu de serviços, clique em "Gerenciar planos"</Text>
                    	<Image
                        	source={require('../assets/images/gerenciar_mibo+.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text style={{marginTop:16, marginBottom:16}}>Selecione a câmera desejada:</Text>
                    	<Image
                        	source={require('../assets/images/selecao_mibo+.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text style={{marginTop:16, marginBottom:16}}>
                        	Verifique o <Text style={{ fontStyle: 'italic' }}>ticket</Text> do Mibo+. Caso não haja nada escrito no canto inferior direito do <Text style={{ fontStyle: 'italic' }}>ticket</Text>, ele está cancelado.
                    	</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Mibo+ cancelado:</Text>
                    	<Image
                        	source={require('../assets/images/Ticket11.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text style={{ fontWeight: 'bold' }}>Mibo+ não cancelado:</Text>
                    	<Image
                        	source={require('../assets/images/Ticket22.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Caso ele não tenha sido cancelado e você queira cancelá-lo, siga os procedimentos abaixo:</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Cancelamento do Mibo+ no Android:</Text>
                    	<View style={{ marginBottom: 20 }}>
                        	<iframe
                            	width="100%"
                            	height="300"
                            	src="https://www.youtube.com/embed/jZNby7jxjk0"
                            	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            	allowFullScreen
                        	/>
                    	</View>
                    	<Text style={{marginTop:16, marginBottom:16}}>Selecione o card do plano que deseja cancelar:</Text>
                    	<Image
                        	source={require('../assets/images/Ticket3.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Em seguida, clique em <Text style={{ fontStyle: 'italic' }}>Cancelar renovação automática.</Text></Text>
                    	<Image
                        	source={require('../assets/images/Cancelar.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Pronto, seu Mibo+ está cancelado.</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Cancelamento do Mibo+ no iOS:</Text>
                    	<View style={{ marginBottom: 20 }}>
                        	<iframe
                            	width="100%"
                            	height="300"
                            	src="https://www.youtube.com/embed/821eP8DQd7A"
                            	frameBorder="0"
                            	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            	allowFullScreen
                        	/>
                    	</View>
                    	<Text>Selecione o card do plano que deseja cancelar:</Text>
                    	<Image
                        	source={require('../assets/images/imagem1_ios.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Em seguida clique em Gerenciar assinaturas.</Text>
                    	<Image
                        	source={require('../assets/images/imagem2_ios.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Acesse o plano ativo que deseja cancelar</Text>
                    	<Image
                        	source={require('../assets/images/imagem3_ios.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Clique em Cancelar assinatura.</Text>
                    	<Image
                        	source={require('../assets/images/imagem4_ios.png')}
                        	style={{ width: '100%', maxWidth: 350 }}
                    	/>
                    	<Text>Pronto, seu Mibo+ está cancelado.</Text>
                    	<Text style={{ fontWeight: 'bold' }}>
                        	*Obs: Após cancelar o Mibo+ no iOS a mensagem de renovação automática continuará aparecendo
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P015",
            	question: "Quando minha câmera irá fazer gravação em nuvem?",
            	answer: (
                	<>
                    	<Text>A câmera vai realizar gravações sempre que ocorrer um evento: detecção de movimento.</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontStyle: 'italic' }}>Atenção! Quando você contrata um plano de gravação em nuvem ele é valido apenas para a câmera selecionada. Caso deseje contratar o serviço em nuvem para mais de uma câmera, você precisa adquirir um plano para cada dispositivo.</Text>
                	</>
            	)
        	},
        	{
            	id: "P016",
            	question: "Como contratar o Mibo Cloud?",
            	answer: (
                	<>
                    	<Text>Para contratar um plano Mibo Cloud, siga os passos mostrados a seguir:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Contratação pelo Android:</Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/cnJoFNquCjo"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text style={{ fontWeight: 'bold' }}>Contratação pelo iOS:</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/Y5MypUNeoMk"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text>1. Clique no ícone de gravação em nuvem da sua câmera;</Text>
                    	<Text>2. Aceite os termos e aperte o botão de escolha de plano;</Text>
                    	<Text>3. Selecione o plano que deseja e clique em "Nova Assinatura";</Text>
                    	<Text>4. Selecione a quantidade de câmeras que você deseja contratar o plano escolhido (Você poderá alterar essa opção posteriormente); Além disso, selecione se o plano será renovado mensalmente ou anualmente.</Text>
                    	<Text>5. Após apertar no botão de compra, preencha seus dados pessoais e prossiga para a compra;</Text>
                    	<Text>6. A etapa do pagamento e gerenciamento de assinaturas será feita pela Apple, é importante que você adicione o seu cartão caso não tenha adicionado anteriormente na sua conta;</Text>
                    	<Text>7. Pronto! Agora você já é um usuário Mibo Cloud, podendo ver as suas gravações na câmera escolhida.</Text>
                	</>
            	)
        	},
        	{
            	id: "P017",
            	question: "Cupons de desconto",
            	answer: (
                	<>
                    	<iframe
                        	src="https://www.youtube.com/embed/37nzSKLo47c"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text>Abaixo entenda quais as possibilidades de campanhas de coupons</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Cupom de desconto no primeiro pagamento</Text>
                    	<Text>Este cupom garante desconto no seu primeiro pagamento.</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Cupom de desconto para vários meses</Text>
                    	<Text>Este cupom garante desconto em todos os pagamento por um determinado período de tempo.</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Mega cupom de desconto vitalício</Text>
                    	<Text>Este cupom garante um desconto em todas as suas faturas até o cancelamento do plano Mibo Cloud ou Mibo+.</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Cupom 2 meses pelo preço de 1</Text>
                    	<Text>Este cupom faz com que o seu segundo pagamento tenha 100% de desconto.</Text>
                    	<Text style={{ fontStyle: 'italic' }}>Obs.: No seu primeiro pagamento você receberá um desconto de R$0,01 e no segundo receberá uma cobrança de R$0,01</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Cupom 2 anos pelo preço de 1</Text>
                    	<Text>Este cupom faz com que o seu segundo pagamento tenha 100% de desconto.</Text>
                    	<Text style={{ fontStyle: 'italic' }}>Obs.: No seu primeiro pagamento você receberá um desconto de R$0,01 e no segundo receberá uma cobrança de R$0,01</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontStyle: 'italic' }}>Obs.: O sistema operacional iOS não possui acesso aos cupons de desconto aplicados para o Android</Text>
                	</>
            	)
        	},
        	{
            	id: "P018",
            	question: "Cartão virtual",
            	answer: (
                	<>
                    	<Text>O Cartão Virtual Mibo Cloud é mais uma maneira de você adquirir seu plano de gravação Mibo Cloud.</Text>
                    	<Text>Os cartões virtuais e Kits de câmeras com cartões virtuais estão disponiveis na </Text>
                    	<Text style={{ color: 'green' }} onPress={() => Linking.openURL('https://loja.intelbras.com.br/')}>
                        	loja Intelbras
                    	</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>Ao comprar o plano, você receberá um código via e-mail. Com o código em mãos e para entender melhor onde utilizá-lo, assista o vídeo abaixo:</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/GfzwOK1v_Y0"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P019",
            	question: "Como exportar eventos para a galeria? (Mibo Cloud)",
            	answer: (
                	<>
                    	<Text>Com o aplicativo Mibo Smart aberto, siga os procedimentos abaixo:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>1. Clique sobre o evento que deseja salvar</Text>
                    	<Text>2. Clique no ícone de download</Text>
                    	<Text>3. Aguarde o download do evento</Text>
                    	<Text>4. Volte para a tela inicial e clique em "Mais"</Text>
                    	<Text>5. Clique em "Arquivo local"</Text>
                    	<Text>6. Pressione e segure para selecionar a gravação</Text>
                    	<Text>7. Clique no ícone exportar (localizado entre o ícone de compartilhamento e o de exclusão)</Text>
                    	<Text>8. Aguarde a exportação e abra a galeria</Text>
                	</>
            	)
        	},
        	{
            	id: "P020",
            	question: "Como solicitar um reembolso?",
            	answer: (
                	<>
                    	<Text>Para solicitar um reembolso siga os procedimentos abaixo:</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/bcKhuFLCLXU"
                        	style={{ width: '100%', maxWidth:360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Reembolso no Android:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>Por favor, entre em contato com o nosso e-mail de suporte: mibocam@intelbras.com.br</Text>
                    	<Text>{'\n'}</Text>
                    	<Text style={{ fontWeight: 'bold' }}>Reembolso no iOS:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>Para tratar o reembolso no iOS, você deve entrar em contato com a Apple. Para fazer isso, siga os passos a seguir:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>1. Acesse o site </Text>
                    	<Text style={{ color: 'green' }} onPress={() => Linking.openURL('https://reportaproblem.apple.com/?s=6')}>
                        	reportaproblem.apple.com
                    	</Text>
                    	<Text>2. Selecione a opção "Eu gostaria de... Solicitar um reembolso"</Text>
                    	<Text>3. Informe o motivo do reembolso</Text>
                    	<Text>4. Selecione o plano que deseja reembolsar e envie.</Text>
                    	<Text>5. A Apple entrará em contato em até 48 horas.</Text>
                	</>
            	)
        	},
        	{
            	id: "P021",
            	question: "Como alterar/atualizar o seu plano Mibo Cloud?",
            	answer: (
                	<>
                    	<Text>Para alterar o seu plano siga os procedimentos abaixo:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text><b>Alteração no Android:</b></Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/qcPr9yopN7g"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text><b>Alteração no iOS:</b></Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/ihCCnZDC0n4"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P023",
            	question: "Como contratar o Mibo+?",
            	answer: (
                	<>
                    	<Text>Para contratar um plano Mibo+, siga os passos mostrados a seguir:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text><b>Contratação pelo Android:</b></Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/SNLoNQJCqNM"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text><b>Contratação pelo iOS:</b></Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/Wsqjsef1qK0"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                    	<Text>{'\n'}</Text>
                    	<Text><b>1.</b> Clique no ícone de gravação em nuvem da sua câmera;</Text>
                    	<Text><b>2.</b> Aceite os termos e aperte o botão de escolha de plano;</Text>
                    	<Text><b>3.</b> Selecione o plano que deseja e clique em "Nova Assinatura;</Text>
                    	<Text><b>4.</b> Selecione a quantidade de câmeras que você deseja contratar o plano escolhido (Você poderá alterar essa opção posteriormente); Além disso, selecione se o plano será renovado mensalmente ou anualmente.</Text>
                    	<Text><b>5.</b> Selecione a quantidade de câmeras que você deseja contratar o plano escolhido (Você poderá alterar essa opção posteriormente); Além disso, selecione se o plano será renovado mensalmente ou anualmente.</Text>
                    	<Text><b>6.</b> Após apertar no botão de compra, preencha seus dados pessoais e prossiga para a compra;</Text>
                    	<Text><b>7.</b> A etapa do pagamento e gerenciamento de assinaturas será feita pela Apple, é importante que você adicione o seu cartão caso não tenha adicionado anteriormente na sua conta;</Text>
                    	<Text><b>8.</b> Pronto! Agora você já é um usuário Mibo+, podendo ver as suas gravações na câmera escolhida.</Text>
                	</>
            	)
        	},
        	{
            	id: "P024",
            	question: "Como exportar eventos para a galeria? (Mibo+)",
            	answer: (
                	<>
                    	<Text><b>Como exportar arquivos para a galeria com o Mibo Cloud/Mibo+?</b></Text>
                    	<Text>{'\n'}</Text>
                    	<Text>Com o aplicativo Mibo Smart aberto, siga os procedimentos abaixo:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text>1. Clique sobre o evento que deseja salvar</Text>
                    	<Text>2. Clique no ícone de download</Text>
                    	<Text>3. Aguarde o download do evento</Text>
                    	<Text>4. Volte para a tela inicial e clique em "Mais"</Text>
                    	<Text>5. Clique em "Arquivo local"</Text>
                    	<Text>6. Pressione e segure para selecionar a gravação</Text>
                    	<Text>7. Clique no ícone exportar (localizado entre o ícone de compartilhamento e o de exclusão)</Text>
                    	<Text>8. Aguarde a exportação e abra a galeria</Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/WP_dINrC_7M"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P026",
            	question: "Como alterar/atualizar o seu plano Mibo+?",
            	answer: (
                	<>
                    	<Text>Para alterar o seu plano siga os procedimentos abaixo:</Text>
                    	<Text>{'\n'}</Text>
                    	<Text><b>Alteração no Android:</b></Text>
                    	<Text>A alteração não pode ser feita em dispositivos Android, para prosseguir com isso o plano deve ser cancelado e contratado novamente.</Text>
                    	<Text>{'\n'}</Text>
                    	<Text><b>Alteração no iOS:</b></Text>
                    	<Text>{'\n'}</Text>
                    	<iframe
                        	src="https://www.youtube.com/embed/IT_LjGsFOmU"
                        	style={{ width: '100%', maxWidth: 360, height: 200 }}
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	allowFullScreen
                    	/>
                	</>
            	)
        	}
    	]
	},
	{
    	id: "smart-locks",
    	name: "Fechaduras Inteligentes",
    	items: [
        	{
            	id: "P034",
            	question: "Posso utilizar a fechadura eletrônica sem o Hub de automação?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 10 }}>
                        	Sim, confira o vídeo a seguir sobre a fechadura IFR e MFR:
                    	</Text>
                    	<iframe
                        	className="yvideo"
                        	src="https://youtu.be/eKTxMX7W0OY"  
                        	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        	style={{ width: '100%', height: 200 }}
                    	/>
                	</>
            	)
        	},
        	{
            	id: "P045",
            	question: "Sinalização com um código no display da fechadura, o que devo fazer?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Todos os nossos modelos possuem códigos que sinalizam o comportamento da fechadura, como por exemplo o código 456. Consulte o manual do usuário no site da Intelbras.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P058",
            	question: "Como fazer o reset da fechadura?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	É possível reiniciar a fechadura.
                    	</Text>
                    	<Text style={{ marginBottom: 16 }}>
                        	O procedimento de reset deve ser realizado através do nosso suporte técnico.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P059",
            	question: "Qual é a frequência da tag de uma fechadura?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Nossa linha de fechaduras digitais possuem a tecnologia RFID com a frequência de operação de <b>13,56 Mhz</b>
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P060",
            	question: "Quais tipos de portas posso instalar a fechadura digital?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Temos vários modelos de fechadura digitais que podem ser instaladas em portas de madeira, metal e vidro.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P061",
            	question: "É possível gerar uma senha para um visitante com uma fechadura digital?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Sim. Pode gerar até 10 senhas dinâmicas e devem conter 6 dígitos. Copie a senha antes de salvar, pois não será possível visualizar mais a senha.
                    	</Text>
                    	<Text>
                        	Caso não se lembre da senha que foi gerada, exclua-a e cadastre-a novamente.               	 
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P063",
            	question: "Como configurar senhas temporárias para visitantes?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	No aplicativo Mibo Smart, acesse o menu da fechadura e selecione "Gerenciar senhas". Clique em "Adicionar senha" e defina:
                    	</Text>
                    	<Text style={{ marginLeft: 10, marginBottom: 5 }}>• O código de 6 dígitos</Text>
                    	<Text style={{ marginLeft: 10, marginBottom: 5 }}>• Período de validade</Text>
                    	<Text style={{ marginLeft: 10, marginBottom: 16 }}>• Número de utilizações permitidas</Text>
                    	<Text style={{ fontStyle: 'italic' }}>
                        	Dica: Sempre teste a senha temporária antes de entregar ao visitante.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P064",
            	question: "A fechadura continua funcionando em caso de queda de energia?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Todas as fechaduras inteligentes Intelbras possuem bateria de backup que garante o funcionamento por vários dias mesmo sem energia elétrica.
                    	</Text>
                    	<Text style={{ fontWeight: 'bold' }}>
                        	Modelos com Wi-Fi: A conexão com o app será perdida durante a queda de energia, mas o funcionamento mecânico (com senha/tag) permanece normal.
                    	</Text>
                	</>
            	)
        	}
    	]
	},
	{
    	id: "sd-cards",
    	name: "Cartões de memória",
    	items: [
        	{
            	id:"P005",
            	question:"Posso ver as gravações do cartão de memória no computador?",
            	answer:(
              	<>
                	<Text>
                	Sim, é possível acessar as gravações do cartão de memória no computador, caso a criptografia da câmera esteja desabilitada.
                	</Text>
                	<Text style={{ marginTop: 20,marginBottom:20 }}>Obs: Não é possível visualizar pelo computador as gravações no período em que a criptografia estiver habilitada.</Text>
                	<Text style={{ marginTop: 20}}>
                	É recomendado utilizar o nosso reprodutor de vídeo{' '}
                	<Text
                  	style={{ color: 'green' }}
                  	onPress={() => Linking.openURL('https://www.intelbras.com/pt-br/software-intelbras-media-player')}
                	>
                  	Intelbras Media Player
                	</Text>
              	</Text>
              	</>
            	)
          	},
           	{
            	id: "P025",
            	question: "Como fazer backup do cartão sd?",
            	answer: (
              	<>
                	<Text>Para fazer o backup, siga os passos mostrados a seguir:</Text>
                	<Text>{'\n'}</Text>
                	<iframe
                  	src="https://www.youtube.com/embed/cnJoFNquCjo"
                  	style={{ width: '100%', maxWidth: 360, height: 200 }}
                  	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  	allowFullScreen
                	></iframe>
              	</>
            	)
          	},
    	]
	},
	{
    	id: "remote-controls",
    	name: "Controles Remotos",
    	items: [
        	{
            	id: "P050",
            	question: "Como instalar os controles remotos Mibo? MCR 1001?",
            	answer: (
              	<>
              	<Text>
              	Certifique-se de que a energia esteja ligada antes de começar a instalação e de que o local de instalação possua sinal Wi-Fi 2,4Ghz.
              	</Text>
       	 
              	<Text>
              	Estando com o produto em mãos, pressione por 5s o botão de Reset (Botão localizado na parte inferior do seu MCS), ao soltar o botão, certifique-se de que o LED localizado na parte da frente do produto passará a piscar
              	</Text>
        	 
              	<iframe className="yvideo" src="https://youtu.be/V_F8uWCKJAQ" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
       	 
              	</>
              	)
            	}    
    	]},
	{
    	id: "controladores",
    	name: "Controladores",
    	items: [
        	{
            	id: "P054",
            	question: "O controlador Wi-fi MCS não está respondendo, o que fazer?",
            	answer: (
              	<>
              	<Text style={{ marginBottom: 16 }}>
                	Existem alguns motivos que podem fazer com que o seu controlador pare de responder. Por favor, verifique os possíveis motivos abaixo:
              	</Text>
     	 
              	<Text style={{ paddingLeft: 16, marginBottom: 16 }}>
                	<Text style={{ fontWeight: 'bold' }}>1.</Text> Certifique-se de que a alimentação esteja conectada e funcionando corretamente.
              	</Text>
     	 
              	<Text style={{ paddingLeft: 16, marginBottom: 16 }}>
                	<Text style={{ fontWeight: 'bold' }}>2.</Text> Verifique o LED, e confira o status na tabela de status de funcionamento do LED deste manual.
              	</Text>
     	 
              	<Text style={{ paddingLeft: 16 }}>
                	<Text style={{ fontWeight: 'bold' }}>3.</Text> Verifique se a sua rede Wi-Fi é 2.4 GHz e o seu roteador está funcionando.
              	</Text>
              	</>
              	)
            	},
            	{
                	id: "P040",
                	question: "Como instalar o controladores MCS 2101 e MCS 2202?",
                	answer: (
                  	<>
                    	<Text style={{marginBottom:16}}>
                    	Todas as conexões devem ser realizadas com a energia desligada para evitar lesões pessoais e dano ao aparelho. Antes de iniciar a instalação,
                    	verifique se o local possui sinal de sua rede Wi-Fi, o que pode ser feito utilizando o seu celular. O produto EWS 211 deve ser instalado onde existe sinal de Wi-Fi 2,4 GHz.
                    	</Text>
           	 
                    	<Text>
                    	Obs. Esse dispositivo não deve ser utilizado no acionamento direto de motores elétricos e equipamentos eletroeletrônicos que possuam corrente de partida maior que a corrente máxima do dispositivo. Por favor, observe os pontos a seguir:
                    	</Text>
                    	<Text  style={{marginBottom:16}}>
                      	Ferramentas necessárias: chave Phillips 3 mm e fita isolante
                    	</Text>
                    	<Text  style={{marginBottom:16}}>
                    	Não deve ser conectado mais de 1 fio por borne
                    	</Text>
                    	<Text  style={{marginBottom:16}}>
                    	Verifique as conexões antes de ligar a energia para certificar-se de que não haja um curto-circuito e tenha certeza de que todas as partes vivas estão isoladas
                    	</Text>
                    	<Text  style={{marginBottom:16}}>
                    	Para sua segurança, não abra o produto sob nenhuma circunstância
                    	</Text>
           	 
                    	<Text  style={{marginBottom:16}}>
                    	Passo a passo da instalação:
                    	</Text>
                    	<iframe className="yvideo" src="https://www.youtube.com/embed/X15nbBc9LeI" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
           	 
                	</>
                	)
              	},
              	{
                	id: "P036",
                	question: "Posso alimentar o minicontrolador smart com alimentação DC?",
                	answer: (
                  	<>
                    	<Text>
                        	A alimentação do minicontrolador smart é bivolt, e ele deve ser conectado em uma rede 220V ou 127V.
                    	</Text>
                	</>
                	)
              	},
            	{
                	id: "P055",
                	question: "O Controlador Wi-fi MCS não consegue se conectar à minha rede Wi-Fi.",
                	answer: (
                  	<>
                  	<Text style={{ marginBottom: 16 }}>
                  	Desligue o roteador e o produto e aguarde 10s e ligue novamente. Caso necessário, refaça a configuração do produto pressionando a tecla Reset por 5s. Siga as instruções no aplicativo para concluir a configuração de Wi-Fi.
                 	 
                  	</Text>
         	 
                  	<Text style={{ marginBottom: 16 }}>
                  	Certifique-se que seu dispositivo está conectado à mesma rede para realizar a configuração.
                  	</Text>
         	 
                  	</>
                  	)
                	}
    	]
	},
	{
    	id: "cams",
    	name: "Câmeras",
    	items: [
        	{
            	id: "P001",
            	question: "Quantos dispositivos podem acessar minha câmera simultaneamente?",
            	answer: (
              	<>
                	<Text>Sua câmera Mibo pode ser acessada por até 7 usuários simultaneamente.</Text>
                	<Text>{'\n'}</Text>
                	<Text><Text style={{fontStyle: 'italic'}}>Obs.</Text>: lembrando que dependendo do seu cenário de rede, a conexão pode ficar mais lenta quando há vários usuários acessando simultaneamente.</Text>
              	</>
            	)
          	},
          	{
            	id: "P002",
            	question: "Posso adicionar as câmeras da linha iM no meu DVR ou NVR?",
            	answer: (
              	<>
                	<Text>Sim, você pode adicionar suas câmeras da linha iM a DVR's e NVR's pois possuem os protocolos Intelbras-1 e Onvif.</Text>
                	<Text>{'\n'}</Text>
              	</>
            	)
          	},
          	{
            	id:"P008",
            	question:"Como manter minha câmera atualizada?",
            	answer:(
              	<>
          	<Text style={{ marginBottom: 10 }}>
            	Primeiro, verifique se a câmera já está atualizada executando os passos a seguir:
          	</Text>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	1. Selecione o ícone de engrenagem que fica ao lado do nome da câmera.
          	</Text>
          	<Image
            	source={require('../assets/images/engrenagem.jpeg')}
            	style={{ width: '95%', maxWidth: 350, marginBottom: 10 }}
          	/>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	2. Verifique se, na caixa versão da câmera aparece um círculo vermelho na parte superior direita.
          	</Text>
          	<Image
            	source={require('../assets/images/atualizacao.jpeg')}
            	style={{ width: '95%', maxWidth: 350, marginBottom: 10 }}
          	/>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	Caso não apareça, o dispositivo já está atualizado. Se aparecer, existe uma nova atualização para a câmera e você deverá seguir os passos abaixo para atualizá-la.
          	</Text>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	3. Ainda na tela de configurações, selecione a opção <Text style={{ fontStyle: 'italic' }}>Versão da câmera.</Text>
          	</Text>
          	<Image
            	source={require('../assets/images/atualizacao2.jpeg')}
            	style={{ width: '95%', maxWidth: 350, marginBottom: 10 }}
          	/>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	4. Na tela que será aberta, selecione a opção <Text style={{ fontStyle: 'italic' }}>Atualizar</Text>.
          	</Text>
          	<Image
            	source={require('../assets/images/atualizar.jpeg')}
            	style={{ width: '95%', maxWidth: 350, marginBottom: 10 }}
          	/>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	5. Ao aparecer a notificação abaixo, selecione a opção <Text style={{ fontStyle: 'italic' }}>Iniciar a atualização</Text>.
          	</Text>
          	<Image
            	source={require('../assets/images/atualizar2.jpeg')}
            	style={{ width: '95%', maxWidth: 350, marginBottom: 10 }}
          	/>
         	 
          	<Text style={{ marginLeft: 10, marginBottom: 5 }}>
            	Agora aguarde que a versão mais atual de firmware seja baixada e a câmera, atualizada.
          	</Text>
        	</>
            	)
          	},
          	{
            	id:"P0010",
            	question:"Não consigo adicionar minha câmera IM",
            	answer:(
              	<>
          	<Text style={{ marginBottom: 10 }}>
            	Alguns roteadores possuem características que dificultam a adição das câmeras Mibo de forma normal. Caso esteja enfrentando alguma dificuldade similar, siga o passo a passo:
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	1. Para adicionar um dispositivo via Wi-Fi clique no botão de “+”.
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	2. Com a câmera ligada à alimentação, faça a leitura do QR code da etiqueta ou escolha a opção “Adição de número de série”.
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	3. Leia a mensagem que aparece na tela do seu celular para garantir que o dispositivo está pronto para a configuração e, em seguida, clique em “Próximo”.
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	4. O celular será conectado ao Wi-Fi da câmera para enviar as informações de rede.
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	<Text style={{ fontStyle: 'italic' }}><b>Obs.</b>: Caso haja problemas na conexão, siga o passo a passo que é apresentado na tela para efetuar a configuração.</Text>
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	5. Selecione a rede Wi-Fi que deseja conectar o dispositivo.
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	6. Aguarde até 120 segundos para a conexão. Caso a câmera não se conecte nesse tempo, tente novamente e, se mesmo assim o problema persistir, pressione o botão “Voltar” no canto superior esquerdo da tela.
          	</Text>
       	 
          	<Text style={{ marginLeft: 10, marginBottom: 10 }}>
            	7. Siga novamente o passo a passo e faça a leitura do QR Code.
          	</Text>
        	</>
            	)
          	},
          	{
            	id: "P013",
            	question: "Minha câmera esta com faixas na imagem, o que fazer?",
            	answer: (
              	<>
                	<Text>Em alguns casos, a frequência das lâmpadas de LED podem interferir com a frequência do obturador da câmera, causando as faixas escuras. Caso você perceba que a sua câmera possui interferência de faixas escuras, entre em contato com o nosso suporte técnico para realizar os ajustes necessários na imagem.</Text>
                	<Image source={require('../assets/images/Flickers.png')} style={{ width: '100%', maxWidth: 350 }} />
              	</>
            	)
          	},
          	{
            	id: "P014",
            	question: "Minha câmera travou após atualização, o que eu faço?",
            	answer: (
              	<>
                	<Text>Quando ocorre o travamento da câmera durante a atualização de firmware, o LED dela ficará vermelho constante e não irá realizar a conexão com rede.</Text>
                	<Text>{'\n'}</Text>
                	<Text>Para tentar recuperar a câmera é necessário o procedimento descrito no tutorial abaixo:</Text>
                	<Text>{'\n'}</Text>
                	<Text style={{ color: 'green' }} onPress={() => Linking.openURL('https://backend.intelbras.com/sites/default/files/2021-05/atualizacao-firmware-im3-e-im4-cartao-sd.pdf')}>
                  	Tutorial técnico
                	</Text>
                	<Text>{'\n'}</Text>
                	<Text>Caso tenha dúvidas e necessitando maiores informações, favor acessar nosso suporte.</Text>
              	</>
            	)
          	},
          	{
            	id: "P027",
            	question: "Quais as formas de gravações das câmeras?",
            	answer: (
              	<>
          	<View>
           	 
            	<View style={{ padding: 10 }}>
              	<Text>Existem 3 formas de configurar a gravação da sua câmera Mibo Smart:</Text><br />
              	<View style={{ paddingLeft: 20 }}>
                	<Text>- Gravação contínua: a câmera irá gravar continuamente no cartão de memória</Text><br />
                	<Text>- Detecção de movimento: a câmera inicia a gravação sempre que houver algum tipo de movimento dentro do campo de visão</Text><br />
                	<Text>- Detecção de ruídos: a câmera inicia a gravação sempre que houver algum ruído no ambiente</Text><br />
              	</View>
              	<Text>
                	<Text style={{ fontStyle: 'italic' }}>
                  	<Text style={{ fontWeight: 'bold' }}>Obs.</Text>: a gravação por detecção de movimento pode ser utilizada em conjunto com a gravação por detecção de ruídos.{' '}
                	</Text>
                	<Text style={{ fontStyle: 'italic' }}>
                  	As notificações de eventos irão continuar mesmo após habilitar a gravação contínua.
                	</Text>
              	</Text>
            	</View>
          	</View>
       	 
              	</>
            	)
          	},
          	{
            	id: "P029",
            	question: "Como exportar eventos para a galeria?",
            	answer: (
              	<>
              	<View>
                  	<Text>Com o aplicativo Mibo Smart aberto, siga os procedimentos abaixo:</Text>
                  	<Text style={{marginTop:16}}>
                    	1. Clique sobre o evento que deseja salvar
                  	</Text>
                    	<Text style={{marginTop:16}}>
       	 
                    	2. Clique no ícone de gravação
                    	</Text>
                    	<Text style={{marginTop:16}}>
       	 
                    	3. Aguarde o trecho de interesse ser reproduzido e clique novmente no ícone para finalizar
                    	</Text>
                    	<Text style={{marginTop:16,marginBottom:16}}>
                    	4. Volte para a tela inicial e clique em "Mais"
                  	</Text>
                  	<iframe className="yvideo" src="https://www.youtube.com/embed/67I-xAmtVyY"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
              	</View>
              	</>
            	)
          	},
          	{
            	id: "P035",
            	question: "Parou de funcionar após mudança da chave de acesso, o que fazer?",
            	answer: (
              	<>
          	 
            	<Text style={{ flex: 1 }}>
              	Caso você esteja utilizando o protocolo INTELBRAS-1, você também deverá alterar a chave de acesso no DVR para manter a conexão entre a câmera e o gravador.
            	</Text>
            	<Text style={{ fontWeight: 'bold' }}>
              	Obs. Caso esteja utilizando o protocolo ONVIF, mesmo alterando a chave de acesso, a senha utilizada para cadastro da câmera no gravador deve ser a chave de acesso presente na etiqueta.
            	</Text>
       	 
        	</>
       	 
            	)
          	},

    	]
	},
	{
    	id: "sensors",
    	name: "Sensores Inteligentes",
    	items: [
        	{
            	id: "P062",
            	question: "O sensor de abertura MSA 1001 não está acionando, o que fazer?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Certifique que a bateria está encaixada de forma correta.                 	 
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P064",
            	question: "Posso utilizar o sensor de abertura MSA 1001 em locais externos?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	O sensor de abertura sem fio não. O Sensor MSA 1001 e o ISA 1001 foram desenvolvidos para uso interno.
                    	</Text>
                    	<Text style={{ fontStyle: 'italic' }}>
                        	Para áreas externas, recomendamos utilizar os modelos específicos para ambientes externos da linha Intelbras.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P065",
            	question: "Posso instalar meu sensor MSA 1001 em superfícies metálicas?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Podem sim, porém a instalação em superfícies metálicas podem diminuir o alcance da comunicação com a central.
                    	</Text>
                    	<Text style={{ fontWeight: 'bold' }}>
                        	Dica: Para melhor desempenho em superfícies metálicas, utilize a base de instalação opcional com isolamento.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P066",
            	question: "Qual altura mais adequada para instalação do sensor MSM 1001?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	A distância máxima entre as partes deve ser de 2 cm, e é recomendável que:
                    	</Text>
                    	<Text style={{ marginLeft: 10, marginBottom: 5 }}>• A parte principal seja instalada no lado fixo do local escolhido,</Text>
                    	<Text style={{ marginLeft: 10, marginBottom: 16 }}>• Enquanto a parte magnética no lado móvel</Text>
                    	
                	</>
            	)
        	},
        	{
            	id: "P067",
            	question: "O sensor MSM 1001 é conectado a minha rede Wi-Fi?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Não. Por se tratar de uma tecnologia Zigbee, ele necessitará de um Hub ICA 1001 ou MCA 1001 para conexão.
                    	</Text>
                    	
                	</>
            	)
        	},
        	{
            	id: "P068",
            	question: "Qual a distância máxima de alcance do sensor MSM 1001?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	O sensor detecta movimentos até 8m de distância, com um ângulo de detecção de 90°.
                    	</Text>
                    	<Text style={{ fontStyle: 'italic' }}>
                        	Obs: Paredes e obstáculos podem reduzir este alcance. Em ambientes abertos sem obstruções, o alcance pode ser maior.
                    	</Text>
                	</>
            	)
        	},
        	{
            	id: "P030",
            	question: "Como funciona a função detecção de pessoas?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 16 }}>
                        	Quando habilitada, a câmera irá enviar notificações somente se houver uma pessoa no campo de visão. As gravações da nuvem e cartão de memória seguem sendo por movimento.
                    	</Text>
                    	
                	</>
            	)
        	},
        	{
            	id: "P031",
            	question: "Como funciona o gráfico de sensibilidade?",
            	answer: (
                	<>
                    	<Text style={{ marginBottom: 10 }}>
                        	Para entender o gráfico de sensibilidade, precisamos conhecer seus principais componentes: a linha de limiar e as linhas de gatilho de sensibilidade.
                    	</Text>
                    	<Image
                        	source={require('../assets/images/Gráfico.png')}
                        	style={{ width: '100%', maxWidth: 350, marginBottom: 10 }}
                        	resizeMode="contain"
                    	/>
                    	<Text style={{ marginBottom: 10 }}>
                        	A linha de limiar define o quanto de movimento é necessário para ativar a função <Text style={{ fontStyle: 'italic' }}>Detecção de movimento</Text>.
                    	</Text>
                	</>
            	)
        	}
    	]
	}
];

export default faqDataMibo;
