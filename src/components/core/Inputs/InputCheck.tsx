import { StyleSheet, ActivityIndicator, TextInput } from "react-native";
import theme from "../../../../assets/styles/theme";
import Stack from "../Stack/Stack";
import { IconButton } from "../IconButton/IconButton";

const { success, black } = theme.lightColors || {};

type IProps = {
  placeholder: string;
  value: string | undefined;
  isAvailable: boolean;
  isLoading: boolean;
  onChange: (text: string) => void;
};

const InputCheck = ({
  placeholder,
  value,
  isAvailable,
  isLoading,
  onChange,
}: IProps) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        clearButtonMode={
          !isLoading && value && value?.length > 0 && !isAvailable
            ? "always"
            : "never"
        }
        value={value}
        onChangeText={onChange}
      />
      {isLoading && <ActivityIndicator />}
      {!isLoading && isAvailable && value && value?.length > 0 && (
        <IconButton
          name="check"
          type="font-awesome"
          color={success}
          size={15}
        />
      )}
    </Stack>
  );
};

export default InputCheck;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
    flex: 1,
  },
  input: {
    paddingVertical: 20,
    flex: 1,
    fontWeight: "500",
    color: black,
  },
});
