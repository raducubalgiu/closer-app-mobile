import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import theme from "../../../../assets/styles/theme";
import { Stack, CustomAvatar, IconBackButton, Checkmark } from "../../../core";
import { InfoIconButton } from "../../IconButtons/InfoIconButton";

const { grey0 } = theme.lightColors;

export const HeaderMessageItem = ({
  userId,
  avatar,
  name,
  username,
  checkmark,
  conversationId,
}) => {
  const navigation = useNavigation();

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
      <InfoIconButton
        onPress={() =>
          navigation.navigate("MessageSettings", {
            _id: userId,
            avatar,
            name,
            username,
            checkmark,
            conversationId,
          })
        }
      />
    </Stack>
  );
};

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
