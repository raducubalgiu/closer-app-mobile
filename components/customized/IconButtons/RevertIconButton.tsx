import { IconButton } from "../../core";

type Props = {
  size: number;
  sx?: {};
  onPress: () => void;
};

export const RevertIconButton = ({ size = 30, sx = {}, onPress }: Props) => {
  return (
    <IconButton
      name="refresh-ccw"
      size={size}
      color="#ebebe0"
      sx={{
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        ...sx,
      }}
      onPress={onPress}
    />
  );
};
