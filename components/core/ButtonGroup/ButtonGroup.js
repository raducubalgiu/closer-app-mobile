import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import theme from "../../../assets/styles/theme";
import { Stack } from "../Stack/Stack";

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
    btnTxt: {
      fontFamily: "Exo-SemiBold",
      color: theme.lightColors.black,
      fontSize: 13,
    },
    btnTxtActive: { fontFamily: "Exo-SemiBold", fontSize: 13.5 },
  });

  const handleButton = useCallback(() => {
    setActiveBtn(index);
    onPress(index);
  }, []);

  const activeBtnStyle = { ...styles.button, ...styles.active };
  const activeBtnTxt = { ...styles.btnTxt, ...styles.btnTxtActive };

  return (
    <View style={styles.sx}>
      <Stack>
        <View style={styles.buttonsContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={handleButton}
              style={index === activeBtn ? activeBtnStyle : styles.button}
            >
              <Text style={index === activeBtn ? activeBtnTxt : styles.btnTxt}>
                {button.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Stack>
    </View>
  );
};
