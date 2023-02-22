import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { Divider, Icon } from "@rneui/themed";
import { useCallback } from "react";
import { StyleSheet, ListRenderItemInfo, Text } from "react-native";
import { useGetPaginate, usePaginateActions } from "../../../hooks";
import { Spinner, Stack } from "../../core";
import theme from "../../../assets/styles/theme";
import { UserListItemSimple } from "../ListItems/UserListItemSimple";

type IProps = { storyId: string; viewsCount: number; likesCount: number };
const { black, grey0, error } = theme.lightColors || {};

export const StoryViewsSheet = ({
  storyId,
  viewsCount,
  likesCount,
}: IProps) => {
  const isFocused = useIsFocused();

  const options = useGetPaginate({
    model: "userStories",
    uri: `/stories/${storyId}/views`,
    limit: "20",
    enabled: isFocused,
  });

  const { isLoading, isFetchingNextPage } = options;
  const loading = isLoading && !isFetchingNextPage;
  const { data: users, loadMore, showSpinner } = usePaginateActions(options);

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <UserListItemSimple
        checkmark={item?.userId?.checkmark}
        name={item?.userId?.name}
        avatar={item?.userId?.avatar}
        profession={item?.userId?.username}
        sx={{ marginBottom: 15 }}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <>
      <Stack direction="row" justify="start" sx={{ margin: 15 }}>
        <Stack justify="start" direction="row">
          <Icon name="eyeo" type="antdesign" color="#bbb" />
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "700",
              fontSize: 14,
              color: black,
            }}
          >
            {viewsCount}
          </Text>
        </Stack>
        <Stack justify="start" direction="row" sx={{ marginLeft: 10 }}>
          <Icon name="heart" type="feather" size={18} color="#bbb" />
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "700",
              fontSize: 14,
              color: black,
            }}
          >
            {likesCount}
          </Text>
        </Stack>
      </Stack>
      <Divider color="#ddd" />
      {!loading && (
        <BottomSheetFlatList
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                marginBottom: 15,
                color: black,
              }}
            >
              Spectatori
            </Text>
          }
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderUser}
          onEndReached={loadMore}
          ListFooterComponent={showSpinner}
          contentContainerStyle={{ margin: 15 }}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

const styles = StyleSheet.create({});
