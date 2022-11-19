import { IconButton } from "../../core";

export const CloseIconButton = ({
  sx = {},
  size = 30,
  color = "white",
  onPress,
}) => {
  return (
    <IconButton
      iconName="x"
      iconType="feather"
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
