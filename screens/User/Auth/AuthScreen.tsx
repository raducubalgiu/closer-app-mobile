import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import { Divider, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import theme from "../../../assets/styles/theme";
import { Stack, ListItem, Button } from "../../../components/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";

const { black, primary, grey0 } = theme.lightColors || {};

export const AuthScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <Stack align="start" sx={styles.header}>
        <Text style={styles.mainHeading}>{t("yourProfile")}</Text>
        <Text style={styles.secondHeading}>{t("connectIntoAccountTitle")}</Text>
      </Stack>
      <Button
        title={t("connect")}
        onPress={() => navigation.navigate("Login")}
        radius={5}
        size="lg"
        sxBtn={{ margin: 15 }}
      />
      <Stack direction="row" justify="start" sx={styles.registerText}>
        <Text style={styles.textAction}>{t("dontHaveAccount")}</Text>
        <Pressable
          style={{ marginLeft: 5 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.btnAction}>{t("signUp")}</Text>
        </Pressable>
      </Stack>
      <Divider />
      <Stack direction="row" sx={styles.businessContainer}>
        <Icon name="wallet" type="antdesign" size={35} color={black} />
        <Stack align="start" sx={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.businessText}>{t("haveAccountBusiness")}</Text>
          <Pressable onPress={() => navigation.navigate("RegisterBusiness")}>
            <Text style={styles.registerBtnText}>{t("register")}</Text>
          </Pressable>
        </Stack>
      </Stack>
      <Divider />
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <ListItem align="center" sx={styles.listItem} onPress={() => {}}>
          <Icon
            name="settings-outline"
            type="ionicon"
            size={26}
            color={black}
          />
          <Text style={styles.text}>{t("settings")}</Text>
        </ListItem>
        <ListItem align="center" sx={styles.listItem} onPress={() => {}}>
          <Icon
            name="exclamationcircleo"
            type="antdesign"
            size={26}
            color={black}
          />
          <Text style={styles.text}>{t("reportAProblem")}</Text>
        </ListItem>
        <ListItem align="center" sx={styles.listItem} onPress={() => {}}>
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
    marginVertical: 2.5,
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
