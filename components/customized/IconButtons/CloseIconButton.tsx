import { IconButton } from "../../core";

type IProps = {
  sx?: {};
  size?: number;
  color: string;
  onPress: () => void;
};

export const CloseIconButton = ({
  sx = {},
  size = 30,
  color = "white",
  onPress,
}: IProps) => {
  return (
    <IconButton
      name="x"
      size={size}
      color={color}
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
