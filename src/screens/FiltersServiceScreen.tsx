import {
  Text,
  ListRenderItemInfo,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { first } from "lodash";
import * as Location from "expo-location";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../navigation/rootStackParams";
import { Filter, Option } from "../ts";
import { useGet } from "../hooks";
import { displayDash } from "../utils";
import theme from "../../assets/styles/theme";
import { Spinner, Stack, IconBackButton, Button } from "../components/core";
import { OptionListItem } from "../components/customized";

const { primary } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "FiltersService">;

export const FiltersServiceScreen = ({ route }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { service, period } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [option, setOption] = useState<Option | null>(null);
  const { t } = useTranslation("common");
  const filter = first(service?.filters);
  const insets = useSafeAreaInsets();

  const { data, isLoading, isFetching } = useGet<Filter>({
    model: "filter",
    uri: `/filters/${filter?.id ? filter?.id : filter}`,
  });

  const isLoadingOptions = isLoading || isFetching;

  const goToLocations = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLoading(false);
      navigation.navigate("UserLocationPermission");
    }

    let location = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = location?.coords || {};

    setLoading(false);
    navigation.push("Locations", {
      longitude,
      latitude,
      service,
      option,
      period,
      sort: {
        title: t("distance"),
        query: "distance,ownerId.ratingsQuantity,smallestPrice",
      },
      distance: {
        min: 0,
        max: 50,
      },
      price: {
        min: 1,
        max: 5000,
      },
    });
  };

  const renderOption = useCallback(
    ({ item }: ListRenderItemInfo<Option>) => (
      <OptionListItem
        name={item.name}
        isActive={item._id === option?._id}
        onPress={() => setOption(item)}
      />
    ),
    [option]
  );

  const keyExtractor = useCallback((item: Option) => item._id, []);

  return (
    <LinearGradient
      colors={["#fe9934", "#f2f2f2"]}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 0.5, y: 0.5 }}
      style={styles.screen}
    >
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.mainHeading}>{t("select")}</Text>
        <Text style={styles.mainHeading}>{t("period")}</Text>
      </View>
      <View style={styles.container}>
        <Stack direction="row" justify="center" sx={styles.sheetOverview}>
          <IconBackButton size={20} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{service?.name}</Text>
            <Text style={styles.description}>{displayDash(option?.name)}</Text>
          </View>
          <Icon name="chevron-back" type="ionicon" color="white" />
        </Stack>
        {!isLoadingOptions && (
          <FlatList
            bounces={false}
            data={data?.options}
            keyExtractor={keyExtractor}
            renderItem={renderOption}
          />
        )}
        {isLoadingOptions && <Spinner />}
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          <Button
            title={t("next")}
            disabled={!option || loading}
            onPress={goToLocations}
            loading={loading}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: primary },
  header: { marginVertical: 30, marginHorizontal: 20 },
  mainHeading: { color: "white", fontSize: 28, fontWeight: "700" },
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-between",
  },
  sheetOverview: {
    marginHorizontal: 15,
    marginBottom: 5,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: "grey",
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 15,
    fontWeight: "500",
  },
  footer: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 15,
  },
});
