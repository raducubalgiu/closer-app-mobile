import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useGetPaginate, usePaginateActions } from "../../../../hooks";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../core";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Hashtag } from "../../../../models/hashtag";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

export const SearchHashtagsTab = ({ search }: { search: string }) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const options = useGetPaginate({
    model: "searchHashtags",
    uri: `/hashtags/search`,
    queries: `search=${search}`,
    limit: "25",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const { data: hashtags, loadMore, showSpinner } = usePaginateActions(options);

  const renderHashtags = useCallback(
    ({ item }: ListRenderItemInfo<Hashtag>) => (
      <HashtagListItem
        name={item.name}
        postsCount={item.postsCount}
        onPress={() => navigation.navigate("Hashtag", { name: item.name })}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: Hashtag) => item.id, []);

  if (!isLoading && !isFetchingNextPage && hashtags?.length === 0) {
    return (
      <NoFoundMessage
        title={t("hashtags")}
        description={t("noFoundHashtags")}
      />
    );
  }

  return (
    <>
      {isLoading && !isFetchingNextPage && <Spinner />}
      <FlatList
        data={hashtags}
        keyExtractor={keyExtractor}
        renderItem={renderHashtags}
        contentContainerStyle={{ paddingVertical: 15 }}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </>
  );
};
