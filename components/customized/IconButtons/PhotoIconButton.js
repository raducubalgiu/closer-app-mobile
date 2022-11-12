import { IconButton } from "../../core";

export const PhotoIconButton = ({ sx, size, onPress }) => {
  return (
    <IconButton
      iconName="photo-library"
      size={size ? size : 30}
      color="#ebebe0"
      style={{ ...sx }}
      onPress={onPress}
    />
  );
};
