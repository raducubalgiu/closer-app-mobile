import { useTranslation } from "react-i18next";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Header, Stack } from "../../../../components/core";
import CustomAvatar from "../../../../components/core/Avatars/CustomAvatar";
import { useAuth } from "../../../../hooks";
import theme from "../../../../assets/styles/theme";
import { Divider, Icon } from "@rneui/themed";

const { black, grey0 } = theme.lightColors || {};

export const DeleteAccountScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("deleteAccount")} />
      <ScrollView style={{ margin: 20 }} bounces={false}>
        <Stack align="center" sx={{ width: "100%", marginBottom: 50 }}>
          <CustomAvatar avatar={user?.avatar} size={100} />
        </Stack>
        <Pressable>
          <Stack direction="row">
            <Stack align="start" sx={{ flex: 1 }}>
              <Text style={styles.title}>{t("disableAccount")}</Text>
              <Text style={{ color: grey0 }}>
                {t("disableAccountDescription")}
              </Text>
            </Stack>
            <Icon
              name="keyboard-arrow-right"
              color={grey0}
              style={{ marginLeft: 10 }}
            />
          </Stack>
        </Pressable>
        <Divider style={{ marginVertical: 20 }} />
        <Pressable>
          <Stack direction="row">
            <Stack align="start" sx={{ flex: 1 }}>
              <Text style={styles.title}>{t("deleteAccountPermanently")}</Text>
              <Text style={{ color: grey0 }}>
                {t("deleteAccountPermanentlyDescription")}
              </Text>
            </Stack>
            <Icon
              name="keyboard-arrow-right"
              color={grey0}
              style={{ marginLeft: 10 }}
            />
          </Stack>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 10,
    color: black,
  },
});
