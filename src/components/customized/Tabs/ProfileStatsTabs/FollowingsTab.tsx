import {
  RefreshControl,
  View,
  FlatList,
  ListRenderItemInfo,
  Keyboard,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import UserListItem from "../../ListItems/User/UserListItem";
import {
  useGetPaginate,
  useRefreshByUser,
  usePaginateActions,
  useAuth,
  useGet,
} from "../../../../hooks";
import { User, ViewFollowingsListEnum } from "../../../../ts";
import { SearchBarInput, Spinner } from "../../../core";
import { isEmpty } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IProps = { userId: string; settings: any };
type UserListItem = { id: string; user: User; isFollow: boolean };
type SearchResponse = { next: null | number; results: UserListItem[] };

export const FollowingsTab = ({ userId, settings }: IProps) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation("common");

  const options = useGetPaginate({
    model: "followings",
    uri: `/users/${userId}/followings`,
    limit: "20",
    enabled: isFocused,
  });

  const { data: searchedUsers } = useGet<SearchResponse>({
    model: "searchFollowings",
    uri: `/users/${userId}/followings/search?search=${search}`,
    options: { enabled: !!search },
  });

  const sameUser = userId === user?.id;

  const { refetch, isLoading, isFetchingNextPage } = options;

  const {
    data: followings,
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

  if (!isLoading && !isFetchingNextPage && followings?.length === 0) {
    return (
      <NoFoundMessage
        title={t("following")}
        description={t("noFoundFollowings")}
      />
    );
  }

  if (!sameUser && settings.viewFollowings === ViewFollowingsListEnum.ME) {
    return (
      <NoFoundMessage
        iconProps={{ name: "eye-off" }}
        title={t("restrictioned")}
        description={t("thisUserDoesNotAllowSeeFollowings")}
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
          data={isEmpty(search) ? followings : searchedUsers?.results}
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
