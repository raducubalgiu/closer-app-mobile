import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Header, ListItem, Stack } from "../../../../components/core";
import theme from "../../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

const { grey0, black } = theme.lightColors || {};

export const AccountScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("account")} />
      <Stack sx={styles.container}>
        <ListItem between onPress={() => navigation.navigate("AccountInfo")}>
          <Text style={styles.text}>{t("userInfo")}</Text>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem
          mt={25}
          between
          onPress={() => navigation.navigate("AccountPassword")}
        >
          <Text style={styles.text}>{t("password")}</Text>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
        <ListItem
          mt={25}
          between
          onPress={() => navigation.navigate("DeleteAccount")}
        >
          <Text style={styles.text}>{t("deleteOrDisableAccount")}</Text>
          <Icon name="keyboard-arrow-right" color={grey0} />
        </ListItem>
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
    marginVertical: 5,
  },
  text: {
    color: black,
    fontWeight: "500",
  },
});
