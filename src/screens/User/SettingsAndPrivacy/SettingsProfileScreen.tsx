import { StyleSheet, ScrollView, SafeAreaView, Text, View } from "react-native";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header, Heading, Stack } from "../../../components/core";
import theme from "../../../../assets/styles/theme";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { useAuth } from "../../../hooks";
import { showToast } from "../../../utils";
import { SettingsListItem } from "../../../components/customized";

const { grey0 } = theme.lightColors || {};

export const SettingsProfileScreen = () => {
  const { setUser } = useAuth();
  const auth = getAuth();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(() => showToast({ message: t("somethingWentWrong") }));
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("settingsAndPrivacy")} />
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <Stack align="start">
          <Heading title={t("account")} sx={{ marginBottom: 5 }} />
          <SettingsListItem
            onPress={() => navigation.navigate("Account")}
            title={t("account")}
            iconLeftProps={{ name: "user" }}
          />
          <SettingsListItem
            onPress={() => navigation.navigate("Privacy")}
            title={t("privacy")}
            iconLeftProps={{ name: "lock" }}
          />
          <SettingsListItem
            onPress={() => navigation.navigate("Discounts")}
            title={t("discounts")}
            iconLeftProps={{ name: "gift" }}
          />
          <SettingsListItem
            onPress={() => {}}
            title={t("shareProfile")}
            iconLeftProps={{ name: "share" }}
          />
        </Stack>
        <Divider color="#ddd" style={styles.divider} />
        <Stack align="start">
          <Heading title={t("cacheAndMobileData")} />
          <SettingsListItem
            onPress={() => navigation.navigate("ClearCache")}
            title={t("eraseStorage")}
            iconLeftProps={{ name: "trash-2" }}
          />
          <SettingsListItem
            onPress={() => navigation.navigate("SavingData")}
            title={t("savingData")}
            iconLeftProps={{ name: "wifi" }}
          />
        </Stack>
        <Divider color="#ddd" style={styles.divider} />
        <Stack align="start">
          <Heading title={t("assistance")} />
          <SettingsListItem
            onPress={() => navigation.navigate("ReportAProblem")}
            title={t("reportAProblem")}
            iconLeftProps={{ name: "flag" }}
          />
          <SettingsListItem
            onPress={() => navigation.navigate("Assistance")}
            title={t("assistance")}
            iconLeftProps={{ name: "message-circle" }}
          />
          <SettingsListItem
            onPress={() => {}}
            title={t("about")}
            iconLeftProps={{ name: "info" }}
          />
        </Stack>
        <Divider color="#ddd" style={styles.divider} />
        <Stack align="start">
          <Heading title={t("connecting")} />
          <SettingsListItem
            onPress={handleLogout}
            title={t("logout")}
            iconLeftProps={{ name: "log-out" }}
          />
        </Stack>
        <View style={styles.version}>
          <Text style={styles.versionTxt}>v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
  },
  divider: { marginTop: 20, marginBottom: 10 },
  version: {
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  versionTxt: { fontWeight: "500", color: grey0 },
});
