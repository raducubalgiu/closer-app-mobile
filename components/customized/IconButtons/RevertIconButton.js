import { IconButton } from "../../core";

export const RevertIconButton = ({ size, sx, onPress }) => {
  return (
    <IconButton
      iconName="refresh-ccw"
      iconType="feather"
      size={size ? size : 30}
      color="#ebebe0"
      sx={{ ...sx }}
      onPress={onPress}
    />
  );
};
