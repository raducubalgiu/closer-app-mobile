import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NoFoundMessage/NoFoundMessage";
import UserListItem from "../../ListItems/UserListItem";
import {
  useGetPaginate,
  useRefreshByUser,
  usePaginateActions,
} from "../../../../hooks";
import { User } from "../../../../models/user";
import { Spinner } from "../../../core";

type IProps = { userId: string };
type UseListItem = { id: string; user: User; isFollow: boolean };

export const FollowingsTab = ({ userId }: IProps) => {
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const options = useGetPaginate({
    model: "followings",
    uri: `/users/${userId}/followings`,
    limit: "20",
    enabled: isFocused,
  });

  const { refetch, isLoading, isFetchingNextPage } = options;

  const {
    data: followings,
    loadMore,
    showSpinner,
  } = usePaginateActions(options);

  const renderPerson = useCallback(
    ({ item }: ListRenderItemInfo<UseListItem>) => (
      <UserListItem user={item.user} isFollow={item.isFollow} />
    ),
    []
  );
  const keyExtractor = useCallback((item: UseListItem) => item?.id, []);

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

  return (
    <>
      {!loading && (
        <FlashList
          refreshControl={refreshControl}
          contentContainerStyle={{ paddingVertical: 15 }}
          data={followings}
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
