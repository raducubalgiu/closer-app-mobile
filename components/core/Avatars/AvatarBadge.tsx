import { View, StyleSheet } from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { memo } from "react";
import NoAvatar from "../../../assets/images/avatar.jpg";
import theme from "../../../assets/styles/theme";

type Props = {
  avatar: any;
  size?: number;
  defaultIconProps?: {
    name: string;
    type: string;
    color: string;
    size: number;
  };
  iconProps?: { name: string; type?: string; color?: string; size?: number };
  sx?: {};
  sxBadge?: {};
};
const { primary } = theme.lightColors || {};

const AvatarBadge = ({
  avatar = [],
  size = 55,
  defaultIconProps,
  iconProps = {
    name: "pluscircle",
    type: "antdesign",
    color: primary,
    size: 21,
  },
  sx = {},
  sxBadge = {},
}: Props) => {
  const uri = avatar.length ? { uri: `${avatar[0]?.url}` } : NoAvatar;

  return (
    <View>
      <Avatar
        size={size}
        rounded
        source={uri}
        avatarStyle={{ resizeMode: "cover" }}
        containerStyle={[styles.avatarContainer, sx]}
      />
      <View style={[styles.badgeContainer, sxBadge]}>
        <Icon {...defaultIconProps} {...iconProps} />
      </View>
    </View>
  );
};

export default memo(AvatarBadge);

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 1.5,
  },
  badgeContainer: {
    position: "absolute",
    bottom: 1,
    left: 47.5,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    backgroundColor: "white",
  },
});
