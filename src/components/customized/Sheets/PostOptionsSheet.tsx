import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { SettingsListItem } from "../ListItems/SettingsListItem";

const { black } = theme.lightColors || {};

type IProps = {
  onNavigateToAddImage: () => void;
  onNavigateToAddVideo: () => void;
};

export const PostOptionsSheet = ({
  onNavigateToAddImage,
  onNavigateToAddVideo,
}: IProps) => {
  const { t } = useTranslation("common");

  return (
    <Stack sx={styles.container}>
      <SettingsListItem
        title={t("newPhoto")}
        iconLeftProps={{ name: "camera", size: 22.5 }}
        onPress={onNavigateToAddImage}
        rightIcon={false}
      />
      <SettingsListItem
        title={t("newVideo")}
        iconLeftProps={{ name: "video", size: 22.5 }}
        onPress={onNavigateToAddVideo}
        rightIcon={false}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 15, marginTop: 7.5 },
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
