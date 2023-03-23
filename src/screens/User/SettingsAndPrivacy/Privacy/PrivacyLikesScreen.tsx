import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Button,
  FormInputRadio,
  Header,
  Heading,
} from "../../../../components/core";
import theme from "../../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { useAuth, usePatch } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { showToast, displayNothing } from "../../../../utils";
import { ViewLikesEnum } from "../../../../models";

const { grey0, error } = theme.lightColors || {};

export const PrivacyLikesScreen = () => {
  const { user, setUser } = useAuth();
  const { settings } = user || {};
  const [viewLikes, setViewLikes] = useState(settings?.viewLikes);
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  const inputs = [
    {
      title: t("allPeople"),
      description: t("privacyLikesAllDescription"),
      action: ViewLikesEnum.ALL,
    },
    {
      title: t("justMe"),
      description: t("privacyLikesJustMe"),
      action: ViewLikesEnum.ME,
    },
  ];

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: { ...user?.settings, viewLikes },
      });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () => mutate({ viewLikes });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} />
      <View style={styles.container}>
        <View>
          <Heading
            title={t("whoCanSeeLikesListOfYourPosts")}
            sx={styles.heading}
          />
          {inputs.map((input, i) => (
            <View key={i}>
              <FormInputRadio
                title={input.title}
                description={displayNothing(
                  viewLikes === input.action,
                  input.description
                )}
                checked={viewLikes === input.action}
                onPress={() => setViewLikes(input.action)}
                sx={{ paddingVertical: 0 }}
                variant="normal"
              />
              <Divider color="#ddd" style={{ marginVertical: 10 }} />
            </View>
          ))}
        </View>
        <Button
          title={t("save")}
          onPress={handleUpdate}
          disabled={viewLikes === settings?.viewLikes || isLoading}
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
  container: { margin: 15, justifyContent: "space-between", flex: 1 },
  heading: { marginTop: 0, marginBottom: 25 },
  description: { color: grey0, marginBottom: 15 },
});
