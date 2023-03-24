import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  FormInputRadio,
  Header,
  Heading,
} from "../../../../../components/core";
import theme from "../../../../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../../../hooks";
import { showToast } from "../../../../../utils";
import { useNavigation } from "@react-navigation/native";
import { MentionsEnum } from "../../../../../ts";

const { error } = theme.lightColors || {};

export const PrivacyMentionsScreen = () => {
  const { user, setUser } = useAuth();
  const { settings } = user || {};
  const [mentions, setMentions] = useState(settings?.mentions);
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: () => {
      setUser({ ...user, settings: { ...user?.settings, mentions } });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () =>
    mutate({ settings: { ...user?.settings, mentions } });

  const inputs = [
    { title: t("allPeople"), action: MentionsEnum.ALL },
    { title: t("peopleThatYouAreFollowing"), action: MentionsEnum.FOLLOWINGS },
    {
      title: t("followersThatYouAreFollowing"),
      action: MentionsEnum.FOLLOWERS_AND_FOLLOWINGS,
    },
    {
      title: t("nobody"),
      action: MentionsEnum.NOBODY,
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("mentions")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanMentionYou")} />
          {inputs.map((input, i) => (
            <View key={i}>
              <FormInputRadio
                title={input.title}
                checked={mentions === input.action}
                onPress={() => setMentions(input.action)}
                variant="normal"
                sx={{ paddingBottom: 0, marginTop: 5 }}
              />
              <Divider color="#ddd" style={styles.divider} />
            </View>
          ))}
        </View>
        <Button
          title={t("save")}
          disabled={mentions === settings?.mentions}
          loading={isLoading}
          onPress={handleUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { margin: 15, justifyContent: "space-between", flex: 1 },
  divider: { marginVertical: 5 },
});
