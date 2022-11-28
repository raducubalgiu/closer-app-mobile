import { IconButton } from "../../core";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type IProps = {
  size: number;
  color: string | undefined;
  sx?: {};
  onPress: () => void;
};

export const InfoIconButton = ({
  size = 25,
  color = black,
  sx = {},
  onPress,
}: IProps) => {
  return (
    <IconButton
      name="info"
      size={size}
      color={color}
      onPress={onPress}
      sx={sx}
    />
  );
};
