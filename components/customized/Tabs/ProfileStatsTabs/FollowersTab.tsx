import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { NoFoundMessage } from "../../NotFoundContent/NoFoundMessage";
import UserListItem from "../../ListItems/UserListItem";
import {
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../../../hooks";
import { User } from "../../../../models/user";

type IProps = { userId: string };

export const FollowersTab = ({ userId }: IProps) => {
  const { t } = useTranslation();
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
  } = usePaginateActions({ ...options });

  const renderPerson = useCallback(
    ({ item }: any) => <UserListItem user={item.userId} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item?.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  if (!isLoading && !isFetchingNextPage && followers?.length === 0) {
    return (
      <NoFoundMessage
        title={t("followers")}
        description={t("noFoundFollowers")}
      />
    );
  }

  return (
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
  );
};
