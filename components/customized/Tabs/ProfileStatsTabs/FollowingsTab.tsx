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

type IProps = { userId: string };

export const FollowingsTab = ({ userId }: IProps) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "followings",
    uri: `/users/${userId}/followings`,
    limit: "20",
    enabled: isFocused,
  });

  const renderPerson = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <UserListItem user={item.followeeId} />
    ),
    []
  );
  const keyExtractor = useCallback((item: User) => item?.id, []);

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
  const followings = pages?.map((page) => page.results).flat();

  let header;
  if (!isLoading && !isFetchingNextPage && followings?.length === 0) {
    header = (
      <NoFoundMessage
        title={t("followings")}
        description={t("noFoundFollowings")}
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
        data={followings}
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
