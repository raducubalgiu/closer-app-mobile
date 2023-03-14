import { IconButton } from "../../core";

type IProps = { sx?: {}; size: number; onPress: () => void };

export const DownloadIconButton = ({ sx = {}, size = 30, onPress }: IProps) => {
  return (
    <IconButton
      name="download"
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
