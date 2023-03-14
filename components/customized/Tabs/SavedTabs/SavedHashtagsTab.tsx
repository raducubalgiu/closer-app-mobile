import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import { useGetPaginate, usePaginateActions } from "../../../../src/hooks";
import { Spinner } from "../../../core";
import { HashtagListItem } from "../../ListItems/HashtagListItem";
import { Hashtag } from "../../../../models/hashtag";
import { User } from "../../../../models/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

type ListRenderItemHashtag = {
  id: string;
  name: string;
  postsCount: string;
  hashtagId: Hashtag;
};

export const SavedHashtagsTab = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "hashtags",
    uri: `/users/${user?.id}/hashtags/bookmarks`,
    limit: "25",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: hashtags, showSpinner, loadMore } = usePaginateActions(options);

  const renderHashtags = useCallback(
    ({ item }: ListRenderItemInfo<ListRenderItemHashtag>) => {
      const { name, postsCount } = item?.hashtagId;

      return (
        <HashtagListItem
          name={name}
          postsCount={postsCount}
          onPress={() => navigation.navigate("Hashtag", { name })}
        />
      );
    },
    []
  );

  const keyExtractor = useCallback(
    (item: ListRenderItemHashtag) => item?.id,
    []
  );

  if (!isLoading && !isFetchingNextPage && hashtags?.length === 0) {
    return (
      <NoFoundMessage
        title={t("hashtags")}
        description={t("noFoundSavedHashtags")}
      />
    );
  }

  return (
    <>
      {!loading && (
        <FlatList
          contentContainerStyle={{ paddingVertical: 15 }}
          data={hashtags}
          keyExtractor={keyExtractor}
          renderItem={renderHashtags}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
