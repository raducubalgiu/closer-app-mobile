import { View, Text, StyleSheet } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../hooks";
import UserListItem from "../ListItems/UserListItem";
import { User } from "../../../models/user";
import { Heading, Spinner, Stack } from "../../core";
import { NoFoundMessage } from "../NotFoundContent/NoFoundMessage";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider, Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};

type StatsItem = { icon: string; counter: number };
const StatsItem = ({ icon, counter }: StatsItem) => {
  return (
    <Stack>
      <Icon name={icon} type="feather" color={"#ccc"} size={22.5} />
      <Text style={styles.counter}>{counter}</Text>
    </Stack>
  );
};

type IProps = {
  postId: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
};

export const LikesSheet = ({
  postId,
  likesCount,
  commentsCount,
  bookmarksCount,
}: IProps) => {
  const { t } = useTranslation();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "likes",
    uri: `/posts/${postId}/get-likes`,
    limit: "25",
  });

  const renderPerson = useCallback(
    ({ item }: any) => <UserListItem user={item.userId} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item?.id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const users = pages?.map((page) => page.results).flat();

  const header = (
    <Heading title={t("likes")} sx={{ marginLeft: 15, marginBottom: 20 }} />
  );

  if (!isLoading && !isFetchingNextPage && users?.length === 0) {
    return (
      <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <Stack direction="row" justify="around" sx={{ padding: 15 }}>
        <StatsItem icon="play" counter={16.5} />
        <StatsItem icon="heart" counter={likesCount} />
        <StatsItem icon="message-circle" counter={commentsCount} />
        <StatsItem icon="bookmark" counter={bookmarksCount} />
      </Stack>
      <Divider />
      <BottomSheetFlatList
        ListHeaderComponent={header}
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

const styles = StyleSheet.create({
  counter: {
    marginTop: 10,
    fontWeight: "600",
    color: black,
    fontSize: 13.5,
  },
});
