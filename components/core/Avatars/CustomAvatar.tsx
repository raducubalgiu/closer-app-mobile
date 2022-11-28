import { Avatar } from "@rneui/themed";
import { memo } from "react";

type Props = {
  avatar: any;
  size?: number;
  sx?: {};
};

const CustomAvatar = ({ avatar = [], size = 55, sx = {} }: Props) => {
  const uri = avatar.length ? `${avatar[0]?.url}` : "";

  return (
    <Avatar
      size={size}
      rounded
      source={{ uri }}
      containerStyle={{ backgroundColor: "#ddd", ...sx }}
      title="JS"
    />
  );
};

export default memo(CustomAvatar);
