import { useTranslation } from "react-i18next";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header, Stack } from "../../../../components/core";
import CustomAvatar from "../../../../components/core/Avatars/CustomAvatar";
import { useAuth } from "../../../../hooks";
import theme from "../../../../../assets/styles/theme";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { SettingsListItem } from "../../../../components/customized";

const { black, error } = theme.lightColors || {};

export const DeleteAccountScreen = () => {
  const { user } = useAuth();
  const { status } = user?.settings || {};
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToHideAccount = () => navigation.navigate("HideAccount");
  const goToDisableAccount = () => navigation.navigate("DisableAccount");
  const goToDeleteAccountPermanently = () =>
    navigation.navigate("DeleteAccountPermanently");

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={`@${user?.username}`} />
      <ScrollView style={{ margin: 20 }} bounces={false}>
        <Stack align="center" sx={{ width: "100%", marginBottom: 50 }}>
          <CustomAvatar avatar={user?.avatar} size={100} />
        </Stack>
        <SettingsListItem
          onPress={goToHideAccount}
          title={
            status === "hidden" ? t("yourAccountIsHidden") : t("hideAccount")
          }
          sxTitle={{
            ...styles.title,
            color: status === "hidden" ? error : black,
          }}
          description={
            status === "hidden"
              ? t("yourAccountIsHiddenDescription")
              : t("hideAccountDescription")
          }
        />
        <Divider style={styles.divider} />
        <SettingsListItem
          onPress={goToDisableAccount}
          title={t("disableAccount")}
          sxTitle={styles.title}
          description={t("disableAccountDescription")}
        />
        <Divider style={styles.divider} />
        <SettingsListItem
          onPress={goToDeleteAccountPermanently}
          title={t("deleteAccountPermanently")}
          sxTitle={styles.title}
          description={t("deleteAccountPermanentlyDescription")}
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
  title: { fontSize: 15, marginBottom: 5 },
  divider: { marginTop: 15, marginBottom: 5 },
});
