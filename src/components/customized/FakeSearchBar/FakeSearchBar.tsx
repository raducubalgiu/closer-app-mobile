import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { grey0, black } = theme.lightColors || {};
type IProps = { onPress: () => void; sx?: ViewStyle };

export const FakeSearchBar = ({ onPress, sx }: IProps) => {
  const { t } = useTranslation();

  return (
    <Pressable style={[styles.container, sx]} onPress={onPress}>
      <Stack direction="row">
        <Stack direction="row">
          <Icon type="ionicon" name="ios-search" size={20} color={black} />
          <Text style={styles.text}>{t("search")}</Text>
        </Stack>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 7.5,
    paddingVertical: 9,
  },
  text: {
    marginLeft: 10,
    color: grey0,
    fontSize: 15,
  },
});
