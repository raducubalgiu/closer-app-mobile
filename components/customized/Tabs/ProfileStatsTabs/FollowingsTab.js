import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { UserListItem } from "../../ListItems/UserListItem";
import { useGetPaginate } from "../../../../hooks";

export const FollowingsTab = ({ userId }) => {
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

  const renderPerson = useCallback(({ item }) => {
    const { avatar, username, name, _id, checkmark } = item?.followeeId || {};

    return (
      <UserListItem
        avatar={avatar}
        username={username}
        checkmark={checkmark}
        name={name}
        followeeId={_id}
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const noFoundMessage = (
    <NoFoundMessage
      title={t("followings")}
      description={t("noFoundFollowings")}
    />
  );

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

  console.log("FOLLOWING PAGES LENGTH!!!", pages?.length);

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlatList
        ListHeaderComponent={
          !isLoading &&
          !isFetchingNextPage &&
          pages[0]?.results?.length === 0 &&
          noFoundMessage
        }
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
