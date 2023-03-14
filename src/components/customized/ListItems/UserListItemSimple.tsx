import { StyleSheet, Text, Pressable } from "react-native";
import { Stack, Checkmark } from "../../core";
import CustomAvatar from "../../core/Avatars/CustomAvatar";
import theme from "../../../assets/styles/theme";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  checkmark: boolean;
  name: string;
  avatar: any;
  profession: any;
  sx?: {};
  avatarSize?: number;
  onGoToUser?: () => void;
};

export const UserListItemSimple = ({
  checkmark = false,
  name,
  avatar,
  profession,
  onGoToUser,
  avatarSize = 50,
  sx,
}: IProps) => {
  return (
    <Pressable onPress={onGoToUser} style={sx}>
      <Stack align="start">
        <Stack direction="row">
          <CustomAvatar avatar={avatar} size={avatarSize} />
          <Stack align="start" justify="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.ownerName}>{name}</Text>
              {checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.profession}>{profession}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ownerName: {
    color: black,
    fontWeight: "600",
    fontSize: 15,
    marginRight: 5,
  },
  profession: { color: grey0, marginTop: 2.5 },
});