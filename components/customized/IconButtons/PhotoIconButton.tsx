import { IconButton } from "../../core";

export const PhotoIconButton = ({ sx, size = 30, onPress }) => {
  return (
    <IconButton
      iconName="photo-library"
      size={size}
      color="#ebebe0"
      sx={{ ...sx }}
      onPress={onPress}
    />
  );
};
