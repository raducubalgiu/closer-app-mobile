import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors } from "../../assets/styles/Colors";

const ContainedButton = (props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ContainedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 7.5,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: { color: "white", fontFamily: "Exo-Medium" },
});
