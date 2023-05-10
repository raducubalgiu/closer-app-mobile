import { Image, ImageStyle } from "react-native";
import { memo } from "react";
import NoAvatar from "../../../../assets/images/avatar.jpg";
import { StyleSheet } from "react-native";

type Props = {
  avatar: any;
  size?: number;
  hasStories?: boolean;
  sx?: ImageStyle;
};

const CustomAvatar = ({ avatar, size = 55, sx }: Props) => {
  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 1,
      borderColor: "#ddd",
      backgroundColor: "#eee",
    },
  });

  return (
    <Image
      source={avatar?.url ? { uri: avatar?.url } : NoAvatar}
      style={[styles.image, sx]}
      resizeMode="cover"
    />
  );
};

export default memo(CustomAvatar);
