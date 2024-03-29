import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
  Keyboard,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { IconButton } from "../../components/core";
import { IconBackButton, SearchBarInput, Stack } from "../../components/core";
import theme from "../../../assets/styles/theme";
import {
  HashtagListItem,
  RecentSearchListItem,
  UserListItemSimple,
} from "../../components/customized";
import {
  useAuth,
  useDelete,
  useGet,
  usePost,
  useRefreshOnFocus,
} from "../../hooks";
import { Hashtag, User, SearchAll } from "../../ts";
import { isEmpty } from "lodash";

const { grey0, primary, black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "SearchPosts">;

type UserResponse = { next: number | null; results: User[] };
type HashtagResponse = { next: number | null; results: Hashtag[] };

export const SearchPostsScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const { search: initialSearch } = route.params;
  const [search, setSearch] = useState(initialSearch);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { t } = useTranslation("common");

  const isHashtag = search.startsWith("#");

  const { data: users } = useGet<UserResponse>({
    model: "search",
    uri: `/users/search?search=${search}&page=1&limit=5`,
    enableId: search,
    options: {
      enabled: !isHashtag && search?.length > 0,
    },
  });

  const { data: hashtags } = useGet<HashtagResponse>({
    model: "searchHashtags",
    uri: `/hashtags/search?search=${search?.split("#")[1]}&page=1&limit=5`,
    enableId: search,
    options: {
      enabled: isHashtag && search?.length > 1,
    },
  });

  const { data: recents, refetch } = useGet<any>({
    model: "recentSearch",
    uri: `/users/${user?.id}/searches?page=1&limit=10`,
  });

  const { mutate: handleCreateSearch } = usePost({ uri: "/searches" });
  const { mutate: handleDeleteAllRecents } = useDelete({
    uri: `/users/${user?.id}/searches`,
    onSuccess: () => refetch(),
  });

  const goToUser = (item: User) => {
    const { id, username, avatar, name, checkmark } = item;

    handleCreateSearch({
      userId: user?.id,
      user: {
        id,
        name,
        username,
        avatar: avatar?.url,
        checkmark,
      },
    });

    navigation.navigate("ProfileGeneral", {
      username,
      service: null,
      option: null,
    });
  };

  const goToSearchAll = useCallback((s: string) => {
    if (s.length === 0) return;

    handleCreateSearch({
      userId: user?.id,
      word: isHashtag ? s.split("#")[1] : s,
    });

    navigation.navigate("SearchAll", {
      search: isHashtag ? s.split("#")[1] : s,
      screen: null,
    });
  }, []);

  const goToHashtag = (item: Hashtag) => {
    handleCreateSearch({
      userId: user?.id,
      hashtag: { id: item.id, name: item.name },
    });
    navigation.navigate("Hashtag", { name: item.name });
  };

  const renderResults = useCallback(
    ({ item }: ListRenderItemInfo<any>) => {
      if (isHashtag) {
        return (
          <HashtagListItem
            name={item.name}
            postsCount={item.postsCount}
            onPress={() => goToHashtag(item)}
            sx={{ paddingHorizontal: 0 }}
          />
        );
      } else {
        return (
          <UserListItemSimple
            title={item.name}
            description={item.username}
            checkmark={item.checkmark}
            avatar={item.avatar}
            onGoToUser={() => goToUser(item)}
            sx={{ marginBottom: 15 }}
          />
        );
      }
    },
    [isHashtag]
  );

  useRefreshOnFocus(refetch);

  const handleRecentToSearch = (item: SearchAll) => {
    if (item.user) goToUser(item.user);
    if (item.word) goToSearchAll(item.word);
    if (item.hashtag) goToHashtag(item.hashtag);
  };

  const renderRecent = useCallback(
    ({ item }: ListRenderItemInfo<SearchAll>) => {
      return (
        <RecentSearchListItem
          item={item}
          onDelete={() => refetch()}
          onGoToSearch={handleRecentToSearch}
        />
      );
    },
    []
  );

  const footer = (
    <Pressable style={{ marginTop: 30 }}>
      <Stack direction="row" align="center" justify="center">
        <Icon name="search" type="feather" color={primary} />
        <Pressable onPress={() => goToSearchAll(search)}>
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
          onCancel={() => goToSearchAll(search)}
          height={60}
        />
        <Pressable
          onPress={() => goToSearchAll(search)}
          style={{ marginLeft: 10 }}
        >
          <Text style={styles.cancelBtnText}>{t("search")}</Text>
        </Pressable>
      </Stack>
      {!isEmpty(search) && (
        <FlatList
          data={isHashtag ? hashtags?.results : users?.results}
          keyExtractor={(item) => item.id}
          renderItem={renderResults}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15, marginTop: 10 }}
          ListFooterComponent={footer}
          onMomentumScrollBegin={() => Keyboard.dismiss()}
        />
      )}
      {isEmpty(search) && (
        <FlatList
          ListHeaderComponent={header}
          data={recents?.results}
          keyExtractor={(item) => item.id}
          renderItem={renderRecent}
          keyboardShouldPersistTaps={"handled"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          onMomentumScrollBegin={() => Keyboard.dismiss()}
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
