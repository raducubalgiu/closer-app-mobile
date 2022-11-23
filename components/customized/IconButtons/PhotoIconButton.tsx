import { IconButton } from "../../core";

export const PhotoIconButton = ({ sx, size = 30, onPress }) => {
  return (
    <IconButton
      name="photo-library"
      type="material"
      size={size}
      color="#ebebe0"
      sx={{ ...sx }}
      onPress={onPress}
    />
  );
};
