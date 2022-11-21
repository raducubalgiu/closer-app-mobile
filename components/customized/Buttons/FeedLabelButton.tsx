import { StyleSheet, Text, TouchableOpacity } from "react-native";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors;

export const FeedLabelButton = ({ isActive, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={
        isActive ? { ...styles.btnList, ...styles.activeBtn } : styles.btnList
      }
    >
      <Text
        style={
          isActive
            ? { ...styles.btnText, ...styles.activeBtnText }
            : styles.btnText
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnList: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 7.5,
    borderRadius: 20,
    paddingVertical: 6.5,
    paddingHorizontal: 15,
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
