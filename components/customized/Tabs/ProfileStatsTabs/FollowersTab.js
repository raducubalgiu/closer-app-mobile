import { FlatList, RefreshControl } from "react-native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { UserListItem } from "../../ListItems/UserListItem";
import { useGetPaginate } from "../../../../hooks";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const FollowersTab = ({ userId }) => {
  const [refreshing, setRefreshing] = useState(false);
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
    model: "followers",
    uri: `/users/${userId}/followers`,
    limit: "20",
  });

  const renderPerson = useCallback(
    ({ item }) => <UserListItem user={item.user} isFollow={item.isFollow} />,
    []
  );

  const keyExtractor = useCallback((item) => item?.user._id, []);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      refetch();
      setRefreshing(false);
    });
  }, []);

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage
        title={t("followers")}
        description={t("noFoundFollowers")}
      />
    );

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlatList
        ListHeaderComponent={noFoundMessage}
        refreshControl={refreshControl}
        contentContainerStyle={{ padding: 15 }}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
