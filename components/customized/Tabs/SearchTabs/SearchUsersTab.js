import { FlatList } from "react-native";
import { useCallback } from "react";
import { useAuth } from "../../../../hooks";
import { useTranslation } from "react-i18next";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { Spinner } from "../../../core";
import { UserListItem } from "../../ListItems/UserListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

export const SearchUsersTab = ({ search }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const fetchData = async (page, search) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/users/search?search=${search}&page=${page}&limit=10`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isPreviousData,
    isFetching,
  } = useInfiniteQuery(
    ["searchUsers", search],
    ({ pageParam = 1 }) => fetchData(pageParam, search),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
      },
      enabled: !isPreviousData && isFocused,
    }
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

  const renderUsers = useCallback(({ item }) => {
    return <UserListItem user={item} isFollow={false} />;
  }, []);

  const noFoundMessage = !isLoading &&
    !isFetchingNextPage &&
    pages[0]?.results?.length === 0 && (
      <NoFoundMessage title="Users" description={t("noFoundUsers")} />
    );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlatList
        ListHeaderComponent={noFoundMessage}
        data={pages?.map((page) => page.results).flat()}
        keyExtractor={useCallback((item) => item?._id)}
        renderItem={renderUsers}
        contentContainerStyle={{ padding: 15 }}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
