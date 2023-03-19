import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SettingsListItem } from "../ListItems/SettingsListItem";

type IProps = {
  onHandleBlock: () => void;
  onReport: () => void;
  isBlocked: boolean;
};

const ProfileSettingsSheet = ({
  onHandleBlock,
  onReport,
  isBlocked,
}: IProps) => {
  const { t } = useTranslation("common");

  return (
    <View style={styles.container}>
      <SettingsListItem
        title={!isBlocked ? t("block") : t("unblock")}
        iconLeftProps={{ name: "block-flipped", type: "material", size: 22.5 }}
        onPress={onHandleBlock}
        rightIcon={false}
      />
      <SettingsListItem
        title={t("report")}
        iconLeftProps={{ name: "flag", type: "feather", size: 22.5 }}
        onPress={onReport}
        rightIcon={false}
      />
      <SettingsListItem
        title={t("shareProfile")}
        iconLeftProps={{ name: "share", type: "feather", size: 22.5 }}
        onPress={() => {}}
        rightIcon={false}
      />
    </View>
  );
};

export default memo(ProfileSettingsSheet);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 7.5,
  },
});
