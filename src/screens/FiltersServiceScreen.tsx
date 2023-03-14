import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { first } from "lodash";
import * as Location from "expo-location";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FiltersContainer } from "../components/customized";
import OptionListItem from "../components/customized/ListItems/OptionListItem";
import { RootStackParams } from "../navigation/rootStackParams";
import { Option } from "../models/option";
import { useGet } from "../hooks";
import { displayDash } from "../utils";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersService">;

export const FiltersServiceScreen = ({ route }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { service, period } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [option, setOption] = useState<Option | null>(null);
  const { t } = useTranslation("common");
  const filter = first(service?.filters);

  const { data } = useGet({
    model: "filter",
    uri: `/filters/${filter?.id ? filter?.id : filter}`,
  });

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
    navigation.navigate("Locations", {
      longitude,
      latitude,
      service,
      option,
      period,
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
    <FiltersContainer
      mainHeading={t("filter")}
      secondHeading={t("correspondingServices")}
      headerTitle={service?.name}
      headerDescription={displayDash(option?.name)}
      onNext={goToLocations}
      btnTitle={t("search")}
      disabled={!option || loading}
      loading={loading}
    >
      <FlatList
        bounces={false}
        data={data?.options}
        keyExtractor={keyExtractor}
        renderItem={renderOption}
      />
    </FiltersContainer>
  );
};
