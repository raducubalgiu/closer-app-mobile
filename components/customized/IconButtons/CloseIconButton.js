import { IconButton } from "../../core";

export const CloseIconButton = ({ sx, size, color, onPress }) => {
  return (
    <IconButton
      iconName="x"
      iconType="feather"
      size={size ? size : 30}
      color={color ? color : "white"}
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
