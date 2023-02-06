import { StyleSheet, ScrollView, SafeAreaView, Text, View } from "react-native";
import { Divider, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header, Heading, ListItem, Stack } from "../../../components/core";
import theme from "../../../assets/styles/theme";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { useAuth } from "../../../hooks";
import { showToast } from "../../../utils";

const { black, grey0 } = theme.lightColors || {};

export const SettingsProfileScreen = () => {
  const { user, setUser } = useAuth();
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
        <Header title={t("settingsAndPrivacy")} divider={true} />
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <Stack align="start">
          <Heading title={t("account")} />
          <ListItem between onPress={() => navigation.navigate("Account")}>
            <Stack direction="row">
              <Icon
                name="user"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("account")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem
            between
            mt={20}
            onPress={() => navigation.navigate("Privacy")}
          >
            <Stack direction="row">
              <Icon
                name="lock"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("privacy")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem
            between
            mt={20}
            onPress={() => navigation.navigate("Discounts")}
          >
            <Stack direction="row">
              <Icon
                name="gift"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("discounts")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem between mt={20}>
            <Stack direction="row">
              <Icon
                name="share"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("shareProfile")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
        </Stack>
        <Divider color="#ddd" style={{ marginTop: 20, marginBottom: 10 }} />
        <Stack align="start">
          <Heading title={t("cacheAndMobileData")} />
          <ListItem between onPress={() => navigation.navigate("ClearCache")}>
            <Stack direction="row">
              <Icon
                name="trash-2"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("eraseStorage")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem
            between
            mt={20}
            onPress={() => navigation.navigate("SavingData")}
          >
            <Stack direction="row">
              <Icon
                name="wifi"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("savingData")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
        </Stack>
        <Divider color="#ddd" style={{ marginTop: 20, marginBottom: 10 }} />
        <Stack align="start">
          <Heading title={t("assistance")} />
          <ListItem
            between
            onPress={() => navigation.navigate("ReportAProblem")}
          >
            <Stack direction="row">
              <Icon
                name="flag"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("reportAProblem")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem
            between
            mt={20}
            onPress={() => navigation.navigate("Assistance")}
          >
            <Stack direction="row">
              <Icon
                name="message-circle"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("assistance")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem between mt={20}>
            <Stack direction="row">
              <Icon
                name="info"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("about")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
        </Stack>
        <Divider color="#ddd" style={{ marginTop: 20, marginBottom: 10 }} />
        <Stack align="start">
          <Heading title={t("connecting")} />
          <ListItem between onPress={handleLogout}>
            <Stack direction="row">
              <Icon
                name="log-out"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("logout")}</Text>
            </Stack>
          </ListItem>
        </Stack>
        <View style={{ marginBottom: 50 }} />
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
  text: {
    marginLeft: 10,
    color: black,
    fontWeight: "600",
    fontSize: 13,
  },
  icon: {
    padding: 6,
    borderRadius: 50,
  },
});
