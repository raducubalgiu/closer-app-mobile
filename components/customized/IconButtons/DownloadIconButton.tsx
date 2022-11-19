import { IconButton } from "../../core";

export const DownloadIconButton = ({ sx = {}, size = 30, onPress }) => {
  return (
    <IconButton
      iconName="download"
      iconType="feather"
      size={size}
      color="white"
      onPress={onPress}
      sx={{
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        ...sx,
      }}
    />
  );
};
