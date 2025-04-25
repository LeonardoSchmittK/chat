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
  Image as RNImage,
  Linking
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import WebView from 'react-native-webview';
import { Image } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Path, SvgXml } from 'react-native-svg';
import faqDataMibo from './FAQMiboData';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
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



const DispositivosIzyDropdown: React.FC = () => {
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
          <Text style={styles.title}>Dispositivos Mibo</Text>
          <Text style={styles.subtitle}>Perguntas frequentes</Text>
        </View>
        <Animated.View style={[{ transform: [{ rotate }] }, styles.chevronCircle]}>
          <Entypo name="chevron-down" size={18} color="rgba(22, 49, 52, 1)" />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <ScrollView style={styles.content}>
          {faqDataMibo.map((faq) => (
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

export default DispositivosIzyDropdown;