import { StyleSheet, Text, View, TextInput } from "react-native";
import { Stack } from "../Stack/Stack";
import theme from "../../../assets/styles/theme";

const { grey0, error, black } = theme.lightColors || {};

type IProps = {
  value: any;
  maxLength: number;
  placeholder: string;
  onChange: (text: string) => void;
  withDetails?: boolean;
  editable?: boolean;
};

export const InputEdit = ({
  value = "",
  maxLength,
  placeholder,
  onChange,
  withDetails = false,
  editable,
}: IProps) => {
  const valColor = value?.length >= maxLength ? { color: error } : {};

  return (
    <View style={{ marginHorizontal: 15 }}>
      <Stack direction="row" sx={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          maxLength={maxLength}
          onChangeText={onChange}
          value={value}
          placeholderTextColor="#9EA0A4"
          editable={editable}
          clearButtonMode="while-editing"
        />
      </Stack>
      {withDetails && (
        <Stack direction="row" justify="start">
          <Text style={[styles.strokeLength, valColor]}>{value?.length}</Text>
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
  },
  rightIcon: { paddingVertical: 15, paddingHorizontal: 5 },
  strokeLength: {
    color: grey0,
    fontSize: 13,
  },
});
