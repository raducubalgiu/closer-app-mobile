import { IconButton } from "../../core";

type Props = {
  sx?: {};
  size: number;
  onPress: () => {};
};

export const PhotoIconButton = ({ sx, size = 30, onPress }: Props) => {
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
