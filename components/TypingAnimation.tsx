import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const TypingAnimation = ({ txt }: { txt: string }) => {
  const animatedValues = Array.from({ length: txt.length }, () => useSharedValue(0));

  useEffect(() => {
    animatedValues.forEach((value, index) => {
      setTimeout(() => {
        value.value = withTiming(1, { duration: 10 });
      }, index * 22);
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      {txt.split("").map((char, index) => (
        <Animated.Text key={index} style={{ opacity: animatedValues[index] }}>
          {char}
        </Animated.Text>
      ))}
    </View>
  );
};

export default TypingAnimation;
