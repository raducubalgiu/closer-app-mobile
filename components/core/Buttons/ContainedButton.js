import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

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
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ContainedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontFamily: "Exo-Medium", textAlign: "center" },
  active: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  disabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc",
  },
});
