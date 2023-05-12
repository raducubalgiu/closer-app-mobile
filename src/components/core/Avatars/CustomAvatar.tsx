import { Image, ImageStyle } from "react-native";
import { memo, useState } from "react";
import NoAvatar from "../../../../assets/images/avatar.jpg";
import { StyleSheet } from "react-native";

type Props = {
  avatar: any;
  size?: number;
  hasStories?: boolean;
  sx?: ImageStyle;
};

const CustomAvatar = ({ avatar, size = 55, sx }: Props) => {
  const [loaded, setLoaded] = useState(false);

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
      style={[styles.image, { opacity: loaded ? 1 : 0 }, sx]}
      blurRadius={loaded ? 0 : 5}
      resizeMode="cover"
      onLoad={() => setLoaded(true)}
      loadingIndicatorSource={NoAvatar}
    />
  );
};

export default memo(CustomAvatar);
