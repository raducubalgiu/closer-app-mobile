import { TouchableOpacity, StyleSheet, Text } from "react-native";
import theme from "../../../assets/styles/theme";

const ContainedButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={
        props.disabled
          ? { ...styles.button, ...styles.disabled, ...props.sx }
          : { ...styles.button, ...styles.active, ...props.sx }
      }
      disabled={props.disabled}
    >
      <Text style={{ ...styles.buttonText, ...props.sxText }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ContainedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: theme.lightColors.primary,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontFamily: "Exo-Medium", textAlign: "center" },
  active: {
    backgroundColor: theme.lightColors.primary,
    borderColor: theme.lightColors.primary,
  },
  disabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
});
