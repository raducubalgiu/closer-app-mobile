import { Avatar, Image } from "@rneui/themed";
import { memo } from "react";
import NoAvatar from "../../../assets/images/avatar.jpg";

type Props = {
  avatar: any;
  size?: number;
  sx?: {};
};

const CustomAvatar = ({ avatar = [], size = 55, sx = {} }: Props) => {
  const uri = avatar.length ? { uri: `${avatar[0]?.url}` } : NoAvatar;

  return (
    <Avatar
      size={size}
      rounded
      source={uri}
      avatarStyle={{ resizeMode: "cover" }}
      containerStyle={{
        borderWidth: 1,
        borderColor: "#ddd",
        ...sx,
      }}
    />
  );
};

export default memo(CustomAvatar);
