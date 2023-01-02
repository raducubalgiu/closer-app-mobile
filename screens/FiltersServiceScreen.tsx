import { FlatList, ListRenderItemInfo } from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FiltersContainer, OptionListItem } from "../components/customized";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Option } from "../models/option";

type IProps = NativeStackScreenProps<RootStackParams, "FiltersService">;

export const FiltersServiceScreen = ({ route }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { service, period } = route.params;
  const [option, setOption] = useState<Option | null>(null);
  const { t } = useTranslation();

  const goToLocations = () => {
    navigation.navigate("Locations", {
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
      disabled={!option}
    >
      <FlatList
        bounces={false}
        data={service?.filters[0]?.options}
        keyExtractor={(item) => item._id}
        renderItem={renderOption}
      />
    </FiltersContainer>
  );
};
