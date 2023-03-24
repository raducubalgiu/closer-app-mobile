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
    uri: `/users/${user?.id}`,
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

  const handleChangePrivate = () =>
    mutate({ settings: { ...user?.settings, private: !privateAccount } });

  const inputs = [
    {
      title: t("comments"),
      iconProps: { name: "message-circle", color: grey0 },
      nav: "PrivacyComments",
    },
    {
      title: t("mentionsAndTags"),
      iconProps: { name: "at-sign", color: grey0 },
      nav: "PrivacyTagsAndMentions",
    },
    {
      title: t("listLikes"),
      iconProps: { name: "heart", color: grey0 },
      nav: "PrivacyLikes",
    },
    {
      title: t("followingsList"),
      iconProps: { name: "users", color: grey0 },
      nav: "PrivacyFollowings",
    },
    {
      title: t("blockedAccounts"),
      iconProps: { name: "block", type: "entypo", color: grey0 },
      nav: "PrivacyBlockedAccounts",
    },
  ];

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
        {inputs.map((input, i) => (
          <SettingsListItem
            key={i}
            title={input.title}
            iconLeftProps={input.iconProps}
            onPress={() => navigation.navigate<any>(input.nav)}
            sx={{ paddingVertical: 12.5 }}
          />
        ))}
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
