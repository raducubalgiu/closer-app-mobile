import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { Button, Header, Heading } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { TextWithBullet } from "../../../../components/customized";
import { useAuth, usePatch } from "../../../../hooks";
import { showToast } from "../../../../utils";

const { black } = theme.lightColors || {};

export const DisableAccountScreen = () => {
  const auth = getAuth();
  const { user, setUser } = useAuth();
  const { t } = useTranslation();

  const { mutate, isLoading } = usePatch({
    uri: `/users/${user?.id}/settings`,
    onSuccess: () => {
      signOut(auth)
        .then(() => setUser(null))
        .catch(() => showToast({ message: t("somethingWentWrong") }));
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("disableAccount")} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView bounces={false} style={{ margin: 20 }}>
          <Heading
            title={t("areYouSure")}
            sx={{ fontWeight: "500", fontSize: 19 }}
          />
          <Text style={styles.title}>{t("byDeactivatingTheAccount")}:</Text>
          <TextWithBullet text={t("nobodyCanSeeYourAccountAndContent")} />
          <TextWithBullet text={t("youCannotEngageWithOtherUsers")} />
          <TextWithBullet
            text={t("yourAccountWillNotDeletedAndYouCanRecover")}
          />
          <TextWithBullet
            text={t("youCannotBookServiceAnymore")}
            sxText={{ color: black, fontWeight: "500" }}
          />
        </ScrollView>
        <Button
          title={t("deactivate")}
          sxBtn={{ marginHorizontal: 20 }}
          loading={isLoading}
          disabled={isLoading}
          onPress={() => mutate({ status: "disabled" })}
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
  title: {
    marginTop: 20,
    marginBottom: 15,
    color: black,
    fontSize: 14.5,
  },
});
