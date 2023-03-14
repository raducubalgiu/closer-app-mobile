import { StyleSheet, Text, Pressable } from "react-native";
import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "../../../core";
import CustomAvatar from "../../../core/Avatars/CustomAvatar";
import theme from "../../../../assets/styles/theme";
import { trimFunc } from "../../../../src/utils";

type IProps = { onPress: () => void; avatar: any; username: string };
const { primary } = theme.lightColors || {};

const StoryAvatarListItem = ({ onPress, avatar, username }: IProps) => {
  return (
    <Pressable onPress={onPress}>
      <Stack sx={{ paddingLeft: 10 }}>
        <LinearGradient
          colors={[`${primary}`, `#ffd9b3`]}
          start={{ x: 1, y: 0.4 }}
          end={{ x: 1.4, y: 3 }}
          style={{ borderRadius: 200 }}
        >
          <CustomAvatar avatar={avatar} size={65} sx={styles.avatar} />
        </LinearGradient>
        <Text style={{ fontSize: 12.5, marginTop: 5 }}>
          {trimFunc(username, 10)}
        </Text>
      </Stack>
    </Pressable>
  );
};

export default memo(StoryAvatarListItem);

const styles = StyleSheet.create({
  avatar: {
    margin: 2.25,
    borderWidth: 1.5,
    borderColor: "white",
  },
});
