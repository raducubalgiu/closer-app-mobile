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
import theme from "../assets/styles/theme";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import { useGet } from "../hooks";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Service } from "../models/service";
import { NoFoundMessage } from "../components/customized";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "SearchServices">;

export const SearchServicesScreen = ({ route }: IProps) => {
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { period } = route.params || {};

  const { data: services } = useGet({
    model: "searchServices",
    uri: `/services/search?search=${search}&page=1&limit=5`,
    enabled: !!search,
    enableId: search,
  });

  const { results } = services || [];

  const { data: suggested } = useGet({
    model: "suggestedServices",
    uri: `/services/suggested`,
  });

  const goToFilters = (item: any) => {
    navigation.navigate("FiltersDate", {
      service: item,
      period,
    });
  };

  const renderServices = useCallback(
    ({ item }: ListRenderItemInfo<Service>) => (
      <Pressable onPress={() => goToFilters(item)} style={styles.item}>
        <Text style={styles.service}>{item.name}</Text>
        <Text style={styles.locationsCount}>
          {item.locationsCount} {t("locations")}
        </Text>
      </Pressable>
    ),
    []
  );

  const keyExtractor = useCallback((item: Service) => item.id, []);

  let header;
  if (!results?.length && search?.length === 0) {
    header = <Text style={styles.heading}>{t("suggested")}</Text>;
  }

  let footer;
  if (!results?.length && search.length > 0) {
    footer = (
      <NoFoundMessage
        title={t("services")}
        description={t("noFoundServices")}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
        <IconBackButton sx={{ marginRight: 5 }} />
        <SearchBarInput
          autoFocus={true}
          placeholder={t("searchService")}
          value={search}
          onChangeText={(text: string) => setSearch(text)}
        />
      </Stack>
      <FlatList
        ListHeaderComponent={header}
        data={!results?.length && !search?.length ? suggested : results}
        keyExtractor={keyExtractor}
        renderItem={renderServices}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        keyboardShouldPersistTaps={"handled"}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    textTransform: "uppercase",
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: "600",
    fontSize: 15.5,
  },
  item: {
    paddingVertical: 15,
  },
  service: {
    textTransform: "uppercase",
    color: black,
    fontWeight: "600",
    fontSize: 14.5,
  },
  locationsCount: {
    color: grey0,
    fontSize: 14.5,
  },
});
