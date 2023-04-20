import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ListRenderItemInfo,
  Keyboard,
  View,
  Text,
} from "react-native";
import { useState, useCallback } from "react";
import { Heading, SearchBarInput, Stack } from "../../../components/core";
import { UserListItemSimple } from "../../../components/customized";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
} from "../../../hooks";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { User } from "../../../ts";

export const MessagesSearchScreen = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation("common");

  const options = useGetPaginate({
    model: "users",
    uri: `/users/suggested`,
    limit: "10",
  });

  const { refetch, isInitialLoading } = options;
  const { data: users, showSpinner, loadMore } = usePaginateActions(options);
  useRefreshOnFocus(refetch);

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSimple
        title={item?.name}
        description={item.username}
        checkmark={item?.checkmark}
        avatar={item?.avatar}
        sx={{ marginBottom: 15 }}
      />
    ),
    []
  );

  const renderGroup = useCallback(
    () => (
      <View>
        <Text>Group</Text>
      </View>
    ),
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const header = (
    <>
      <FlatList
        ListHeaderComponent={<Heading title="Grupurile mele" />}
        data={[]}
        renderItem={renderGroup}
        keyExtractor={(item, index) => index.toString()}
      />
      <Heading title="Sugestii" />
    </>
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Stack direction="row" sx={{ marginHorizontal: 15 }}>
          <SearchBarInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Cauta"
            autoFocus={true}
            showCancel={true}
            cancelButtonTitle={t("cancel")}
            onCancel={() => navigation.goBack()}
          />
        </Stack>
      </SafeAreaView>
      <FlatList
        ListHeaderComponent={header}
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        onEndReached={loadMore}
        ListFooterComponent={showSpinner}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        onMomentumScrollBegin={() => Keyboard.dismiss()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
