import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import theme from "../../../assets/styles/theme";

const ButtonGroup = (props) => {
  const [activeBtn, setActiveBtn] = useState(props.activeButton);

  const styles = StyleSheet.create({
    buttonsContainer: {
      backgroundColor: "#f1f1f1",
      padding: 5,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      paddingVertical: props.size === "small" ? 5 : 7.5,
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

  return (
    <View style={styles.sx}>
      <View style={styles.buttonsContainer}>
        {props.buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={useCallback(() => {
              setActiveBtn(index);
              props.onPress(index);
            }, [])}
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

export default ButtonGroup;
