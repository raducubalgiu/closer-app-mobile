import { Avatar, Image } from "@rneui/themed";
import { memo } from "react";
import NoAvatar from "../../../../assets/images/avatar.jpg";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../../../assets/styles/theme";

type Props = {
  avatar: any;
  size?: number;
  hasStories?: boolean;
  sx?: {};
};
const { primary } = theme.lightColors || {};

const CustomAvatar = ({
  avatar = [],
  size = 55,
  hasStories = false,
  sx = {},
}: Props) => {
  const uri = avatar.length ? { uri: `${avatar[0]?.url}` } : NoAvatar;

  return (
    <LinearGradient
      colors={[`${primary}`, `#ffd9b3`]}
      start={{ x: 1, y: 0.4 }}
      end={{ x: 1.4, y: 3 }}
      style={{ borderRadius: 50 }}
    >
      <Avatar
        size={size}
        rounded
        source={uri}
        avatarStyle={{ resizeMode: "cover" }}
        containerStyle={{
          borderWidth: 1,
          borderColor: "#ddd",
          margin: hasStories ? 1.5 : 0,
          ...sx,
        }}
      />
    </LinearGradient>
  );
};

export default memo(CustomAvatar);
