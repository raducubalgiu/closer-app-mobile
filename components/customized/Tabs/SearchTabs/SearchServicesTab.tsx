import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback } from "react";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Service } from "../../../../models/service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const SearchServicesTab = ({ search }: { search: string }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const fetchData = async (page: number, search: string) => {
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
      enabled: isFocused,
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
    ({ item }: ListRenderItemInfo<Service>) => (
      <ServiceListItem
        name={item.name}
        postsCount={item.postsCount}
        onPress={() => navigation.navigate("Service", { service: item })}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item: Service) => item.id, []);

  let header;
  if (!isLoading && !isFetchingNextPage && services?.length === 0) {
    header = (
      <NoFoundMessage title="Services" description={t("noFoundServices")} />
    );
  }

  return (
    <>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
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
