import {
  RefreshControl,
  FlatList,
  ListRenderItemInfo,
  View,
  Keyboard,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import UserListItem from "../../ListItems/User/UserListItem";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
  useGet,
} from "../../../../hooks";
import { User } from "../../../../ts";
import { Spinner, SearchBarInput } from "../../../core";
import { isEmpty } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = { userId: string };
type UserListItem = { id: string; user: User; isFollow: boolean };
type SearchResponse = { next: null | number; results: UserListItem[] };

export const FollowersTab = ({ userId }: IProps) => {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const options = useGetPaginate({
    model: "followers",
    uri: `/users/${userId}/followers`,
    limit: "20",
    enabled: isFocused,
  });
  const { data: searchedUsers } = useGet<SearchResponse>({
    model: "searchFollowers",
    uri: `/users/${userId}/followers/search?search=${search}`,
    options: { enabled: !!search },
  });

  const { isLoading, isFetchingNextPage, refetch } = options;

  const {
    data: followers,
    loadMore,
    showSpinner,
  } = usePaginateActions(options);

  const renderPerson = useCallback(
    ({ item }: ListRenderItemInfo<UserListItem>) => (
      <UserListItem user={item.user} isFollow={item.isFollow} />
    ),
    []
  );

  const keyExtractor = useCallback((item: UserListItem) => item?.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  const loading = isLoading && !isFetchingNextPage;

  if (!isLoading && !isFetchingNextPage && followers?.length === 0) {
    return (
      <NoFoundMessage
        title={t("followers")}
        description={t("noFoundFollowers")}
      />
    );
  }

  const header = (
    <View style={{ marginHorizontal: 15 }}>
      <SearchBarInput
        value={search}
        placeholder={t("search")}
        onChangeText={(text) => setSearch(text)}
        showCancel={false}
      />
    </View>
  );

  return (
    <>
      {!loading && (
        <FlatList
          ListHeaderComponent={header}
          refreshControl={refreshControl}
          contentContainerStyle={{ marginBottom: insets.bottom }}
          data={isEmpty(search) ? followers : searchedUsers?.results}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() => Keyboard.dismiss()}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
