import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import UserListItem from "../../ListItems/UserListItem";
import { useGetPaginate, useRefreshByUser } from "../../../../hooks";
import { User } from "../../../../models/user";

type Props = { userId: string };

export const FollowersTab = ({ userId }: Props): JSX.Element => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "followers",
    uri: `/users/${userId}/followers`,
    limit: "20",
    enabled: isFocused,
  });

  const renderPerson = useCallback(
    ({ item }: any) => <UserListItem user={item.user} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item?._id, []);

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };
  const { pages } = data || {};
  const posts = pages?.map((page) => page.results).flat();

  let header;
  if (!isLoading && !isFetchingNextPage && posts?.length === 0) {
    header = (
      <NoFoundMessage
        title={t("followers")}
        description={t("noFoundFollowers")}
      />
    );
  }

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={75}
      />
    </>
  );
};
