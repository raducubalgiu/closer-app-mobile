import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import {
  Heading,
  SearchBarInput,
  Header,
  Button,
  AvatarDelete,
} from "../../components/core";
import { useTranslation } from "react-i18next";
import { useGetPaginate, usePaginateActions } from "../../hooks";
import { User } from "../../ts";
import { UserSelectableListItem } from "../../components/customized";
import { useNavigation } from "@react-navigation/native";
import { isEmpty, some } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { showToast } from "../../utils";
import * as Animatable from "react-native-animatable";

type IProps = NativeStackScreenProps<RootStackParams, "TagUsers">;

export const TagUsersScreen = ({ route }: IProps) => {
  const [selectedUsers, setSelectedUsers] = useState(route.params.taggedUsers);
  const [search, setSearch] = useState("");
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const insets = useSafeAreaInsets();

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

  const renderSelectedUser = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <AvatarDelete
        onPress={() =>
          setSelectedUsers((selectedUsers) =>
            selectedUsers.filter((u) => u?.id !== item.id)
          )
        }
        uri={item.avatar[0]?.url}
      />
    ),
    [selectedUsers]
  );

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
        <Animatable.View
          animation="fadeInUp"
          duration={100}
          style={{
            paddingBottom: insets.bottom,
            ...styles.btn,
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={selectedUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderSelectedUser}
          />
          <Button
            title={
              !isEmpty(selectedUsers)
                ? `${t("select")} (${selectedUsers?.length})`
                : `${t("select")}`
            }
            //loading={isLoading}
            disabled={selectedUsers?.length === 0}
            onPress={navigateBack}
          />
        </Animatable.View>
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
