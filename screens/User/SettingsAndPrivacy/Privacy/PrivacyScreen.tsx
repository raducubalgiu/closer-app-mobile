import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Header, Heading } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { useAuth, usePatch } from "../../../../hooks";
import { showToast } from "../../../../utils";
import {
  SettingsListItem,
  SettingsSwitchListItem,
} from "../../../../components/customized";

const { grey0, error } = theme.lightColors || {};

export const PrivacyScreen = () => {
  const { user, setUser } = useAuth();
  const [privateAccount, setPrivateAccount] = useState(user?.private);
  const { t } = useTranslation();

  const { mutate } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: () => {
      setUser({ ...user, private: !privateAccount });
      setPrivateAccount((privateAccount) => !privateAccount);
      showToast({ message: t("youChangedAccountStatus"), short: true });
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleChangePrivate = () => mutate({ private: !privateAccount });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("privacy")} />
      <ScrollView style={{ margin: 15 }}>
        <SettingsSwitchListItem
          title={t("privateAccount")}
          description={t("accountPrivateDescription")}
          sxTitle={{ fontSize: 15 }}
          value={privateAccount}
          onValueChange={handleChangePrivate}
        />
        <Divider style={{ marginVertical: 15 }} color="#ddd" />
        <Heading title={t("interaction")} sx={styles.heading} />
        <SettingsListItem
          title={t("comments")}
          iconLeftProps={{ name: "message-circle", color: grey0 }}
          onPress={() => {}}
        />
        <SettingsListItem
          title={t("mentionsAndTags")}
          iconLeftProps={{ name: "at-sign", color: grey0 }}
          onPress={() => {}}
        />
        <SettingsListItem
          title={t("postViews")}
          iconLeftProps={{ name: "play", color: grey0 }}
          onPress={() => {}}
        />
        <SettingsListItem
          title={t("postLikes")}
          iconLeftProps={{ name: "heart", color: grey0 }}
          onPress={() => {}}
        />
        <SettingsListItem
          title={t("followersList")}
          iconLeftProps={{ name: "users", color: grey0 }}
          onPress={() => {}}
        />
        <SettingsListItem
          title={t("blockedAccounts")}
          iconLeftProps={{ name: "block", type: "entypo", color: grey0 }}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: { color: grey0, fontSize: 15, marginBottom: 5 },
});
