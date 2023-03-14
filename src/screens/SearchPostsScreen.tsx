import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import { IconButton } from "../components/core";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import theme from "../../assets/styles/theme";
import {
  HashtagListItem,
  RecentSearchListItem,
  UserListItemSimple,
} from "../components/customized";
import {
  useAuth,
  useDelete,
  useGet,
  usePost,
  useRefreshOnFocus,
} from "../hooks";

const { grey0, primary, black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "SearchPosts">;

export const SearchPostsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { search: initialSearch } = route.params;
  const [search, setSearch] = useState(initialSearch);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation();

  const isHashtag = search.startsWith("#");

  const { data: users } = useGet({
    model: "search",
    uri: `/users/search?search=${search}&page=1&limit=5`,
    enabled: !isHashtag && search?.length > 0,
    enableId: search,
  });

  const { data: hashtags } = useGet({
    model: "searchHashtags",
    uri: `/hashtags/search?search=${search?.split("#")[1]}&page=1&limit=5`,
    enabled: isHashtag && search?.length > 1,
    enableId: search,
  });

  const { data: recents, refetch } = useGet({
    model: "recentSearch",
    uri: `/users/${user?.id}/searches?page=1&limit=10`,
  });

  const { mutate: handleCreateSearch } = usePost({ uri: "/searches" });
  const { mutate: handleDeleteAllRecents } = useDelete({
    uri: `/users/${user?.id}/searches`,
    onSuccess: () => refetch(),
  });

  const goToUser = (item: any) => {
    const { id, username, avatar, name, checkmark } = item;

    handleCreateSearch({
      userId: user?.id,
      user: {
        id,
        name,
        username,
        avatar: !!avatar ? avatar[0]?.url : [],
        checkmark,
      },
    });

    navigation.navigate("ProfileGeneral", {
      userId: id,
      username,
      avatar,
      name,
      checkmark,
      service: null,
      option: null,
    });
  };

  const renderResults = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      if (isHashtag) {
        return (
          <HashtagListItem
            name={item.name}
            postsCount={item.postsCount}
            onPress={() => {
              handleCreateSearch({
                userId: user?.id,
                hashtag: { id: item.id, name: item.name },
              });
              navigation.navigate("Hashtag", { name: item.name });
            }}
            sx={{ paddingHorizontal: 0 }}
          />
        );
      } else {
        return (
          <UserListItemSimple
            name={item.name}
            checkmark={item.checkmark}
            avatar={item.avatar}
            profession={item.username}
            onGoToUser={() => goToUser(item)}
            sx={{ marginBottom: 15 }}
          />
        );
      }
    },
    [isHashtag]
  );

  const goToSearchAll = useCallback(() => {
    if (search.length === 0) return;

    handleCreateSearch({
      userId: user?.id,
      word: isHashtag ? search.split("#")[1] : search,
    });

    navigation.navigate("SearchAll", {
      search: isHashtag ? search.split("#")[1] : search,
      screen: null,
    });
  }, [search]);

  const footer = (
    <Pressable style={{ marginTop: 30 }}>
      <Stack direction="row" align="center" justify="center">
        <Icon name="search" type="feather" color={primary} />
        <Pressable onPress={goToSearchAll}>
          <Text style={styles.searchAll}>{t("seeAllResults")}</Text>
        </Pressable>
      </Stack>
    </Pressable>
  );

  const header = (
    <Stack direction="row" sx={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "500", color: black, fontSize: 15 }}>
        {t("recents")}
      </Text>
      <IconButton
        name="close"
        type="material"
        color="white"
        size={11}
        sx={{ backgroundColor: "#ccc", borderRadius: 50, padding: 3 }}
        onPress={() => handleDeleteAllRecents()}
      />
    </Stack>
  );

  useRefreshOnFocus(refetch);

  const renderRecent = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <RecentSearchListItem item={item} onDelete={() => refetch()} />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start" sx={{ paddingHorizontal: 15 }}>
        <IconBackButton />
        <SearchBarInput
          autoFocus={true}
          placeholder={t("search")}
          value={search}
          onChangeText={(text) => setSearch(text)}
          showCancel={false}
          onCancel={goToSearchAll}
          height={60}
        />
        <Pressable onPress={goToSearchAll} style={{ marginLeft: 10 }}>
          <Text style={styles.cancelBtnText}>{t("search")}</Text>
        </Pressable>
      </Stack>
      {search?.length > 0 && (
        <FlatList
          data={isHashtag ? hashtags?.results : users?.results}
          keyExtractor={(item) => item.id}
          renderItem={renderResults}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, marginTop: 10 }}
          ListFooterComponent={footer}
        />
      )}
      {search?.length === 0 && (
        <FlatList
          ListHeaderComponent={header}
          data={recents?.results}
          keyExtractor={(item) => item.id}
          renderItem={renderRecent}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  heading: {
    textTransform: "uppercase",
    marginVertical: 10,
    fontSize: 13.5,
  },
  searchItem: {
    marginTop: 15,
  },
  username: {
    marginRight: 5,
    fontWeight: "500",
    fontSize: 15,
  },
  name: {
    color: grey0,
    fontSize: 15,
  },
  searchAll: {
    color: primary,
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 15,
  },
  cancelBtnText: {
    color: primary,
    backgroundColor: "white",
    padding: 2.5,
    fontWeight: "700",
  },
});
