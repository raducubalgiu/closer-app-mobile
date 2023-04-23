import { Pressable, StyleSheet } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import NoAvatar from "../../../../assets/images/avatar.jpg";
import { memo } from "react";

type IProps = { onPress: () => void; uri: string };

const AvatarDelete = ({ onPress, uri }: IProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Avatar rounded source={uri ? { uri } : NoAvatar} size="medium" />
      <Badge
        value={<Icon name="close" type="ionicon" color="white" size={15} />}
        containerStyle={styles.badge}
        badgeStyle={{ backgroundColor: "#a6a6a6" }}
      />
    </Pressable>
  );
};

export default memo(AvatarDelete);

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
  },
  badge: {
    position: "absolute",
    top: -5,
    left: 35,
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 50,
  },
});
