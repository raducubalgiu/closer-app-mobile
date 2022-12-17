import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import { useCallback, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import theme from "../assets/styles/theme";
import { IconBackButton, SearchBarInput, Stack } from "../components/core";
import { useAuth } from "../hooks";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Service } from "../models/service";

const { black, grey0 } = theme.lightColors || {};

type IProps = NativeStackScreenProps<RootStackParams, "SearchServices">;

export const SearchServicesScreen = ({ route }: IProps) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { period } = route.params || {};

  const updateSearch = useCallback(
    (search: string) => {
      const controller = new AbortController();
      setSearch(search);
      if (search) {
        axios
          .get(
            `${process.env.BASE_ENDPOINT}/services/search?search=${search}&page=1&limit=5`,
            {
              signal: controller.signal,
              headers: { Authorization: `Bearer ${user?.token}` },
            }
          )
          .then((res) => setServices(res.data.results))
          .catch((err) => console.log(err));
      } else {
        setServices([]);
      }

      return () => {
        controller.abort();
      };
    },
    [search]
  );

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

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" justify="start" sx={{ marginHorizontal: 15 }}>
        <IconBackButton sx={{ marginRight: 10 }} />
        <SearchBarInput
          autoFocus={true}
          placeholder={t("searchService")}
          value={search}
          onChangeText={updateSearch}
          cancelButtonTitle=""
        />
      </Stack>
      <FlatList
        data={services}
        keyExtractor={keyExtractor}
        renderItem={renderServices}
        ListFooterComponent={
          <>
            {services.length === 0 && (
              <Text style={styles.heading}>{t("suggested")}</Text>
            )}
          </>
        }
        contentContainerStyle={{ paddingHorizontal: 15 }}
        keyboardShouldPersistTaps={"handled"}
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
    paddingTop: 15,
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
    fontSize: 15.5,
  },
  locationsCount: {
    color: grey0,
    fontSize: 14.5,
  },
});
