import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { ListItem, Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

export const PostOptionsSheet = () => {
  const { t } = useTranslation();

  return (
    <Stack sx={{ padding: 17.5 }}>
      <ListItem onPress={() => {}} align="center" sx={styles.listItem}>
        <Stack sx={styles.iconContainer}>
          <Icon name="camera" type="feather" color={black} size={22.5} />
        </Stack>
        <Text style={styles.text}>{t("newPhoto")}</Text>
      </ListItem>
      <ListItem onPress={() => {}} align="center">
        <Stack sx={styles.iconContainer}>
          <Icon name="video" type="feather" color={black} size={22.5} />
        </Stack>
        <Text style={styles.text}>{t("newVideo")}</Text>
      </ListItem>
    </Stack>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 10,
  },
  listItem: {
    paddingLeft: 0,
    backgroundColor: "white",
    marginBottom: 5,
  },
  iconContainer: { backgroundColor: "#f1f1f1", padding: 10, borderRadius: 50 },
  text: {
    color: black,
    paddingVertical: 2.5,
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 14,
  },
});
