import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Header } from "../../../../../components/core";
import { useNavigation } from "@react-navigation/native";
import { SettingsListItem } from "../../../../../components/customized";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../../navigation/rootStackParams";

export const PrivacyCommentsScreen = () => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("comments")} />
      <View style={styles.container}>
        <SettingsListItem
          title={t("privacyCommentsCreateTitle")}
          description={t("privacyCommentsCreateDescription")}
          onPress={() => navigation.navigate("PrivacyCommentsCreate")}
        />
        <SettingsListItem
          title={t("privacyCommentsViewTitle")}
          description={t("privacyCommentsViewDescription")}
          onPress={() => navigation.navigate("PrivacyCommentsView")}
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
  container: { margin: 15 },
});
