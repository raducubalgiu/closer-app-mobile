import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Header, Spinner } from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import UserListItem from "../../../../components/customized/ListItems/UserListItem";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshByUser,
} from "../../../../src/hooks";
import { User } from "../../../../models";

export const PrivacyBlockedAccounts = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const options = useGetPaginate({
    model: "blockedUsers",
    uri: `/users/${user?.id}/blocked-users`,
    limit: "20",
  });

  const { isLoading, isFetchingNextPage, refetch } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: users, showSpinner, loadMore } = usePaginateActions(options);

  const renderUser = useCallback(
    ({ item }: any) => <UserListItem user={item.blockedUserId} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  let header;
  if (!isLoading && !isFetchingNextPage && users?.length === 0) {
    header = (
      <NoFoundMessage
        title={t("blockedAccounts")}
        description={t("noFoundBlockedUsers")}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("blockedAccounts")} />
      <>
        {!loading && (
          <FlatList
            ListHeaderComponent={header}
            refreshControl={refreshControl}
            data={users}
            keyExtractor={keyExtractor}
            renderItem={renderUser}
            onEndReached={loadMore}
            ListFooterComponent={showSpinner}
            contentContainerStyle={{ marginVertical: 15 }}
          />
        )}
        {loading && <Spinner />}
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
