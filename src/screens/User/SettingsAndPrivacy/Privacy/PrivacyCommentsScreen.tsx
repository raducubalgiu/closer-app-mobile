import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import {
  Button,
  FormInputRadio,
  Header,
  Heading,
} from "../../../../components/core";
import theme from "../../../../../assets/styles/theme";
import { useAuth, usePatch } from "../../../../hooks";
import { displayNothing } from "../../../../utils";
import { showToast } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";

const { grey0, error } = theme.lightColors || {};

export const PrivacyCommentsScreen = () => {
  const { user, setUser } = useAuth();
  const { viewComments } = user?.settings || {};
  const [canAddComment, setCanAddComment] = useState(viewComments);
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  const inputs = [
    {
      id: "1",
      title: t("allPeople"),
      description: t("privacyCommentsAllDescription"),
      action: "all",
    },
    {
      id: "2",
      title: t("followersThatYouAreFollowing"),
      description: t("privacyCommentsFollowersThatYouAreFollowingDescription"),
      action: "followersAndFollowings",
    },
    {
      id: "3",
      title: t("nobody"),
      description: t("privacyCommentsNobodyDescription"),
      action: "me",
    },
  ];

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: { ...user?.settings, viewComments: canAddComment },
      });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () => mutate({ viewComments: canAddComment });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanCommentToYourPosts")} sx={styles.heading} />
          {inputs.map((input, i) => {
            return (
              <View key={i}>
                <FormInputRadio
                  title={input.title}
                  description={displayNothing(
                    canAddComment === input.action,
                    input.description
                  )}
                  checked={canAddComment === input.action}
                  onPress={() => setCanAddComment(input.action)}
                  sx={{ paddingVertical: 0 }}
                />
                <Divider color="#ddd" style={styles.divider} />
              </View>
            );
          })}
        </View>
        <Button
          title={t("save")}
          onPress={handleUpdate}
          disabled={viewComments === canAddComment || isLoading}
          loading={isLoading}
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
  heading: { marginTop: 0, marginBottom: 25 },
  container: { margin: 15, justifyContent: "space-between", flex: 1 },
  divider: { marginVertical: 10 },
  description: { color: grey0, marginBottom: 15 },
});
