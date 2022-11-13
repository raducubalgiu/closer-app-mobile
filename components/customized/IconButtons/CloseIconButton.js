import { IconButton } from "../../core";

export const CloseIconButton = ({ sx, size, color, onPress }) => {
  return (
    <IconButton
      iconName="x"
      iconType="feather"
      size={size ? size : 30}
      color={color ? color : "#ebebe0"}
      onPress={onPress}
      sx={{ ...sx }}
    />
  );
};
