import { StyleSheet, Text } from "react-native";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";
import { IconButton } from "../IconButton/IconButton";

const { black, primary } = theme.lightColors || {};
type IProps = {
  text: string;
  onPress: () => void;
  sx?: {};
  color?: string;
  checked: boolean;
};

export const FormInputRadio = ({
  text,
  color = primary,
  checked,
  onPress,
  sx,
}: IProps) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <IconButton
        onPress={onPress}
        name={checked ? "radio-button-on" : "radio-button-off-sharp"}
        type="ionicon"
        size={30}
        color={color}
        sx={{ paddingVertical: 12.5, paddingLeft: 10 }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    color: black,
    fontSize: 15,
    fontWeight: "500",
  },
});
