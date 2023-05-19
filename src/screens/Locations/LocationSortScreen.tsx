import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import HeaderSheet from "../../components/customized/Layout/Headers/HeaderSheet";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, FormInputRadio, Heading, Stack } from "../../components/core";
import { useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import theme from "../../../assets/styles/theme";
import { RootStackParams } from "../../navigation/rootStackParams";

type IProps = NativeStackScreenProps<RootStackParams, "LocationSort">;
const { error } = theme.lightColors || {};

export const LocationSortScreen = ({ route }: IProps) => {
  const { t } = useTranslation("common");
  const [customSort, setCustomSort] = useState(route.params.sort);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();

  const sortArr = [
    {
      title: t("distance"),
      query: "distance,ownerId.ratingsQuantity,smallestPrice",
    },
    {
      title: t("discounts"),
      query: "distance,ownerId.ratingsQuantity,smallestPrice",
    },
    {
      title: t("highestRating"),
      query: "ownerId.ratingsAverage, distance, smallestPrice",
    },
    {
      title: t("smallestPrice"),
      query: "smallestPrice, distance, ownerId.ratingsAverage",
    },
    {
      title: t("highestPrice"),
      query: "highestPrice, distance, ownerId.ratingsAverage",
    },
  ];

  const navigateToLocations = () => {
    navigation.navigate({
      name: "Locations",
      params: {
        sort: {
          title: customSort.title,
          query: customSort.query,
        },
      },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <HeaderSheet
        sx={{ marginVertical: 2.5 }}
        title=""
        onClose={() => navigation.goBack()}
        divider={false}
      />
      <View
        style={{
          marginHorizontal: 15,
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <ScrollView>
          <Heading title={t("sort")} sx={{ fontSize: 21 }} />
          {sortArr.map((el, i) => (
            <FormInputRadio
              key={i}
              title={el.title}
              onPress={() => setCustomSort(el)}
              checked={el.title === customSort.title}
            />
          ))}
        </ScrollView>
        <Stack direction="row" sx={{ width: "100%" }}>
          <Button
            title={t("delete")}
            onPress={() => setCustomSort(sortArr[0])}
            disabled={customSort.title === t("distance")}
            sxBtn={{ width: width / 2 - 20 }}
            variant="outlined"
          />
          <Button
            title={t("sort")}
            onPress={navigateToLocations}
            disabled={customSort.title === route.params.sort.title}
            sxBtn={{ width: width / 2 - 20 }}
          />
        </Stack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
