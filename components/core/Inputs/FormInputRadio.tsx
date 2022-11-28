import { StyleSheet, Text } from "react-native";
import { CheckBox } from "@rneui/themed";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};
type IProps = { text: string; checked: boolean; onPress: () => void };

export const FormInputRadio = ({ text, checked, onPress }: IProps) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={onPress}
        size={27.5}
        containerStyle={{ padding: 5 }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingLeft: 15,
  },
  text: {
    color: black,
    fontSize: 16,
  },
});
