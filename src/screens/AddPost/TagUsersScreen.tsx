import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Heading, SearchBarInput, Header } from "../../components/core";
import { useGetPaginate, usePaginateActions } from "../../hooks";
import { User } from "../../ts";
import {
  UserSelectableListItem,
  FooterUserSelectable,
} from "../../components/customized";
import { showToast } from "../../utils";

type IProps = NativeStackScreenProps<RootStackParams, "TagUsers">;

export const TagUsersScreen = ({ route }: IProps) => {
  const [selectedUsers, setSelectedUsers] = useState(route.params.taggedUsers);
  const [search, setSearch] = useState("");
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const options = useGetPaginate({
    model: "tagUsers",
    uri: `/users/suggested`,
    limit: "20",
  });

  const { data: users, loadMore, showSpinner } = usePaginateActions(options);

  const handleSelectUser = useCallback(
    (user: User, action: string) => {
      if (action === "REMOVE") {
        setSelectedUsers((selectedUsers) =>
          selectedUsers.filter((selectedUser) => selectedUser?.id !== user.id)
        );
      } else {
        if (selectedUsers?.length === 10) {
          return showToast({
            message: t("youCanTagMaxTenPersons"),
            short: true,
          });
        }
        setSelectedUsers((selectedUsers) => selectedUsers.concat(user));
      }
    },
    [selectedUsers]
  );

  const renderUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserSelectableListItem
        user={item}
        selected={!!selectedUsers?.find((u) => u.id === item.id)}
        onSelect={handleSelectUser}
      />
    ),
    [selectedUsers]
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  const navigateBack = () => {
    navigation.navigate({
      name: "AddPost",
      params: { taggedUsers: selectedUsers },
      merge: true,
    });
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("tagPeople")} />
        <View style={styles.searchbar}>
          <SearchBarInput
            placeholder={t("search")}
            value={search}
            onChangeText={(text: string) => setSearch(text)}
            showCancel={false}
          />
        </View>
      </SafeAreaView>
      <FlatList
        ListHeaderComponent={
          <Heading title="Sugerate" sx={{ marginLeft: 15 }} />
        }
        data={users}
        keyExtractor={keyExtractor}
        renderItem={renderUser}
        onEndReached={loadMore}
        ListFooterComponent={showSpinner}
      />
      {!isEmpty(selectedUsers) && (
        <FooterUserSelectable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onPress={navigateBack}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  searchbar: { height: 50, marginHorizontal: 15 },
  btn: {
    paddingTop: 5,
    marginHorizontal: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
