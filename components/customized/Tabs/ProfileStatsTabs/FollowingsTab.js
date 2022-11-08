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

export const FollowingsTab = ({ userId }) => {
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
    model: "followings",
    uri: `/users/${userId}/followings`,
    limit: "20",
  });

  const renderPerson = useCallback(
    ({ item }) => (
      <UserListItem
        avatar={item.avatar}
        username={item.username}
        checkmark={item.checkmark}
        name={item.name}
        followeeId={item._id}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item?._id, []);

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
        title={t("followings")}
        description={t("noFoundFollowings")}
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
