import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Text, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

type AccordionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  autoOpen?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  autoOpen = true,
  style,
  contentStyle,
  headerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(autoOpen ? 1 : 0)).current;

  const measureContent = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <View style={style}>
      <TouchableOpacity 
        onPress={toggleOpen} 
        activeOpacity={0.6}
        style={headerStyle}
        accessible
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        {typeof title === 'string' ? <Text>{title}</Text> : title}
      </TouchableOpacity>
      
      <Animated.View 
        style={[
          styles.content,
          contentStyle,
          {
            height: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, contentHeight],
            }),
            opacity: heightAnim,
          }
        ]}
      >
        <View onLayout={measureContent} style={styles.childrenContainer}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    overflow: 'hidden',
  },
  childrenContainer: {
    position: 'absolute',
    width: '100%',
  },
});

export default Accordion;