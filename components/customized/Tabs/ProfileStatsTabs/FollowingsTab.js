import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { UserListItem } from "../../ListItems/UserListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../../hooks";

export const FollowingsTab = ({ userId }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const fetchAllFollowings = async (page, userId) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/users/${userId}/followings?page=${page}&limit=20`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["followings", userId],
      ({ pageParam = 1 }) => fetchAllFollowings(pageParam, userId),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.next !== null) {
            return lastPage.next;
          }
        },
      }
    );

  const renderPerson = useCallback(({ item }) => {
    const { avatar, username, name, _id } = item?.followeeId || {};

    return (
      <UserListItem
        avatar={avatar}
        username={username}
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

  return (
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
  );
};
