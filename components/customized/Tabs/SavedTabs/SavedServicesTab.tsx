import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { Service } from "../../../../models/service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { User } from "../../../../models/user";

export const SavedServicesTab = ({ user }: { user: User }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "services",
    uri: `/users/${user?.id}/services/bookmarks`,
    limit: "25",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: services, showSpinner, loadMore } = usePaginateActions(options);

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

  if (!isLoading && !isFetchingNextPage && services?.length === 0) {
    return (
      <NoFoundMessage
        title={t("services")}
        description={t("noFoundSavedServices")}
      />
    );
  }

  return (
    <>
      {!loading && (
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          data={services}
          keyExtractor={keyExtractor}
          renderItem={renderService}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
