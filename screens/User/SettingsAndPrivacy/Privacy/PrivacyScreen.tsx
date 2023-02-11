import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, Stack, ListItem, Heading } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Divider, Switch, Icon } from "@rneui/themed";
import { useState } from "react";
import { useAuth, usePatch } from "../../../../hooks";
import { showToast } from "../../../../utils";

const { black, grey0, error } = theme.lightColors || {};

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
      <ScrollView style={{ marginHorizontal: 15, marginVertical: 5 }}>
        <ListItem onPress={() => {}} between>
          <Stack align="start" sx={{ marginRight: 10, flex: 1 }}>
            <Text style={{ ...styles.title, marginLeft: 0 }}>Cont Privat</Text>
            <Text style={styles.description}>
              {t("accountPrivateDescription")}
            </Text>
          </Stack>
          <Switch value={privateAccount} onValueChange={handleChangePrivate} />
        </ListItem>
        <Divider style={{ marginVertical: 15 }} color="#ddd" />
        <Heading title={t("interaction")} sx={{ color: grey0, fontSize: 15 }} />
        <ListItem mt={15} between onPress={() => {}}>
          <Stack direction="row">
            <Icon
              name="message-circle"
              type="feather"
              color={grey0}
              size={20}
            />
            <Text style={styles.title}>{t("comments")}</Text>
          </Stack>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem mt={30} between onPress={() => {}}>
          <Stack direction="row">
            <Icon name="at-sign" type="feather" color={grey0} size={20} />
            <Text style={styles.title}>{t("mentionsAndTags")}</Text>
          </Stack>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem mt={30} between onPress={() => {}}>
          <Stack direction="row">
            <Icon name="play" type="feather" color={grey0} size={20} />
            <Text style={styles.title}>{t("postViews")}</Text>
          </Stack>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem mt={30} between onPress={() => {}}>
          <Stack direction="row">
            <Icon name="heart" type="feather" color={grey0} size={20} />
            <Text style={styles.title}>{t("postLikes")}</Text>
          </Stack>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem mt={30} between onPress={() => {}}>
          <Stack direction="row">
            <Icon name="users" type="feather" color={grey0} size={20} />
            <Text style={styles.title}>{t("followersList")}</Text>
          </Stack>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem mt={30} between onPress={() => {}}>
          <Stack direction="row">
            <Icon name="block" type="entypo" color={grey0} size={20} />
            <Text style={styles.title}>{t("blockedAccounts")}</Text>
          </Stack>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  listItem: {
    backgroundColor: "white",
    marginBottom: 15,
  },
  title: {
    color: black,
    paddingVertical: 2.5,
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 10,
  },
  description: {
    color: grey0,
  },
});
