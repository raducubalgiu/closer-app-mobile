import { StyleSheet, TextInput, Text } from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { has, get } from "lodash";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Stack } from "../Stack/Stack";

const { error, black } = theme.lightColors || {};

type Props = {
  name: string;
  placeholder: string;
  rules?: {};
  sx?: {};
  label?: string;
  secureTextEntry?: boolean;
};

export const FormInput = ({
  name,
  placeholder,
  rules = {},
  sx = {},
  label = "",
  secureTextEntry = false,
  ...props
}: Props) => {
  const { formState, control } = useFormContext();
  const { errors } = formState;

  const errMsg = (
    <Stack direction="row" sx={{ marginBottom: 10 }}>
      <Icon name="alert-circle" type="feather" size={20} color={error} />
      <Text style={styles.errMsg}>{get<any>(errors, name)?.message}</Text>
    </Stack>
  );

  return (
    <>
      {label?.length > 0 && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...props}
            placeholder={placeholder}
            style={{
              ...styles.input,
              borderColor: has(errors, name) ? error : "#ccc",
              ...sx,
            }}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor="#9EA0A4"
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
      />
      {has(errors, name) && errMsg}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12.5,
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  label: {
    textTransform: "uppercase",
    color: black,
    marginBottom: 2.5,
    fontWeight: "600",
    fontSize: 13.5,
  },
  errMsg: {
    color: error,
    marginLeft: 5,
  },
});
