import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import theme from "../../../assets/styles/theme";

const { primary, black } = theme.lightColors || {};

type IProps = { name: string; isActive: boolean; sx?: {}; onPress: () => void };
const BusinessButton = ({ name, isActive, sx = {}, onPress }: IProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: isActive ? primary : "white",
        ...sx,
      }}
    >
      <Text style={{ ...styles.text, color: isActive ? "white" : black }}>
        {name}
      </Text>
    </Pressable>
  );
};

export default memo(BusinessButton);

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: 42.5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 13.5,
  },
});
