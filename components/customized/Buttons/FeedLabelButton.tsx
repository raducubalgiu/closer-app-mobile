import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const FeedLabelButton = ({ isActive, text, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={isActive ? [styles.btnList, styles.activeBtn] : styles.btnList}
    >
      <Text
        style={
          isActive ? [styles.btnText, styles.activeBtnText] : styles.btnText
        }
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnList: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginLeft: 7.5,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: black,
    fontSize: 13,
    fontWeight: "500",
  },
  activeBtn: {
    borderWidth: 1.25,
    backgroundColor: "#f1f1f1",
    borderColor: "#f1f1f1",
  },
  activeBtnText: {
    color: black,
    fontWeight: "600",
  },
});
