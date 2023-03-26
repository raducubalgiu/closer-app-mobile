import { StyleSheet, Animated, Pressable } from "react-native";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import * as Haptics from "expo-haptics";
import { usePost, useDelete, useAuth } from "../../../hooks";
import { showToast } from "../../../utils";
import { useTranslation } from "react-i18next";

const { black } = theme.lightColors || {};
type IProps = {
  sx?: {};
  size?: number;
  type: string;
  typeId: string;
  isBookmarked: boolean;
};

const BookmarkIconButton = ({
  sx = {},
  size = 24,
  type,
  typeId,
  isBookmarked,
}: IProps) => {
  const { user } = useAuth();
  const lastItemId = useRef(typeId);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  if (typeId !== lastItemId.current) {
    lastItemId.current = typeId;
    setBookmarked(isBookmarked);
  }

  const animatedScale = useRef(new Animated.Value(0)).current;
  const bookmarkEndpoints = `/users/${user?.id}/${type}/${typeId}/bookmarks`;
  const { t } = useTranslation("common");

  const { mutate: makePost } = usePost({
    uri: bookmarkEndpoints,
    onSuccess: () => {
      showToast({ message: t("youAddedToBookmarks") });
    },
  });
  const { mutate: makeDelete } = useDelete({
    uri: bookmarkEndpoints,
    onSuccess: () => {
      showToast({ message: t("youRemovedFromBookmarks") });
    },
  });

  const handleBookmark = useCallback(() => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 15,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (!bookmarked) {
      setBookmarked(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      makePost({});
    } else {
      setBookmarked(false);
      makeDelete();
    }
  }, [bookmarked, bookmarkEndpoints]);

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  return (
    <Pressable onPress={handleBookmark}>
      <Animated.View
        style={[
          { ...styles.default, ...sx },
          { transform: [{ scale: animatedScale }] },
        ]}
      >
        <Icon
          type="feather"
          name={bookmarked ? "check-square" : "bookmark"}
          size={size}
          color={bookmarked ? "#333333" : black}
        />
      </Animated.View>
    </Pressable>
  );
};

export default memo(BookmarkIconButton);

const styles = StyleSheet.create({
  default: {
    marginLeft: 20,
    padding: 5,
  },
});
