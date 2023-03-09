import { StyleSheet, TextInput, Text } from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { has, get } from "lodash";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import Stack from "../Stack/Stack";

const { error, black } = theme.lightColors || {};

type Props = {
  name: string;
  placeholder: string;
  rules?: {};
  sx?: {};
  label?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: any;
  editable?: boolean;
  initialValue?: any;
  rightIconProps?: any;
  rightText?: string;
  onChangeInput?: (event: string) => void;
};

export const FormInput = ({
  name,
  placeholder,
  rules = {},
  sx = {},
  label = "",
  secureTextEntry = false,
  editable = true,
  maxLength,
  keyboardType = "default",
  initialValue = null,
  rightIconProps,
  rightText,
  onChangeInput,
  ...props
}: Props) => {
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const message: string = get(errors, name)?.message as string;

  const errMsg = (
    <Stack direction="row" sx={{ marginBottom: 10 }}>
      <Icon name="alert-circle" type="feather" size={20} color={error} />
      <Text style={styles.errMsg}>{message}</Text>
    </Stack>
  );

  const inputStyle = StyleSheet.create({
    input: {
      borderWidth: 1,
      width: "100%",
      marginBottom: 10,
      borderRadius: 10,
      paddingHorizontal: 12.5,
      borderColor: has(errors, name) ? error : "#ccc",
      ...sx,
    },
  });

  return (
    <>
      {label?.length > 0 && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Stack
            direction="row"
            sx={
              editable
                ? inputStyle.input
                : { ...inputStyle.input, backgroundColor: "#eee" }
            }
          >
            <TextInput
              {...props}
              placeholder={placeholder}
              style={{ flex: 1, paddingVertical: 12.5 }}
              maxLength={maxLength}
              keyboardType={keyboardType}
              onBlur={onBlur}
              onChangeText={onChangeInput ? onChangeInput : onChange}
              value={initialValue ? initialValue : value}
              placeholderTextColor="#9EA0A4"
              secureTextEntry={secureTextEntry}
              editable={editable}
            />
            {!!rightIconProps && <Icon {...rightIconProps} />}
            {!!rightText && (
              <Text style={{ color: black, fontWeight: "600" }}>
                {rightText}
              </Text>
            )}
          </Stack>
        )}
        name={name}
      />
      {has(errors, name) && errMsg}
    </>
  );
};

const styles = StyleSheet.create({
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
