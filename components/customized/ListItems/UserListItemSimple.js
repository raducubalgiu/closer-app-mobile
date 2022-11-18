import { StyleSheet, Text, Pressable } from "react-native";
import { Stack, CustomAvatar, Checkmark } from "../../core";
import theme from "../../../assets/styles/theme";

const { grey0, black } = theme.lightColors;

export const UserListItemSimple = ({
  checkmark,
  name,
  avatar,
  profession,
  onGoToUser,
  sx,
}) => {
  return (
    <Pressable onPress={onGoToUser} style={{ ...styles.owner, ...sx }}>
      <Stack align="start">
        <Stack direction="row">
          <CustomAvatar avatar={avatar} size={50} iconSize={17.5} />
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
  owner: { marginBottom: 20, paddingHorizontal: 15 },
  ownerName: {
    color: black,
    fontWeight: "600",
    fontSize: 15,
    marginRight: 5,
  },
  profession: { color: grey0, marginTop: 2.5 },
});
