import { memo } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};
type IProps = { isActive: boolean; name: string; onPress: () => void };

const OptionListItem = ({ isActive, name, onPress }: IProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={isActive ? [styles.btn, styles.activeBtn] : styles.btn}
    >
      <Text
        style={isActive ? [styles.btnTxt, styles.activeTxt] : styles.btnTxt}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default memo(OptionListItem);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#eee",
    marginHorizontal: 15,
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  btnTxt: {
    textAlign: "center",
    color: black,
    fontWeight: "500",
  },
  activeBtn: { backgroundColor: black },
  activeTxt: { color: "white" },
});
