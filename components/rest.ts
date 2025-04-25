

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
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

  {/* <WebView
    source={{ uri: 'https://www.youtube.com/embed/xW69qn11_30' }}
    style={{ height: 200, marginTop: 10 }}
  /> */}

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

  <WebView
    source={{ uri: 'https://www.youtube.com/embed/h8P3E9lbdO8' }}
    style={{ height: 200, marginTop: 10 }}
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
    id:"P004",
    question:"Como saber se meu Mibo+ foi cancelado com sucesso?",
    answer:(
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
            Verifique o <Text style={{ fontStyle: 'italic' }}>ticket</Text> do Mibo+. Caso não haja nada escrito no canto inferior direito do <Text style={{ fontStyle: 'italic' }}>ticket</Text>, ele está cancelado. Se estiver com a frase “Renovação automática” sendo exibida no canto inferior direito do <Text style={{ fontStyle: 'italic' }}>ticket</Text>, o Mibo+ não foi cancelado (Com exceção dos dispositivos iOS em que o status da assinatura deve ser observado dentro das configurações de assinatura do dispositivo).
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
        <Text>
          Caso ele não tenha sido cancelado e você queira cancelá-lo, siga os procedimentos abaixo:
        </Text>

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
    ),
  },{
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
  },{
    id:"P006",
    question:"Como adicionar as suas câmeras ao gravador?",
    answer:(
      <>
  <Text style={{ marginBottom: 10 }}>
    As câmeras da linha Mibo são compatíveis com os protocolos ONVIF (Perfil S) e Intelbras-1, sendo assim, podem ser conectadas a DVRs e a NVRs, desde que estes sejam compatíveis com os protocolos mencionados.
  </Text>

  <Text style={{ marginBottom: 10, paddingLeft: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>1.</Text> Para utilizar sua câmera com um DVR ou NVR, é preciso primeiro adicioná-la a seu aplicativo. Para isso é necessário que o local tenha internet, conforme descrito em Adicionando uma câmera à conta Mibo, e que você utilize a mesma rede que seu gravador utiliza.
  </Text>

  <Text style={{ marginBottom: 10, paddingLeft: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>2.</Text> Para o perfeito funcionamento da câmera nos gravadores é necessário que ela mantenha sempre o mesmo endereço IP. Para isso, acesse as configurações da câmera e as opções > Avançado > Desativar a função DHCP.
  </Text>

  <Text style={{ marginBottom: 10, paddingLeft: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>3.</Text> Para conectar a câmera ao gravador você precisará de login e senha, estes são: login -> admin, e senha -> chave de acesso da sua câmera.
  </Text>

  <Text style={{ marginBottom: 10 }}>
    Para conectar a câmera ao gravador você precisará de login e senha, estes são: login -> admin, e senha -> chave de acesso da sua câmera.
  </Text>

  <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
    Atenção: Caso esteja utilizando o protocolo ONVIF, mesmo alterando a chave de acesso, a senha utilizada para cadastro da câmera no gravador deve ser a chave de acesso presente na etiqueta.
  </Text>

  <Text style={{ marginBottom: 10 }}>
    Caso esteja utilizando o protocolo INTELBRAS-1 e o cliente altere a chave de acesso, deve-se alterar a mesma no DVR também para manter a conexão entre câmera e gravador.
  </Text>

  <Text style={{ marginBottom: 10, paddingLeft: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>4.</Text> Para adicionar sua câmera Mibo a algum DVR ou NVR, você deve seguir o mesmo procedimento de busca feito para qualquer câmera IP, de acordo com o modelo de seu gravador.
  </Text>

  <Text style={{ marginBottom: 10, paddingLeft: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>5.</Text> O áudio da câmera Mibo no DVR ou NVR vai funcionar de acordo com a tabela de compatibilidade disponível no link{' '}
    <Text style={{ color: 'green' }} onPress={() => Linking.openURL('https://manual-mibo.intelbras.com.br/pt-br/praticas.html')}>
      clique aqui
    </Text>
  </Text>

  <Text style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>Obs: </Text> em virtude do alto tráfego de dados, o mau dimensionamento da rede pode causar problemas de conexão das câmeras com o DVR, além de comprometer o funcionamento dos demais dispositivos sem fio na rede. Por esse motivo, para o perfeito funcionamento dessa aplicação, recomendamos que o projeto com múltiplas câmeras Wi-Fi leve em consideração a largura de banda disponível e a quantidade de dispositivos conectados à mesma rede.
  </Text>

  <Text style={{ marginBottom: 10 }}>
    Para mais informações,{' '}
    <Text style={{ color: 'green' }} onPress={() => Linking.openURL('https://manual-mibo.intelbras.com.br/pt-br/praticas.html')}>
      clique aqui
    </Text> e acesse nosso guia de boas práticas de câmeras Mibo com gravadores.
  </Text>
</>
    )
  },
  {
    id:"P007",
    question:"Como adiciono câmeras a minha conta Mibo Smart?",
    answer:(
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
  {id:"P009",
    question:"Quantas câmeras posso adicionar a minha conta Mibo Smart?",
    answer:(
      <>
        <Text>Até 32 câmeras por conta</Text>
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
  }

];