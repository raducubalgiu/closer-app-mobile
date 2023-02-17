import { StyleSheet, Text, View } from "react-native";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";
import { IconButton } from "../IconButton/IconButton";

const { black, primary, grey0 } = theme.lightColors || {};
type IProps = {
  title: string;
  description?: string | undefined;
  onPress: () => void;
  sx?: {};
  color?: string;
  variant?: string;
  checked: boolean;
};

export const FormInputRadio = ({
  title,
  description,
  variant = "bold",
  color = primary,
  checked,
  onPress,
  sx,
}: IProps) => {
  return (
    <View>
      <Stack direction="row">
        <Text
          style={{
            ...styles.text,
            fontWeight: variant === "normal" ? "400" : "500",
          }}
        >
          {title}
        </Text>
        <IconButton
          onPress={onPress}
          name={checked ? "radio-button-on" : "radio-button-off-sharp"}
          type="ionicon"
          size={30}
          color={color}
          sx={{ paddingVertical: 12.5, paddingLeft: 10, ...sx }}
        />
      </Stack>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: black,
    fontSize: 15,
  },
  description: { color: grey0, marginBottom: 10 },
});
