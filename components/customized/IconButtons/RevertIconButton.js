import { IconButton } from "../../core";

export const RevertIconButton = ({ size, sx, onPress }) => {
  return (
    <IconButton
      iconName="refresh-ccw"
      iconType="feather"
      size={size ? size : 30}
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
