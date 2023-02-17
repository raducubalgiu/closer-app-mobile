import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, FlatList, ListRenderItemInfo } from "react-native";
import { useRef, useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Badge, Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { Stack, IconButton } from "../../../core";
import { FeedLabelButton } from "../../Buttons/FeedLabelButton";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type IProps = { indexLabel: number };
type Label = {
  id: string;
  title: string;
  isActive: boolean;
};

export const HeaderFeed = ({ indexLabel }: IProps) => {
  const ref = useRef<FlatList>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const LABELS = [
    { id: "1", title: t("explore"), isActive: true },
    { id: "2", title: t("book"), isActive: false },
    { id: "3", title: t("lastMinute"), isActive: false },
  ];

  const getItemLayout = useCallback((_: any, index: number) => {
    return { length: 107.5, offset: 107.5 * index, index };
  }, []);

  const renderLabel = useCallback(
    ({ item, index }: ListRenderItemInfo<Label>) => {
      return (
        <FeedLabelButton
          onPress={() => {
            if (index === indexLabel) {
              return;
            }
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            if (index === 0) {
              navigation.replace("FeedExplore");
            } else if (index === 1) {
              navigation.replace("FeedBookables");
            } else if (index === 2) {
              navigation.replace("FeedLastMinute");
            }
          }}
          isActive={index == indexLabel}
          text={item.title}
        />
      );
    },
    [indexLabel]
  );

  const goToSearch = () => navigation.navigate("SearchPosts", { search: "" });
  const goToNotifications = () => navigation.navigate("Notifications");

  return (
    <View>
      <Stack direction="row" sx={styles.list}>
        <IconButton
          name="search"
          sx={{ marginLeft: 15 }}
          onPress={goToSearch}
        />
        <View style={{ marginLeft: 15 }}>
          <IconButton name="bell" onPress={goToNotifications} />
          <Badge
            badgeStyle={{ backgroundColor: "#F72A50" }}
            containerStyle={styles.badgeContainer}
          />
        </View>
        <Divider orientation="vertical" style={{ marginLeft: 15 }} />
        <FlatList
          data={LABELS}
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={indexLabel}
          getItemLayout={getItemLayout}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 165 }}
          renderItem={renderLabel}
        />
      </Stack>
      <Divider color="#ddd" />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginVertical: 7.5,
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
  },
});
