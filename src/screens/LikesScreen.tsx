import { SafeAreaView, StyleSheet, RefreshControl, View } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spinner } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import UserListItem from "../components/customized/ListItems/UserListItem";
import {
  useAuth,
  usePaginateActions,
  useRefreshByUser,
  useGetPaginate,
} from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { User } from "../models/user";

type IProps = NativeStackScreenProps<RootStackParams, "Likes">;
type UserListItem = { id: string; user: User; isFollow: boolean };

export const LikesScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { postId } = route.params;
  const { t } = useTranslation();

  const options = useGetPaginate({
    model: "likes",
    uri: `/users/${user?.id}/posts/${postId}/get-likes`,
    limit: "25",
  });

  const { isLoading, isFetchingNextPage, refetch } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: users, loadMore, showSpinner } = usePaginateActions(options);

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

  let header;
  if (!isLoading && !isFetchingNextPage && users?.length === 0) {
    header = (
      <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("likes")} />
      </SafeAreaView>
      {!loading && (
        <FlashList
          refreshControl={refreshControl}
          ListHeaderComponent={header}
          contentContainerStyle={{ paddingVertical: 15 }}
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderPerson}
          ListFooterComponent={showSpinner}
          estimatedItemSize={75}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
        />
      )}
      {loading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
