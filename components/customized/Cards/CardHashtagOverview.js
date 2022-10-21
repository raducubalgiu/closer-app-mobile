import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";
import { Stack } from "../../core";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import theme from "../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { displayCount } from "../../../utils";

const { black, grey0 } = theme.lightColors;

export const CardHashtagOverview = ({
  bookmarkId,
  postsCount,
  bookmarksCount,
}) => {
  const [countBookmarks, setCountBookmarks] = useState(bookmarksCount);
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      align="start"
      justify="start"
      sx={{ padding: 15, marginBottom: 10 }}
    >
      <Stack sx={styles.hashtagCont}>
        <Text style={styles.hashtagImg}>#</Text>
      </Stack>
      <Stack align="start" justify="between" sx={{ marginLeft: 15, flex: 1 }}>
        <Stack align="start" justify="start" sx={{ flex: 1 }}>
          <Stack direction="row">
            <Icon name="link" type="feather" color={grey0} size={17.5} />
            <Text style={styles.counter}>
              {displayCount(postsCount, t("post"), t("posts"), t("ofPosts"))}
            </Text>
          </Stack>
          <Stack direction="row" sx={{ marginTop: 10 }}>
            <Icon name="bookmark" type="feather" color={grey0} size={17.5} />
            <Text style={styles.counter}>
              {displayCount(
                countBookmarks,
                t("user"),
                t("users"),
                t("ofUsers")
              )}
            </Text>
          </Stack>
        </Stack>
        <BookmarkButton
          type="hashtags"
          typeId={bookmarkId}
          onBookmarksCount={(action) =>
            setCountBookmarks(countBookmarks + action)
          }
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  hashtagCont: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  hashtagImg: { fontSize: 60, color: black, fontWeight: "300" },
  hashtag: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    color: black,
  },
  counter: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 5,
    textTransform: "lowercase",
  },
});
