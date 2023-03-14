import { StyleSheet, View } from "react-native";
import { Avatar, Badge, Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { black, success } = theme.lightColors || {};

type IProps = { iconName: string; iconType: string; withBadge: boolean };

export const AvatarComplete = ({ iconName, iconType, withBadge }: IProps) => {
  return (
    <View>
      <Avatar
        rounded
        icon={{
          name: iconName,
          type: iconType,
          size: 25,
          color: black,
        }}
        containerStyle={styles.avatarContainer}
      />
      {withBadge && (
        <Badge
          containerStyle={styles.badgeContainer}
          value={<Icon name="check" type="entypo" size={10} color="white" />}
          badgeStyle={{ backgroundColor: success }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
    borderRadius: 50,
    width: 55,
    height: 55,
  },
  badgeContainer: {
    position: "absolute",
    bottom: 15,
    left: 42.5,
  },
});
