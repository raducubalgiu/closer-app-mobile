import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import theme from "../../../assets/styles/theme";
import { Divider, Icon } from "@rneui/themed";
import MenuItemBigger from "../../../components/customized/MenuItem/MenuItemBigger";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Stack, Button } from "../../../components/core";

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
        <Icon
          name="wallet"
          type="antdesign"
          size={35}
          color={theme.lightColors.black}
        />
        <Stack align="start" sx={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.businessText}>{t("haveAccount")}</Text>
          <Button onPress={() => navigation.navigate("RegisterBusiness")}>
            <Text style={styles.registerBtnText}>{t("register")}</Text>
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <MenuItemBigger
          onPress={() => {}}
          iconName="settings-outline"
          iconType="ionicon"
          text="Setări"
        />
        <MenuItemBigger
          onPress={() => {}}
          iconName="exclamationcircleo"
          iconType="antdesign"
          text="Raportează o problemă"
        />
        <MenuItemBigger
          onPress={() => {}}
          iconName="questioncircleo"
          iconType="antdesign"
          text="Termeni şi condiţii"
        />
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
    fontFamily: "Exo-SemiBold",
    fontSize: 27,
    color: theme.lightColors.black,
  },
  mainBtnText: {
    textAlign: "center",
    color: "white",
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  secondHeading: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.grey0,
    fontSize: 16,
    marginTop: 2.5,
  },
  mainBtn: {
    backgroundColor: theme.lightColors.primary,
    marginTop: 30,
    padding: 12.5,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  registerText: {
    marginVertical: 20,
  },
  textAction: {
    fontFamily: "Exo-Regular",
    fontSize: 14,
    color: theme.lightColors.black,
    marginLeft: 20,
  },
  btnAction: {
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    color: theme.lightColors.black,
  },
  businessContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  businessText: {
    fontFamily: "Exo-Regular",
    fontSize: 15,
  },
  registerBtnText: {
    marginTop: 5,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
});
