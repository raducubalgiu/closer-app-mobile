import { StyleSheet, ScrollView, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { Header, Heading, ListItem, Stack } from "../../../../components/core";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Divider, Icon } from "@rneui/themed";

const { black, grey0 } = theme.lightColors || {};

export const SettingsProfileScreen = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("settingsAndPrivacy")} divider={true} />
      </SafeAreaView>
      <ScrollView style={styles.container}>
        <Stack align="start">
          <Heading title={t("account")} />
          <ListItem between>
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
          <ListItem between mt={15}>
            <Stack direction="row">
              <Icon
                name="lock"
                type="feather"
                size={20}
                color={black}
                style={styles.icon}
              />
              <Text style={styles.text}>{t("confidentiality")}</Text>
            </Stack>
            <Icon name="keyboard-arrow-right" color={grey0} />
          </ListItem>
          <ListItem between mt={15}>
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
          <ListItem between mt={15}>
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
        <Divider color="#ddd" style={{ marginTop: 15, marginBottom: 10 }} />
        <Stack align="start">
          <Heading title={t("cacheAndMobileData")} />
          <ListItem between>
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
          <ListItem between mt={15}>
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
        <Divider color="#ddd" style={{ marginTop: 15, marginBottom: 10 }} />
        <Stack align="start">
          <Heading title={t("assistance")} />
          <ListItem between>
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
          <ListItem between mt={15}>
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
          <ListItem between mt={15}>
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
        <Divider color="#ddd" style={{ marginTop: 15, marginBottom: 10 }} />
        <Stack align="start">
          <Heading title={t("login")} />
          <ListItem between>
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
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 6,
    borderRadius: 50,
  },
});
