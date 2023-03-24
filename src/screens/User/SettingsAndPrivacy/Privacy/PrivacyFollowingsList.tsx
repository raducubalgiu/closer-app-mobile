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
import { showToast } from "../../../../utils";
import { ViewFollowingsListEnum } from "../../../../models/enums/viewFollowingsListEnum";

const { grey0, error } = theme.lightColors || {};

export const PrivacyFollowingsScreen = () => {
  const { user, setUser } = useAuth();
  const { settings } = user || {};
  const [viewFollowings, setViewFollowings] = useState(
    settings?.viewFollowings
  );
  const { t } = useTranslation("common");
  const navigation = useNavigation();

  const inputs = [
    {
      title: t("allPeople"),
      action: ViewFollowingsListEnum.ALL,
    },
    {
      title: t("justMe"),
      action: ViewFollowingsListEnum.ME,
    },
  ];

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}`,
    onSuccess: () => {
      setUser({
        ...user,
        settings: { ...user?.settings, viewFollowings },
      });
      showToast({ message: t("youChangedSettings"), short: true });
      navigation.goBack();
    },
    onError: () =>
      showToast({ message: t("somethingWentWrong"), bgColor: error }),
  });

  const handleUpdate = () =>
    mutate({ settings: { ...user?.settings, viewFollowings } });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} />
      <View style={styles.container}>
        <View>
          <Heading title={t("whoCanSeeYourFollowings")} sx={styles.heading} />
          {inputs.map((input, i) => (
            <View key={i}>
              <FormInputRadio
                title={input.title}
                checked={viewFollowings === input.action}
                onPress={() => setViewFollowings(input.action)}
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
          disabled={viewFollowings === settings?.viewFollowings || isLoading}
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
  description: { color: grey0, marginBottom: 15 },
});
