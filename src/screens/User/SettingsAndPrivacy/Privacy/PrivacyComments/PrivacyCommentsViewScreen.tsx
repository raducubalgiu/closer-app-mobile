import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Divider } from "@rneui/themed";
import {
  Header,
  Heading,
  FormInputRadio,
  Button,
} from "../../../../../components/core";
import { useAuth } from "../../../../../hooks";
import { useState } from "react";
import { usePatch } from "../../../../../hooks";
import { showToast } from "../../../../../utils";
import theme from "../../../../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const { error } = theme.lightColors || {};

export const PrivacyCommentsViewScreen = () => {
  const { user, setUser } = useAuth();
  const { comments } = user?.settings || {};
  const [view, setView] = useState(comments?.view);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: {
          ...user?.settings,
          comments: { ...user?.settings.comments, view },
        },
      });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () =>
    mutate({
      settings: { ...user?.settings, comments: { ...comments, view } },
    });

  const inputs = [
    { title: t("allPeople"), action: "all" },
    { title: t("nobody"), action: "nobody" },
    {
      title: t("followersThatYouAreFollowing"),
      action: "followersAndFollowings",
    },
  ];

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("privacyCommentsCreateTitle")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanSeeCommentsToYourPosts")} />
          {inputs.map((input, i) => (
            <View key={i}>
              <FormInputRadio
                title={input.title}
                checked={view === input.action}
                onPress={() => setView(input.action)}
                variant="normal"
                sx={{ paddingBottom: 0 }}
              />
              <Divider color="#ddd" style={styles.divider} />
            </View>
          ))}
        </View>
        <Button
          title={t("save")}
          disabled={view === comments?.view}
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
  divider: { marginVertical: 10 },
});
