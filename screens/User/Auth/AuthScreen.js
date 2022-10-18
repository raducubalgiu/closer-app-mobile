import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import theme from "../../../assets/styles/theme";
import { Divider, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Stack, Button, ListItem } from "../../../components/core";

const { black, primary, grey0 } = theme.lightColors;

const AuthScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack align="start" sx={styles.header}>
        <Text style={styles.mainHeading}>{t("yourProfile")}</Text>
        <Text style={styles.secondHeading}>{t("connectIntoAccountTitle")}</Text>
      </Stack>
      <Button onPress={() => navigation.navigate("Login")} sx={styles.mainBtn}>
        <Text style={styles.mainBtnText}>{t("connect")}</Text>
      </Button>
      <Stack direction="row" justify="start" sx={styles.registerText}>
        <Text style={styles.textAction}>{t("dontHaveAccount")}</Text>
        <Button
          sx={{ marginLeft: 5 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.btnAction}>{t("signUp")}</Text>
        </Button>
      </Stack>
      <Divider />
      <Stack direction="row" sx={styles.businessContainer}>
        <Icon name="wallet" type="antdesign" size={35} color={black} />
        <Stack align="start" sx={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.businessText}>{t("haveAccountBusiness")}</Text>
          <Button onPress={() => navigation.navigate("RegisterBusiness")}>
            <Text style={styles.registerBtnText}>{t("register")}</Text>
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <ListItem sx={styles.listItem}>
          <Icon
            name="settings-outline"
            type="ionicon"
            size={26}
            color={black}
          />
          <Text style={styles.text}>{t("settings")}</Text>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Icon
            name="exclamationcircleo"
            type="antdesign"
            size={26}
            color={black}
          />
          <Text style={styles.text}>{t("reportAProblem")}</Text>
        </ListItem>
        <ListItem sx={styles.listItem}>
          <Icon
            name="questioncircleo"
            type="antdesign"
            size={26}
            color={black}
          />
          <Text style={styles.text}>{t("termsAndConditions")}</Text>
        </ListItem>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingRight: 50,
    marginHorizontal: 20,
  },
  mainHeading: {
    fontSize: 27,
    color: black,
    fontWeight: "600",
  },
  mainBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  secondHeading: {
    color: grey0,
    fontSize: 16,
    marginTop: 2.5,
  },
  mainBtn: {
    backgroundColor: primary,
    marginTop: 30,
    padding: 12.5,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  registerText: {
    marginVertical: 20,
  },
  textAction: {
    fontSize: 14,
    color: black,
    marginLeft: 20,
  },
  btnAction: {
    fontSize: 15.5,
    color: black,
    fontWeight: "600",
  },
  businessContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  businessText: {
    fontSize: 15,
  },
  registerBtnText: {
    marginTop: 5,
    fontSize: 15.5,
    fontWeight: "600",
  },
  listItem: { marginBottom: 10 },
  text: {
    fontSize: 16,
    color: black,
    marginLeft: 10,
  },
});
