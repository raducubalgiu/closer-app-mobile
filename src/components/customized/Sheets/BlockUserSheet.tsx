import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../core";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { memo } from "react";

type IProps = {
  username: string;
  onBlock: () => void;
  isBlocked: boolean;
};

const BlockUserSheet = ({ username, onBlock, isBlocked }: IProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("common");

  return (
    <BottomSheetView
      style={{ ...styles.container, marginBottom: insets.bottom }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>
          {!isBlocked ? t("doYouBlock") : t("doYouUnblock")} @{username}?
        </Text>
        <Text style={{ color: "gray" }}>
          {!isBlocked ? t("blockDescription") : t("unblockDescription")}
        </Text>
      </View>
      <Button
        title={!isBlocked ? t("block") : t("unblock")}
        onPress={onBlock}
      />
    </BottomSheetView>
  );
};

export default memo(BlockUserSheet);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 25,
    justifyContent: "space-between",
    flex: 1,
  },
  title: { fontSize: 17, fontWeight: "600", marginBottom: 10 },
});
