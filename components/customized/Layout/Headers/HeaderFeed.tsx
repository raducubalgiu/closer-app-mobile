import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import { useRef, useState, useCallback } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Badge, Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";
import { Stack, IconButton } from "../../../core";
import { FeedLabelButton } from "../../Buttons/FeedLabelButton";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";

export const HeaderFeed = ({ onFetchPosts }) => {
  const [indexLabel, setIndexLabel] = useState(0);
  const ref = useRef<FlatList>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const LABELS = [
    { _id: "1", title: t("explore"), isActive: true },
    { _id: "2", title: t("following"), isActive: false },
    { _id: "3", title: t("lastMinute"), isActive: false },
  ];

  const getItemLayout = useCallback((_, index) => {
    return { length: 107.5, offset: 107.5 * index, index };
  }, []);

  const renderLabel = useCallback(
    ({ item, index }) => {
      return (
        <FeedLabelButton
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            if (index === indexLabel && index === LABELS.length - 1) {
              setIndexLabel(0);
              ref.current.scrollToIndex({
                index: 0,
                animated: true,
                viewPosition: 0,
              });
              onFetchPosts(0);
            } else {
              setIndexLabel(index);
              ref.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0,
              });
              onFetchPosts(indexLabel + 1);
            }
          }}
          isActive={index == indexLabel}
          text={item.title}
        />
      );
    },
    [indexLabel]
  );

  const goToSearch = () => navigation.navigate("SearchPosts");
  const goToNotifications = () => navigation.navigate("Notifications");

  return (
    <Stack justify="start" align="start">
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
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingRight: 165 }}
          renderItem={renderLabel}
        />
      </Stack>
    </Stack>
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
