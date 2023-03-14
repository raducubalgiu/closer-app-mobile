import { StyleSheet, Text } from "react-native";
import { memo } from "react";
import { Stack } from "../../../../../core";
import { trimFunc } from "../../../../../../utils";
import { useTranslation } from "react-i18next";
import theme from "../../../../../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};
type IProps = { description: string };

const AboutDescription = ({ description }: IProps) => {
  const { t } = useTranslation("common");

  return (
    <Stack align="start" sx={styles.section}>
      <Text style={styles.heading}>{t("biography")}</Text>
      <Text style={styles.text}>
        {description ? trimFunc(description, 115) : t("notAdded")}
      </Text>
    </Stack>
  );
};

export default memo(AboutDescription);

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
});
