import { SafeAreaView, StyleSheet, RefreshControl } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Header, Spinner } from "../components/core";
import { NoFoundMessage } from "../components/customized";
import UserListItem from "../components/customized/ListItems/UserListItem";
import { useAuth, useRefreshByUser } from "../hooks";
import { useGetPaginate } from "../hooks";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { User } from "../models/user";

type IProps = NativeStackScreenProps<RootStackParams, "Likes">;

export const LikesScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { postId } = route.params;
  const { t } = useTranslation();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaginate({
    model: "likes",
    uri: `/users/${user._id}/posts/${postId}/get-likes`,
    limit: "25",
  });

  const renderPerson = useCallback(
    ({ item }: ListRenderItemInfo<any>) => <UserListItem user={item.user} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item?._id, []);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const showSpinner = () => {
    if (isFetchingNextPage) {
      return <Spinner />;
    } else {
      return null;
    }
  };

  const { pages } = data || {};
  const users = pages?.map((page) => page.results).flat();

  let header;
  if (!isLoading && !isFetchingNextPage && users?.length === 0) {
    header = (
      <NoFoundMessage title={t("likes")} description={t("noFoundLikes")} />
    );
  }

  const { refreshing, refetchByUser } = useRefreshByUser(refetch);
  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refetchByUser} />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={t("likes")} divider={true} />
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <FlashList
        ListHeaderComponent={header}
        refreshControl={refreshControl}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
        ListFooterComponent={showSpinner}
        estimatedItemSize={75}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
