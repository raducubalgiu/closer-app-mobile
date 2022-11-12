import { IconButton } from "../../core";

export const DownloadIconButton = ({ sx, size, onPress }) => {
  return (
    <IconButton
      iconName="download"
      iconType="feather"
      size={size ? size : 30}
      color="#ebebe0"
      onPress={onPress}
      sx={{ ...sx }}
    />
  );
};
