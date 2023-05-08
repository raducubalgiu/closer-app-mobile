import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import Stack from "../Stack/Stack";
import theme from "../../../../assets/styles/theme";

const { grey0, error, black, primary } = theme.lightColors || {};

type IProps = TextInputProps & {
  height?: number;
  withDetails?: boolean;
  border?: boolean;
  spacing?: number;
};

export const Input = ({
  withDetails = false,
  border = true,
  height,
  spacing = 15,
  ...props
}: IProps) => {
  const { value, maxLength } = props || {};
  const valColor =
    value && maxLength && value?.length >= maxLength ? { color: error } : {};

  const borderBottom = { borderBottomWidth: 0.5, borderColor: "#ddd" };

  return (
    <View style={{ margin: spacing }}>
      <Stack direction="row" sx={border && borderBottom}>
        <TextInput
          {...props}
          style={{ ...styles.input, height }}
          placeholderTextColor="#9EA0A4"
          clearButtonMode="while-editing"
        />
      </Stack>
      {withDetails && (
        <Stack direction="row" justify="start" sx={{ marginTop: 10 }}>
          <Text style={[styles.strokeLength, valColor]}>
            {props?.value?.length}
          </Text>
          <Text style={styles.strokeLength}>/</Text>
          <Text style={styles.strokeLength}>{maxLength}</Text>
        </Stack>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 20,
    fontSize: 15,
    flex: 1,
    color: black,
  },
  rightIcon: { paddingVertical: 15, paddingHorizontal: 5 },
  strokeLength: {
    color: grey0,
    fontSize: 13,
  },
});
