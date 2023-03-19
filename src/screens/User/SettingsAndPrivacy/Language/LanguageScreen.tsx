import { SafeAreaView, StyleSheet, View } from "react-native";
import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Header } from "../../../../components/core";
import { SettingsListItem } from "../../../../components/customized";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const LanguageScreen = () => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("language")} />
      <View style={{ margin: 20 }}>
        <SettingsListItem
          title={t("languageApp")}
          description={t("selectDefaultLanguage")}
          onPress={() => navigation.navigate("LanguageApp")}
        />
        <Divider style={styles.divider} />
        <SettingsListItem
          title={t("languageTranslation")}
          description={t("selectLanguageTranslation")}
          onPress={() => navigation.navigate("LanguageTranslation")}
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
  divider: { marginTop: 15, marginBottom: 5 },
});
