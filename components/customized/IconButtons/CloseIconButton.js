import { IconButton } from "../../core";

export const CloseIconButton = ({ sx, size, onPress }) => {
  return (
    <IconButton
      iconName="x"
      iconType="feather"
      size={size ? size : 30}
      color="#ebebe0"
      onPress={onPress}
      sx={{ ...sx }}
    />
  );
};
