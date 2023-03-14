import { View, Text, StyleSheet } from "react-native";
import { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider, Icon } from "@rneui/themed";
import { useGetPaginate, usePaginateActions } from "../../../hooks";
import UserListItem from "../ListItems/UserListItem";
import { User } from "../../../models/user";
import { Heading, Spinner, Stack } from "../../core";
import { NoFoundMessage } from "../NoFoundMessage/NoFoundMessage";
import theme from "../../../../assets/styles/theme";
import { displayDash } from "../../../utils";

const { black } = theme.lightColors || {};
type IProps = {
  postId: string;
  counter: {
    likesCount: number;
    commentsCount: number;
    bookmarksCount: number;
    viewsCount: number;
  };
};

type StatsItem = { icon: string; counter: number | string };
const StatsItem = ({ icon, counter }: StatsItem) => {
  return (
    <Stack>
      <Icon name={icon} type="feather" color={"#ccc"} size={22.5} />
      <Text style={styles.counter}>{counter}</Text>
    </Stack>
  );
};

const LikesSheet = ({ postId, counter }: IProps) => {
  const { t } = useTranslation("common");
  const { likesCount, commentsCount, bookmarksCount, viewsCount } = counter;

  const options = useGetPaginate({
    model: "likes",
    uri: `/posts/${postId}/get-likes`,
    limit: "25",
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: users, loadMore, showSpinner } = usePaginateActions(options);

  const renderPerson = useCallback(
    ({ item }: any) => <UserListItem user={item.userId} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item?.id, []);

  if (!isLoading && !isFetchingNextPage && users?.length === 0) {
    return (
      <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack direction="row" justify="around" sx={{ padding: 15 }}>
        <StatsItem icon="play" counter={displayDash(viewsCount)} />
        <StatsItem icon="heart" counter={displayDash(likesCount)} />
        <StatsItem icon="message-circle" counter={displayDash(commentsCount)} />
        <StatsItem icon="bookmark" counter={displayDash(bookmarksCount)} />
      </Stack>
      <Divider />
      {loading && <Spinner />}
      <BottomSheetFlatList
        ListHeaderComponent={<Heading title={t("likes")} sx={styles.header} />}
        contentContainerStyle={{ paddingVertical: 5 }}
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default memo(LikesSheet);

const styles = StyleSheet.create({
  counter: {
    marginTop: 10,
    fontWeight: "600",
    color: black,
    fontSize: 13.5,
  },
  header: { marginLeft: 15, marginBottom: 20 },
});
