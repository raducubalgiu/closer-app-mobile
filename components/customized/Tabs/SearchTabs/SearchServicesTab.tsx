import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Service } from "../../../../models/service";

export const SearchServicesTab = ({ search }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const fetchData = async (page, search) => {
    const { data } = await axios.get(
      `${process.env.BASE_ENDPOINT}/services/search?search=${search}&page=${page}&limit=10`,
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
    ["searchServices", search],
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
  const services = pages?.map((page) => page.results).flat();

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
  const keyExtractor = useCallback((item: Service) => item._id, []);

  const noFoundMessage = (
    <NoFoundMessage title="Services" description={t("noFoundServices")} />
  );

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={
          !isLoading &&
          !isFetchingNextPage &&
          pages[0]?.results?.length === 0 &&
          noFoundMessage
        }
        data={services}
        keyExtractor={keyExtractor}
        renderItem={renderService}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={65}
      />
    </>
  );
};
