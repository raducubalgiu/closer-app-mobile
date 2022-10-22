import { StyleSheet, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useHttpGet } from "../../../../hooks";
import { ServiceListItem } from "../../ListItems/ServiceListItem";

export const SavedServicesTab = ({ user }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { data: services, loading } = useHttpGet(
    `/users/${user?._id}/services/bookmarks`
  );

  const noFoundProducts = (
    <NoFoundMessage
      title={t("services")}
      description={t("noFoundSavedServices")}
    />
  );

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

  return (
    <>
      {!loading && services.length > 0 && (
        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={renderService}
          contentContainerStyle={{ padding: 15 }}
        />
      )}
      {!loading && services.length === 0 && noFoundProducts}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({});
