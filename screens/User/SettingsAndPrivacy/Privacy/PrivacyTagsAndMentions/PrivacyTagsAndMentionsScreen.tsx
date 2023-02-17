import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header, Stack } from "../../../../../components/core";
import { SettingsListItem } from "../../../../../components/customized";
import { RootStackParams } from "../../../../../navigation/rootStackParams";

export const PrivacyTagsAndMentionsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("mentionsAndTags")} />
      <Stack align="start" sx={{ margin: 15 }}>
        <SettingsListItem
          title={t("mentions")}
          description={t("chooseWhoCanMentionYouDescription")}
          onPress={() => navigation.navigate("PrivacyMentions")}
        />
        <SettingsListItem
          title={t("tags")}
          description={t("chooseWhoCanTagYouDescription")}
          onPress={() => navigation.navigate("PrivacyTags")}
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
});
