import { StyleSheet, Text, View, Animated } from "react-native";
import { useState, useRef, useEffect, memo } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { ListItem, Spinner } from "../../core";
import { useGet, usePost, useDelete } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { SettingsListItem } from "../ListItems/SettingsListItem";

const { black } = theme.lightColors || {};
type IProps = { postId: string; userId: string | undefined };

const MoreSheet = ({ postId, userId }: IProps) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;
  const endoints = `/users/${userId}/posts/${postId}/bookmarks`;

  const { isLoading } = useGet({
    model: "checkBookmark",
    uri: endoints,
    options: {
      enabled: isFocused,
      onSuccess: (res) => setBookmarked(res.data.status),
    },
  });
  const { mutate: makePost } = usePost({ uri: endoints });
  const { mutate: makeDelete } = useDelete({ uri: endoints });

  const handleBookmark = () => {
    animatedScale.setValue(0.8);

    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (!bookmarked) {
      setBookmarked(true);
      makePost({});
    } else {
      setBookmarked(false);
      makeDelete();
    }
  };

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const handleDownload = async () => {};

  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <ListItem onPress={handleBookmark} sx={styles.listItem}>
            <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
              <Icon
                name={bookmarked ? "bookmark" : "bookmark-o"}
                type="font-awesome"
                color={black}
                size={22}
                style={{ paddingHorizontal: 5 }}
              />
            </Animated.View>
            <Text style={styles.text}>
              {bookmarked ? t("addedToBookmarks") : t("addToBookmarks")}
            </Text>
          </ListItem>
          <SettingsListItem
            title={t("getLink")}
            iconLeftProps={{ name: "link" }}
            rightIcon={false}
            onPress={() => {}}
          />
          <SettingsListItem
            title={t("downloadPost")}
            iconLeftProps={{ name: "download" }}
            rightIcon={false}
            onPress={() => {}}
          />
          <SettingsListItem
            title={t("report")}
            iconLeftProps={{ name: "alert-triangle" }}
            rightIcon={false}
            onPress={() => {}}
          />
        </View>
      )}
      {isLoading && <Spinner />}
    </>
  );
};

export default memo(MoreSheet);

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  listItem: {
    backgroundColor: "white",
    paddingBottom: 10,
  },
  text: {
    color: black,
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 14,
  },
});
