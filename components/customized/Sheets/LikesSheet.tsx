import { View, Text } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useGetPaginate } from "../../../hooks";
import UserListItem from "../ListItems/UserListItem";
import { User } from "../../../models/user";
import { Spinner, Stack } from "../../core";
import { NoFoundMessage } from "../NotFoundContent/NoFoundMessage";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider } from "@rneui/themed";

type IProps = { postId: string };

export const LikesSheet = ({ postId }: IProps) => {
  const { t } = useTranslation();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useGetPaginate({
    model: "likes",
    uri: `/posts/${postId}/get-likes`,
    limit: "25",
  });

  const renderPerson = useCallback(
    ({ item }: any) => <UserListItem user={item.userId} />,
    []
  );

  const keyExtractor = useCallback((item: User) => item?.id, []);

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

  return (
    <View style={{ flex: 1 }}>
      {isLoading && isFetching && !isFetchingNextPage && <Spinner />}
      <Stack sx={{ paddingVertical: 10 }}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{t("likes")}</Text>
      </Stack>
      <Divider />
      <BottomSheetFlatList
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingVertical: 15 }}
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderPerson}
        ListFooterComponent={showSpinner}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};
