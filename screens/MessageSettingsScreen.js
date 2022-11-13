import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import theme from "../assets/styles/theme";
import {
  Button,
  Checkmark,
  CustomAvatar,
  Header,
  Heading,
  Stack,
} from "../components/core";
import { SettingListItem } from "../components/customized";

const { grey0, black, error } = theme.lightColors;

export const MessageSettingsScreen = ({ route }) => {
  const { _id, avatar, name, username, checkmark } = route.params;
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goToUser = () => {
    navigation.push("ProfileGeneral", {
      userId: _id,
      avatar,
      name,
      username,
      checkmark,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Detalii" divider />
      <Button onPress={goToUser}>
        <Stack direction="row" sx={{ padding: 15 }}>
          <Stack direction="row">
            <CustomAvatar avatar={avatar} size={55} />
            <Stack align="start" sx={{ marginLeft: 10 }}>
              <Stack direction="row">
                <Text style={{ fontSize: 16, color: black, fontWeight: "500" }}>
                  {name}
                </Text>
                {checkmark && <Checkmark sx={{ marginLeft: 7.5 }} />}
              </Stack>
              <Text style={{ marginTop: 2.5, color: grey0 }}>@{username}</Text>
            </Stack>
          </Stack>
          <Icon name="chevron-right" type="feather" color={grey0} />
        </Stack>
      </Button>
      <Stack sx={{ paddingHorizontal: 15 }} align="start">
        <Heading title={t("actions")} sx={styles.heading} />
        <SettingListItem
          defaultValue={false}
          title={t("stopMessages")}
          onChange={() => {}}
        />
        <SettingListItem
          defaultValue={false}
          title={t("disableNotifications")}
          onChange={() => {}}
        />
        <SettingListItem
          defaultValue={false}
          title={t("block")}
          sxTitle={{ color: error }}
          onChange={() => {}}
        />
        <Button>
          <Text style={{ color: error, fontSize: 15 }}>
            {t("deleteConversation")}
          </Text>
        </Button>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: { fontSize: 16, fontWeight: "600", marginBottom: 20 },
});
