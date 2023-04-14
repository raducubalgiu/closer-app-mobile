import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import UserListItem from "../../ListItems/User/UserListItem";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../../../hooks";
import { User } from "../../../../ts";
import { Spinner } from "../../../core";

type IProps = { userId: string };
type UserListItem = { id: string; user: User; isFollow: boolean };

export const FollowersTab = ({ userId }: IProps) => {
  const { t } = useTranslation("common");
  const isFocused = useIsFocused();
  const options = useGetPaginate({
    model: "followers",
    uri: `/users/${userId}/followers`,
    limit: "20",
    enabled: isFocused,
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

  return (
    <>
      {!loading && (
        <FlashList
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingVertical: 15 }}
          data={followers}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          ListFooterComponent={showSpinner}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          estimatedItemSize={75}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};
