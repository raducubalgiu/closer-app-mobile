import { StyleSheet } from "react-native";
import { Stack, Button } from "../../../core";

export const Footer = ({
  children,
  btnTitle,
  disabled,
  onPress,
  sx,
  loading,
}) => {
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
