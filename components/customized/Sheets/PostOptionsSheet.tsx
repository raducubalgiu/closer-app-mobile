import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { ListItem, Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

export const PostOptionsSheet = () => {
  const { t } = useTranslation();

  return (
    <Stack sx={styles.container}>
      <ListItem onPress={() => {}} align="center" sx={styles.listItem}>
        <Icon name="camera" type="feather" color={black} size={22.5} />
        <Text style={styles.text}>{t("newPhoto")}</Text>
      </ListItem>
      <ListItem onPress={() => {}} align="center">
        <Icon name="video" type="feather" color={black} size={22.5} />
        <Text style={styles.text}>{t("newVideo")}</Text>
      </ListItem>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20 },
  heading: {
    fontSize: 17,
    fontWeight: "500",
  },
  listItem: {
    paddingLeft: 0,
    backgroundColor: "white",
    marginBottom: 15,
  },
  text: {
    color: black,
    paddingVertical: 2.5,
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 14,
  },
});
