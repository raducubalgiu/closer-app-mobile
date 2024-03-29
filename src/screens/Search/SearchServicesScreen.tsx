import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import { IconBackButton, SearchBarInput, Stack } from "../../components/core";
import { useGet } from "../../hooks";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Service } from "../../ts";
import { NoFoundMessage, TapFeedbackButton } from "../../components/customized";
import { Icon } from "@rneui/themed";
import { isEmpty } from "lodash";

const { black, grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "SearchServices">;

export const SearchServicesScreen = ({ route }: IProps) => {
  const { defaultPeriod, screen } = route.params;
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { data: services, isLoading } = useGet<any>({
    model: "searchServices",
    uri: `/services/search?search=${search}&page=1&limit=5`,
    enableId: search,
    options: { enabled: !!search },
  });

  const { results } = services || {};

  const { data: suggested } = useGet({
    model: "suggestedServices",
    uri: `/services/suggested`,
  });

  const goToFilters = (item: Service) => {
    navigation.navigate("FiltersDate", {
      screen,
      defaultPeriod,
      service: item,
    });
  };

  const renderServices = useCallback(
    ({ item }: ListRenderItemInfo<Service>) => (
      <TapFeedbackButton onPress={() => goToFilters(item)}>
        <Stack direction="row" justify="start" sx={{ paddingHorizontal: 15 }}>
          <Icon name="search" type="ionicon" size={20} style={styles.iconTag} />
          <Stack align="start" sx={{ marginLeft: 10 }}>
            <Text style={styles.service}>{item.name}</Text>
            <Text style={styles.locationsCount}>
              {item.locationsCount} {t("locations")}
            </Text>
          </Stack>
        </Stack>
      </TapFeedbackButton>
    ),
    []
  );

  const keyExtractor = useCallback((item: Service) => item.id, []);

  let footer;
  if (isEmpty(results) && !isEmpty(search) && search.length > 1) {
    footer = (
      <NoFoundMessage
        title={t("services")}
        description={t("noFoundServices")}
      />
    );
  }

  const displayResults = !isLoading && results;

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start">
        <Stack direction="row" sx={{ marginHorizontal: 15 }}>
          <IconBackButton sx={{ marginRight: 5 }} />
          <SearchBarInput
            autoFocus={true}
            placeholder={t("searchService")}
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </Stack>
      </Stack>
      <FlatList
        data={isEmpty(results) && isEmpty(search) ? suggested : displayResults}
        keyExtractor={keyExtractor}
        renderItem={renderServices}
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
    marginHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: "600",
    fontSize: 15.5,
  },
  service: {
    color: black,
    fontWeight: "500",
    fontSize: 15,
    marginBottom: 2.5,
  },
  locationsCount: {
    color: grey0,
    fontSize: 14.5,
  },
  iconTag: {
    padding: 7.5,
    borderRadius: 50,
  },
});
