import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, SearchBarInput, Stack } from "../../../components/core";
import {
  useAuth,
  useGetPaginate,
  usePaginateActions,
  useRefreshOnFocus,
} from "../../../hooks";
import CustomAvatar from "../../../components/core/Avatars/CustomAvatar";
import { User } from "../../../ts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import UserListItemSelectable from "../../../components/customized/ListItems/User/UserListItemSelectable";

const { black, grey0, primary } = theme.lightColors || {};

export const MessageNewScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  const options = useGetPaginate({
    model: "users",
    uri: `/users/suggested`,
    limit: "20",
  });

  const { refetch } = options;

  useRefreshOnFocus(refetch);

  const { data: users, loadMore, showSpinner } = usePaginateActions(options);
  const keyExtractor = useCallback((item: User) => item.id, []);

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSelectable user={item} onSelect={() => {}} />
    ),
    []
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("newMessage")} />
      </SafeAreaView>
      <View style={styles.searchbar}>
        <SearchBarInput
          placeholder={t("search")}
          value={search}
          onChangeText={updateSearch}
          showCancel={false}
        />
      </View>
      <FlashList
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: insets.bottom }}
        onEndReached={loadMore}
        ListFooterComponent={showSpinner}
        estimatedItemSize={55}
      />
      {/* <View
        style={{
          position: "absolute",
          bottom: insets.bottom,
          marginHorizontal: 15,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 5,
        }}
      >
        <Button
          title={t("send")}
          onPress={() => {}}
          sxBtn={{ width: width - 30 }}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  searchbar: { height: 50, marginHorizontal: 15 },
});
