import { StyleSheet, TextInput, Text, Pressable } from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { has, get } from "lodash";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
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
  disableRightIcon?: boolean;
  initialValue?: any;
  rightIconProps?: any;
  rightText?: string;
  onChangeInput?: (event: string) => void;
  onPressIn?: () => void;
  onRightIconPress?: () => void;
};

export const FormTextField = ({
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
  disableRightIcon,
  rightIconProps,
  onRightIconPress,
  onChangeInput,
  onPressIn,
  ...props
}: Props) => {
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const message: string = get(errors, name)?.message as string;

  const errMsg = (
    <Stack direction="row" sx={{ marginBottom: 15 }}>
      <Icon name="alert-circle" type="feather" size={20} color={error} />
      <Text style={styles.errMsg}>{message}</Text>
    </Stack>
  );

  const inputStyle = StyleSheet.create({
    input: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 15,
      ...sx,
    },
  });

  return (
    <>
      {has(errors, name) && errMsg}
      {label?.length > 0 && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Stack direction="row" align="center" sx={styles.inputContainer}>
            <TextInput
              {...props}
              placeholder={placeholder}
              style={inputStyle.input}
              maxLength={maxLength}
              keyboardType={keyboardType}
              onBlur={onBlur}
              onChangeText={onChangeInput ? onChangeInput : onChange}
              onPressIn={onPressIn}
              value={initialValue ? initialValue : value}
              placeholderTextColor="#9EA0A4"
              secureTextEntry={secureTextEntry}
              editable={editable}
            />
            <Pressable
              onPress={onRightIconPress}
              disabled={disableRightIcon}
              style={styles.rightIconBtn}
            >
              <Icon {...rightIconProps} />
            </Pressable>
          </Stack>
        )}
        name={name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: "capitalize",
    color: black,
    marginBottom: 2.5,
    fontWeight: "600",
    fontSize: 14,
  },
  errMsg: {
    color: error,
    marginLeft: 5,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
  },
  rightIconBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
