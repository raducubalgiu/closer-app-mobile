import { FlatList } from "react-native";
import React, { useCallback } from "react";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const SearchServicesTab = ({ search }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useAuth();

  const fetchData = async (page, search) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/services/search?search=${search}&page=${page}&limit=10`,
      { headers: { Authorization: `Bearer ${user?.token}` } }
    );
    return data;
  };

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["searchServices", search],
      ({ pageParam = 1 }) => fetchData(pageParam, search),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage.next !== null) {
            return lastPage.next;
          }
        },
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

  const renderService = useCallback(
    ({ item }) => (
      <ServiceListItem
        name={item.name}
        postsCount={item.postsCount}
        onPress={() => navigation.navigate("Service", { service: item })}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);

  const noFoundMessage = (
    <NoFoundMessage title="Services" description={t("noFoundServices")} />
  );

  return (
    <FlatList
      ListHeaderComponent={
        !isLoading &&
        !isFetchingNextPage &&
        pages[0]?.results?.length === 0 &&
        noFoundMessage
      }
      data={pages?.map((page) => page.results).flat()}
      keyExtractor={keyExtractor}
      renderItem={renderService}
      contentContainerStyle={{ padding: 15 }}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};
