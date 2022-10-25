import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { Spinner } from "../../../core";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { ServiceListItem } from "../../ListItems/ServiceListItem";
import { useTranslation } from "react-i18next";
import { useHttpGet } from "../../../../hooks";
import { useNavigation } from "@react-navigation/native";

export const SearchServicesTab = ({ search }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { data: services, loading } = useHttpGet(
    `/services/search?search=${search}`
  );

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
    <View style={styles.screen}>
      {!loading && (
        <FlatList
          data={services}
          keyExtractor={keyExtractor}
          renderItem={renderService}
          contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 15 }}
          ListHeaderComponent={!loading && !services?.length && noFoundMessage}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
