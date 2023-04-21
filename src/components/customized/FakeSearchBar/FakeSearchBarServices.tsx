import { StyleSheet, Text, View, Pressable } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";

const { black, grey0 } = theme.lightColors || {};

type IProps = { onGoAnytime: () => void; onGoNow: () => void };

export const FakeSearchBarServices = ({ onGoAnytime, onGoNow }: IProps) => {
  const { t } = useTranslation("common");

  return (
    <View style={styles.container}>
      <Pressable onPress={onGoAnytime} style={{ flex: 1 }}>
        <Stack direction="row" justify="start">
          <Icon name="search" type="feather" color={black} size={20} />
          <Text style={styles.fakeInput}>{t("searchService")}</Text>
        </Stack>
      </Pressable>
      <Divider orientation="vertical" style={{ marginRight: 15 }} />
      <Pressable onPress={onGoNow} style={styles.nowBtn}>
        <Icon
          name="clock"
          type="feather"
          size={15}
          style={{ marginRight: 5 }}
          color={black}
        />
        <Text style={styles.nowBtnText}>{t("now")}</Text>
        <Icon name="keyboard-arrow-down" color={black} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 2.5,
  },
  fakeInput: {
    marginLeft: 7.5,
    color: grey0,
  },
  nowBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 2.5,
    paddingHorizontal: 7.5,
  },
  nowBtnText: {
    marginRight: 5,
    color: black,
    fontSize: 13.5,
    fontWeight: "600",
  },
});
