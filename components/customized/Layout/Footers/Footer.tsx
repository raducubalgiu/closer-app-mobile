import { StyleSheet } from "react-native";
import { Stack, Button } from "../../../core";

type Props = {
  children: any;
  btnTitle: string;
  disabled: boolean;
  onPress: () => void;
  sx?: {};
  loading: boolean;
};

export const Footer = ({
  children,
  btnTitle,
  disabled,
  onPress,
  sx,
  loading,
}: Props) => {
  return (
    <Stack direction="row" sx={{ ...styles.footer, ...sx }}>
      <Stack align="start">{children}</Stack>
      <Button
        disabled={disabled}
        size="lg"
        loading={loading}
        title={btnTitle}
        onPress={onPress}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
