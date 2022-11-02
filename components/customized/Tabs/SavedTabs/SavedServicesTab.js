import { StyleSheet, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useHttpGet } from "../../../../hooks";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useGetPaginate } from "../../../../hooks";

export const SavedServicesTab = ({ user }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPaginate({
      model: "services",
      uri: `/users/${user?._id}/services/bookmarks`,
      limit: "25",
    });

  const renderService = useCallback(({ item }) => {
    const { _id, name, postsCount } = item.service;
    return (
      <ServiceListItem
        name={name}
        postsCount={postsCount}
        onPress={() =>
          navigation.navigate("Service", { service: { _id, name, postsCount } })
        }
      />
    );
  }, []);

  const keyExtractor = useCallback((item) => item?._id, []);

  const noFoundMessage = (
    <NoFoundMessage
      title={t("services")}
      description={t("noFoundSavedServices")}
    />
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
      renderItem={renderService}
      ListFooterComponent={showSpinner}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
    />
  );
};
