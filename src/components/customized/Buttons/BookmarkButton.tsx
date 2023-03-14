import { StyleSheet, Text, Pressable, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import { useAuth, useDelete, usePost, useGet } from "../../../src/hooks";
import theme from "../../../assets/styles/theme";
import { showToast } from "../../../src/utils";

const { black } = theme.lightColors || {};
type IProps = {
  type: string;
  typeId: string;
  status?: boolean;
  sx?: {};
  onBookmarksCount?: (no: number) => void;
};

export const BookmarkButton = ({
  type,
  typeId,
  sx,
  status = false,
  onBookmarksCount,
}: IProps) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(status);
  const { t } = useTranslation();
  const animatedScale = useRef(new Animated.Value(0)).current;
  const endoints = `/users/${user?.id}/${type}/${typeId}/bookmarks`;

  useGet({
    model: "checkBookmark",
    uri: endoints,
    onSuccess: (res) => setBookmarked(res.data.status),
  });
  const { mutate: makePost } = usePost({
    uri: endoints,
    onSuccess: () => showToast({ message: t("youAddedToBookmarks") }),
  });
  const { mutate: makeDelete } = useDelete({
    uri: endoints,
    onSuccess: () => showToast({ message: t("youRemovedFromBookmarks") }),
  });

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
      onBookmarksCount && onBookmarksCount(1);
      makePost({});
    } else {
      setBookmarked(false);
      onBookmarksCount && onBookmarksCount(-1);
      makeDelete();
    }
  };

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  return (
    <Pressable style={[styles.button, sx]} onPress={handleBookmark}>
      <Stack direction="row">
        <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
          <Icon
            name={bookmarked ? "bookmark" : "bookmark-o"}
            type="font-awesome"
            color={black}
            size={17.5}
          />
        </Animated.View>
        <Text style={styles.buttonText}>
          {bookmarked ? t("addedToBookmarks") : t("addToBookmarks")}
        </Text>
      </Stack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 12.5,
    borderRadius: 2.5,
  },
  buttonText: { color: black, fontWeight: "600", marginLeft: 10 },
});
