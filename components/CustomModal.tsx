import React, { useEffect, useRef } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  primaryButtonText?: string;
  onPrimaryPress?: () => void;
  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  content,
  primaryButtonText = "OK",
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          speed: 10,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <Animated.View
          style={[
            styles.modalContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.modalTitle}>{title}</Text>
          <View>{content}</View>
          <View style={styles.buttonContainer}>
            {primaryButtonText && (
              <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryPress || onClose}>
                <Text style={styles.primaryButtonText}>{primaryButtonText}</Text>
              </TouchableOpacity>
            )}
            {secondaryButtonText && (
              <TouchableOpacity style={styles.secondaryButton} onPress={onSecondaryPress || onClose}>
                <Text style={styles.secondaryButtonText}>{secondaryButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#07862B",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  secondaryButton: {
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#07862B",
    backgroundColor: "transparent",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#07862B",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomModal;
