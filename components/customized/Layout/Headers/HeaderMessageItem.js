import { StyleSheet, Text } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack, CustomAvatar, IconBackButton, Checkmark } from "../../../core";

const { black, grey0 } = theme.lightColors;

const HeaderMessageItem = ({ avatar, name, username, checkmark }) => {
  return (
    <Stack direction="row" sx={styles.container}>
      <Stack direction="row">
        <IconBackButton />
        <Stack direction="row">
          <CustomAvatar size={40} avatar={avatar} />
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Stack direction="row">
              <Text style={styles.name}>{name}</Text>
              {checkmark && <Checkmark />}
            </Stack>
            <Text style={styles.username}>@{username}</Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row">
        <Icon name="video" type="feather" color={black} size={25} />
        <Icon
          name="shield"
          type="feather"
          color={black}
          size={25}
          style={{ marginLeft: 20 }}
        />
      </Stack>
    </Stack>
  );
};

export default HeaderMessageItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    zIndex: 1000,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 5,
  },
  username: {
    color: grey0,
    fontSize: 13,
  },
});
