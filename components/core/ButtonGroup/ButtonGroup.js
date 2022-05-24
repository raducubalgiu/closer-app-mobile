import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import theme from "../../../assets/styles/theme";

export const ButtonGroup = ({ activeButton, size, onPress, buttons }) => {
  const [activeBtn, setActiveBtn] = useState(activeButton);

  const styles = StyleSheet.create({
    buttonsContainer: {
      backgroundColor: "#f1f1f1",
      padding: 5,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      paddingVertical: size === "small" ? 5 : 7.5,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    active: { backgroundColor: "white" },
    buttonText: {
      fontFamily: "Exo-SemiBold",
      color: theme.lightColors.black,
      fontSize: 13,
    },
    buttonTextActive: { fontFamily: "Exo-SemiBold", fontSize: 13.5 },
  });

  const handleButton = useCallback(() => {
    setActiveBtn(index);
    onPress(index);
  }, []);

  return (
    <View style={styles.sx}>
      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={handleButton}
            style={
              index === activeBtn
                ? { ...styles.button, ...styles.active }
                : styles.button
            }
          >
            <Text
              style={
                index === activeBtn
                  ? { ...styles.buttonText, ...styles.buttonTextActive }
                  : styles.buttonText
              }
            >
              {button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
