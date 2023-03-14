import { StyleSheet, Text } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Stack, ListItem, Protected } from "../../../../../core";
import { useTranslation } from "react-i18next";
import theme from "../../../../../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../../../navigation/rootStackParams";
import { User } from "../../../../../../models";

type IProps = { website: string; email: string; owner: User };
const { black, grey0, primary } = theme.lightColors || {};

const AboutInfo = ({ website, email, owner }: IProps) => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const goToOwner = () => {
    navigation.push("ProfileGeneral", {
      userId: owner.id,
      avatar: owner.avatar,
      username: owner.username,
      name: owner.name,
      checkmark: owner.checkmark,
      service: null,
      option: null,
    });
  };

  return (
    <Stack align="start" sx={styles.section}>
      <Text style={styles.heading}>{t("contact")}</Text>
      {website && (
        <ListItem
          sx={{ marginBottom: 5 }}
          align="center"
          onPress={() => WebBrowser.openBrowserAsync(`https://${website}`)}
        >
          <Icon name="globe" type="feather" color={grey0} size={20} />
          <Text style={{ ...styles.text, marginTop: 0, marginLeft: 7.5 }}>
            {website}
          </Text>
        </ListItem>
      )}
      {email && (
        <ListItem
          sx={{ marginBottom: 5 }}
          align="center"
          onPress={() => Linking.openURL(`mailto:${email}`)}
        >
          <Icon name="mail" type="feather" color={grey0} size={20} />
          <Text style={{ ...styles.text, marginTop: 0, marginLeft: 7.5 }}>
            {email}
          </Text>
        </ListItem>
      )}
      <Protected userRole={"employee"} roles={["employee"]}>
        <ListItem sx={{ marginBottom: 5 }} align="center" onPress={goToOwner}>
          <Icon name="repeat" type="feather" color={grey0} size={20} />
          <Stack direction="row">
            <Text style={{ ...styles.text, marginTop: 0, marginLeft: 7.5 }}>
              Angajat la
            </Text>
            <Text style={styles.owner}>Fresh Salon</Text>
          </Stack>
        </ListItem>
      </Protected>
    </Stack>
  );
};

export default memo(AboutInfo);

const styles = StyleSheet.create({
  section: { marginVertical: 15, marginHorizontal: 15 },
  heading: {
    color: black,
    fontWeight: "600",
  },
  text: {
    marginTop: 10,
    color: grey0,
  },
  owner: {
    marginLeft: 5,
    fontWeight: "600",
    color: primary,
    fontSize: 15,
  },
});
