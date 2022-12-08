import { Avatar } from "@rneui/themed";
import { memo } from "react";

type Props = {
  avatar: any;
  size?: number;
  sx?: {};
};

const CustomAvatar = ({ avatar = [], size = 55, sx = {} }: Props) => {
  const uri = avatar.length ? `${avatar[0]?.url}` : null;

  https: return (
    <Avatar
      size={size}
      rounded
      source={{ uri }}
      containerStyle={{
        backgroundColor: "#f1f1f1",
        borderWidth: 1,
        borderColor: "#f1f1f1",
        ...sx,
      }}
      title="JS"
    />
  );
};

export default memo(CustomAvatar);
