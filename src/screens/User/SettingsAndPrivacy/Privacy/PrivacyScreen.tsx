import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header, Heading } from "../../../../components/core";
import theme from "../../../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../../hooks";
import { showToast } from "../../../../utils";
import {
  SettingsListItem,
  SettingsSwitchListItem,
} from "../../../../components/customized";
import { RootStackParams } from "../../../../navigation/rootStackParams";

const { grey0, error } = theme.lightColors || {};

export const PrivacyScreen = () => {
  const { user, setUser } = useAuth();
  const [privateAccount, setPrivateAccount] = useState(user?.settings?.private);
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { mutate } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: { ...user?.settings, private: !privateAccount },
      });
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
          onPress={() => navigation.navigate("PrivacyComments")}
          sx={{ paddingVertical: 12.5 }}
        />
        <SettingsListItem
          title={t("mentionsAndTags")}
          iconLeftProps={{ name: "at-sign", color: grey0 }}
          onPress={() => navigation.navigate("PrivacyTagsAndMentions")}
          sx={{ paddingVertical: 12.5 }}
        />
        <SettingsListItem
          title={t("postViews")}
          iconLeftProps={{ name: "play", color: grey0 }}
          onPress={() => {}}
          sx={{ paddingVertical: 12.5 }}
        />
        <SettingsListItem
          title={t("postLikes")}
          iconLeftProps={{ name: "heart", color: grey0 }}
          onPress={() => navigation.navigate("PrivacyLikes")}
          sx={{ paddingVertical: 12.5 }}
        />
        <SettingsListItem
          title={t("followingsList")}
          iconLeftProps={{ name: "users", color: grey0 }}
          onPress={() => navigation.navigate("PrivacyFollowings")}
          sx={{ paddingVertical: 12.5 }}
        />
        <SettingsListItem
          title={t("blockedAccounts")}
          iconLeftProps={{ name: "block", type: "entypo", color: grey0 }}
          onPress={() => navigation.navigate("PrivacyBlockedAccounts")}
          sx={{ paddingVertical: 12.5 }}
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
