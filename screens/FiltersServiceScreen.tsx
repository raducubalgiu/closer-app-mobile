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
import { FiltersContainer, OptionListItem } from "../components/customized";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Option } from "../models/option";
import { useGet } from "../hooks";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersService">;

export const FiltersServiceScreen = ({ route }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { service, period } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [option, setOption] = useState<Option | null>(null);
  const { t } = useTranslation();
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

  return (
    <FiltersContainer
      mainHeading={t("filter")}
      secondHeading={t("correspondingServices")}
      headerTitle={service?.name}
      headerDescription={option ? option?.name : "-"}
      onNext={goToLocations}
      btnTitle={t("search")}
      disabled={!option || loading}
      loading={loading}
    >
      <FlatList
        bounces={false}
        data={data?.options}
        keyExtractor={(item) => item._id}
        renderItem={renderOption}
      />
    </FiltersContainer>
  );
};
