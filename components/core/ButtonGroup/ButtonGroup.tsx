import { StyleSheet, Text, View, Pressable } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack } from "../Stack/Stack";

const black = theme.lightColors?.black;

type Props = {
  activeBtn: number;
  onPress: (index: number) => void;
  buttons: any;
  sx?: {};
  disableActiveBtn?: boolean;
};

export const ButtonGroup = ({
  activeBtn,
  onPress,
  buttons,
  sx = {},
  disableActiveBtn,
}: Props) => {
  const styles = StyleSheet.create({
    buttonsContainer: {
      backgroundColor: "#f1f1f1",
      padding: 5,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      paddingVertical: 7.5,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    active: { backgroundColor: "white" },
    btnTxt: { color: black, fontWeight: "500" },
    btnTxtActive: { fontWeight: "600" },
  });

  const activeBtnStyle = { ...styles.button, ...styles.active };
  const activeBtnTxt = { ...styles.btnTxt, ...styles.btnTxtActive };

  return (
    <View style={sx}>
      <Stack>
        <View style={styles.buttonsContainer}>
          {buttons.map((button: any, index: number) => (
            <Pressable
              key={index}
              onPress={() => onPress(index)}
              disabled={disableActiveBtn ? activeBtn === index : false}
              style={index === activeBtn ? activeBtnStyle : styles.button}
            >
              <Text style={index === activeBtn ? activeBtnTxt : styles.btnTxt}>
                {button.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </Stack>
    </View>
  );
};
