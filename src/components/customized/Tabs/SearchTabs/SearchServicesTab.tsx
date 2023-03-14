import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../../../src/hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Service } from "../../../../models/service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const SearchServicesTab = ({ search }: { search: string }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "searchServices",
    uri: `/services/search`,
    queries: `search=${search}`,
    limit: "25",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: services, loadMore, showSpinner } = usePaginateActions(options);

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

  if (!isLoading && !isFetchingNextPage && services?.length === 0) {
    return (
      <NoFoundMessage title="Services" description={t("noFoundServices")} />
    );
  }

  return (
    <>
      {isLoading && !isFetchingNextPage && <Spinner />}
      <FlatList
        data={services}
        keyExtractor={keyExtractor}
        renderItem={renderService}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
