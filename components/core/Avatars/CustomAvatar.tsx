import { Avatar } from "@rneui/themed";
import { memo } from "react";

const CustomAvatar = ({ avatar = [], size = 55, sx = {} }) => {
  const uri = avatar.length ? `${avatar[0]?.url}` : null;

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
