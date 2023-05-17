import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import Stack from "../../Stack/Stack";
import theme from "../../../../../assets/styles/theme";

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
    <Pressable onPress={onPress} style={{ paddingVertical: 12.5, ...sx }}>
      <View>
        <Stack direction="row" align="center">
          <Text
            style={{
              ...styles.text,
              fontWeight: variant === "normal" ? "400" : "500",
            }}
          >
            {title}
          </Text>
          <Icon
            name={checked ? "radio-button-on" : "radio-button-off-sharp"}
            type="ionicon"
            size={30}
            color={color}
          />
        </Stack>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: black,
    fontSize: 15,
  },
  description: { color: grey0, marginBottom: 10 },
});
