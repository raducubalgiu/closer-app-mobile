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
import { TagsEnum } from "../../../../../ts";

const { error } = theme.lightColors || {};

export const PrivacyTagsScreen = () => {
  const { user, setUser } = useAuth();
  const { settings } = user || {};
  const [tags, setTags] = useState(settings?.tags);
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: () => {
      setUser({ ...user, settings: { ...user?.settings, tags } });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () => mutate({ settings: { ...user?.settings, tags } });

  const inputs = [
    { title: t("allPeople"), action: TagsEnum.ALL },
    { title: t("peopleThatYouAreFollowing"), action: TagsEnum.FOLLOWINGS },
    {
      title: t("followersThatYouAreFollowing"),
      action: TagsEnum.FOLLOWERS_AND_FOLLOWINGS,
    },
    {
      title: t("nobody"),
      action: TagsEnum.NOBODY,
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("tags")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanMentionYou")} />
          {inputs.map((input, i) => (
            <View key={i}>
              <FormInputRadio
                title={input.title}
                checked={tags === input.action}
                onPress={() => setTags(input.action)}
                variant="normal"
                sx={{ paddingBottom: 0, marginTop: 5 }}
              />
              <Divider color="#ddd" style={styles.divider} />
            </View>
          ))}
        </View>
        <Button
          title={t("save")}
          disabled={tags === settings?.tags}
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
