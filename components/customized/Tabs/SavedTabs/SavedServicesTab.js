import { StyleSheet, Text, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useHttpGet } from "../../../../hooks";

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

  return (
    <>
      {!loading && services.length === 0 && noFoundProducts}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({});
