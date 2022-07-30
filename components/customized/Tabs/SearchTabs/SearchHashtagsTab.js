import { StyleSheet, FlatList, View } from "react-native";
import React, { useCallback } from "react";
import { useHttpGet } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";

export const SearchHashtagsTab = ({ search }) => {
  const { data: hashtags, loading } = useHttpGet(
    `/hashtags/search?name=${search}`
  );
  const { t } = useTranslation();

  const renderHashtags = useCallback(
    ({ item }) => <HashtagListItem name={item.name} postsCount={100} />,
    []
  );
  const keyExtractor = useCallback((item) => item._id, []);
  const noFoundMessage = (
    <NoFoundMessage title={t("hashtags")} description={t("noFoundHashtags")} />
  );

  return (
    <View style={styles.container}>
      {!loading && (
        <FlatList
          data={hashtags}
          keyExtractor={keyExtractor}
          renderItem={renderHashtags}
          ListFooterComponent={!loading && !hashtags.length && noFoundMessage}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 15, paddingHorizontal: 15 }}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
