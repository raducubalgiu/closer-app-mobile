import {
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TextInputProps,
} from "react-native";
import { useFormContext, Controller } from "react-hook-form";
import { has, get, isEmpty } from "lodash";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import Stack from "../Stack/Stack";

const { error, black } = theme.lightColors || {};

type Props = TextInputProps & {
  name: string;
  rules?: {};
  sx?: {};
  label?: string;
  disableRightIcon?: boolean;
  initialValue?: any;
  rightIconProps?: any;
  rightText?: string;
  onChangeInput?: (event: string) => void;
  onRightIconPress?: () => void;
};

export const FormTextField = ({
  name,
  rules = {},
  sx = {},
  label = "",
  initialValue = null,
  disableRightIcon,
  rightIconProps,
  onRightIconPress,
  onChangeInput,
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
      paddingVertical: 15,
      fontSize: 15,
      ...sx,
    },
  });

  return (
    <>
      {has(errors, name) && errMsg}
      {!isEmpty(label) && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Stack direction="row" align="center" sx={styles.inputContainer}>
            <TextInput
              {...props}
              style={inputStyle.input}
              onBlur={onBlur}
              onChangeText={onChangeInput ? onChangeInput : onChange}
              value={initialValue ? initialValue : value}
              placeholderTextColor="#9EA0A4"
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
    fontSize: 15.5,
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
