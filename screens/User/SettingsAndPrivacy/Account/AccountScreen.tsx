import { SafeAreaView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Header, Stack } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { useAuth } from "../../../../hooks";
import { SettingsListItem } from "../../../../components/customized";

const { black } = theme.lightColors || {};

export const AccountScreen = () => {
  const { user } = useAuth();
  const { email, phone, gender } = user || {};
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToAccountInfo = () =>
    navigation.navigate("AccountInfo", { email, phone, gender });

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("account")} />
      <Stack sx={styles.container}>
        <SettingsListItem title={t("userInfo")} onPress={goToAccountInfo} />
        <SettingsListItem
          title={t("password")}
          onPress={() => navigation.navigate("AccountPassword")}
        />
        <SettingsListItem
          title={t("deleteHideOrDisableAccount")}
          onPress={() => navigation.navigate("DeleteAccount")}
        />
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  text: {
    color: black,
    fontWeight: "500",
  },
});
