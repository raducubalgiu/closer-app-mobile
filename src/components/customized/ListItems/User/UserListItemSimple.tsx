import { StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import { Stack, Checkmark } from "../../../core";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import theme from "../../../../../assets/styles/theme";
import { Icon } from "@rneui/themed";

const { grey0, black } = theme.lightColors || {};

type IProps = {
  title: string;
  description: string;
  checkmark: boolean;
  avatar: any;
  arrowRight?: boolean;
  sx?: {};
  avatarSize?: number;
  onGoToUser?: () => void;
  loading?: boolean;
};

export const UserListItemSimple = ({
  checkmark = false,
  title,
  avatar,
  description,
  arrowRight = false,
  onGoToUser,
  avatarSize = 50,
  sx,
  loading = false,
}: IProps) => {
  return (
    <Pressable onPress={onGoToUser} style={sx}>
      <Stack direction="row">
        <Stack direction="row">
          <CustomAvatar avatar={avatar} size={avatarSize} />
          <Stack align="start" justify="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.ownerName}>{title}</Text>
              {checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.profession}>{description}</Text>
          </Stack>
        </Stack>
        {arrowRight && (
          <Icon
            name="keyboard-arrow-right"
            color={grey0}
            style={{ marginLeft: 10 }}
          />
        )}
        {loading && <ActivityIndicator />}
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ownerName: {
    color: black,
    fontWeight: "600",
    fontSize: 16,
    marginRight: 5,
  },
  profession: { color: grey0, marginTop: 2.5, fontSize: 15 },
});
