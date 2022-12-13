import { StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { Stack } from "../../core";
import { BookmarkButton } from "../Buttons/BookmarkButton";
import theme from "../../../assets/styles/theme";
import { displayCount } from "../../../utils";
import { useAuth, useGet } from "../../../hooks";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  bookmarkId: string;
  postsCount: number;
  bookmarksCount: number;
};

export const CardHashtagOverview = ({
  bookmarkId,
  postsCount,
  bookmarksCount,
}: IProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data } = useGet({
    model: "hCheck",
    uri: `/users/${user?.id}/hashtags/${bookmarkId}/bookmarks`,
  });

  return (
    <Stack direction="row" align="start" justify="start" sx={styles.container}>
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
                bookmarksCount,
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
          status={data?.status}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, marginBottom: 10 },
  hashtagCont: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2.5,
  },
  hashtagImg: { fontSize: 60, color: black, fontWeight: "300" },
  counter: {
    color: grey0,
    fontSize: 14.5,
    marginLeft: 5,
    textTransform: "lowercase",
  },
});
