import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
} from "react-native";
import Stack from "../Stack/Stack";
import theme from "../../../../assets/styles/theme";

const { grey0, error, black } = theme.lightColors || {};

type IProps = TextInputProps & { height?: number; withDetails?: boolean };

export const InputEdit = ({
  withDetails = false,
  height,
  ...props
}: IProps) => {
  const { value, maxLength } = props || {};
  const valColor =
    value && maxLength && value?.length >= maxLength ? { color: error } : {};

  return (
    <View style={{ marginHorizontal: 15 }}>
      <Stack direction="row" sx={styles.inputContainer}>
        <TextInput
          {...props}
          style={{ ...styles.input, height }}
          placeholderTextColor="#9EA0A4"
          clearButtonMode="while-editing"
        />
      </Stack>
      {withDetails && (
        <Stack direction="row" justify="start">
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
  inputContainer: {
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  input: {
    paddingVertical: 20,
    fontSize: 15,
    flex: 1,
    color: black,
    fontWeight: "500",
  },
  rightIcon: { paddingVertical: 15, paddingHorizontal: 5 },
  strokeLength: {
    color: grey0,
    fontSize: 13,
  },
});
