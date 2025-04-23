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
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownCard: React.FC = () => {
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
        <View style={styles.content}>
          <Text style={{ color: '#2d2d2d' }}>
            Aqui vai o conteúdo expandido do dropdown.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      backgroundColor:"#fafafa",
      shadowColor: "rgba(118, 118, 128, 0.67)",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      marginBottom:8,
      
    },
    header: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#1c2b2d',
    },
    subtitle: {
      fontSize: 14,
      color: '#4a4a4a',
    },
    content: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    chevronCircle :{
        backgroundColor:"rgba(227, 227, 227, 1)",
        borderRadius:"100%",
        padding:6,
        color:"rgba(22, 49, 52, 1)"
    
    },
    boldIcon: {
        fontWeight:"900"
    }
  });
  

export default DropdownCard;
