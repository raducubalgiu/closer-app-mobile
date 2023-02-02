import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useGetPaginate } from "../../../../hooks";
import { Service } from "../../../../models/service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";

export const SavedServicesTab = ({ user }: { user: User }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "services",
    uri: `/users/${user?.id}/services/bookmarks`,
    limit: "25",
    enabled: isFocused,
  });

  const renderService = useCallback(({ item }: ListRenderItemInfo<any>) => {
    const { id, name, postsCount } = item.serviceId;

    return (
      <ServiceListItem
        name={name}
        postsCount={postsCount}
        onPress={() =>
          navigation.navigate("Service", { service: { id, name, postsCount } })
        }
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Service) => item?.id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner sx={{ paddingVertical: 20 }} />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const services = pages?.map((page) => page.results).flat();

  let header;
  if (!isLoading && !isFetchingNextPage && services?.length === 0) {
    header = (
      <NoFoundMessage
        title={t("services")}
        description={t("noFoundSavedServices")}
      />
    );
  }

  return (
    <>
      {isFetching && isLoading && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={services}
        keyExtractor={keyExtractor}
        renderItem={renderService}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        estimatedItemSize={65}
      />
    </>
  );
};
