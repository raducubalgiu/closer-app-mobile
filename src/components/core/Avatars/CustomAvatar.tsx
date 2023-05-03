import { Avatar } from "@rneui/themed";
import { memo } from "react";
import NoAvatar from "../../../../assets/images/avatar.jpg";
import { StyleSheet } from "react-native";

type Props = {
  avatar: any;
  size?: number;
  hasStories?: boolean;
  sx?: {};
};

const CustomAvatar = ({
  avatar,
  size = 55,
  hasStories = false,
  sx = {},
}: Props) => {
  return (
    <Avatar
      rounded
      size={size}
      source={avatar?.url ? { uri: avatar?.url } : NoAvatar}
      avatarStyle={{ resizeMode: "cover" }}
      containerStyle={{
        ...styles.container,
        margin: hasStories ? 1.5 : 0,
        ...sx,
      }}
      overlayContainerStyle={styles.overlay}
    />
  );
};

export default memo(CustomAvatar);

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: "#ddd" },
  overlay: { backgroundColor: "#eee" },
});
