import { StyleSheet, Text, View, Animated } from "react-native";
import { useState, useRef, useEffect, memo } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { ListItem, Spinner } from "../../core";
import { useGet, usePost, useDelete } from "../../../hooks";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";

const { black } = theme.lightColors || {};
type IProps = { postId: string; userId: string | undefined };

const MoreSheet = ({ postId, userId }: IProps) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [bookmarked, setBookmarked] = useState(false);
  const animatedScale = useRef(new Animated.Value(0)).current;
  const endoints = `/users/${userId}/posts/${postId}/bookmarks`;

  const { isLoading } = useGet({
    model: "checkBookmark",
    uri: endoints,
    enabled: isFocused,
    onSuccess: (res) => setBookmarked(res.data.status),
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
                size={22.5}
              />
            </Animated.View>
            <Text style={styles.text}>
              {bookmarked ? t("addedToBookmarks") : t("addToBookmarks")}
            </Text>
          </ListItem>
          <ListItem onPress={() => {}} sx={styles.listItem}>
            <Icon name="link" type="feather" color={black} size={22.5} />
            <Text style={styles.text}>{t("getLink")}</Text>
          </ListItem>
          <ListItem onPress={handleDownload} sx={styles.listItem}>
            <Icon name="download" type="feather" color={black} size={22.5} />
            <Text style={styles.text}>{t("downloadPost")}</Text>
          </ListItem>
          <ListItem onPress={() => {}} sx={styles.listItem}>
            <Icon
              name="alert-triangle"
              type="feather"
              color={black}
              size={22.5}
            />
            <Text style={styles.text}>{t("report")}</Text>
          </ListItem>
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
