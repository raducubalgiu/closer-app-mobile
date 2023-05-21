import { SafeAreaView, StyleSheet, View, ScrollView, Text } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Button, Heading } from "../../components/core";
import { RootStackParams } from "../../navigation/rootStackParams";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../components/core";
import { CustomRangeSlider, HeaderSheet } from "../../components/customized";

const { grey0 } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "LocationFilterPrice">;

export const LocationFilterPriceScreen = ({ route }: IProps) => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { min, max } = route.params.price;

  const [range, setRange] = useState<[number, number]>([min, max]);

  const handleReset = () => {
    setRange([0, 50]);
  };

  const handleChange = (range: [number, number]) => {
    setRange(range);
  };

  const navigateToLocations = () => {
    navigation.navigate({
      name: "Locations",
      params: {
        price: {
          min: range[0],
          max: range[1],
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
      <View style={styles.container}>
        <ScrollView scrollEnabled={false}>
          <Heading title={t("filterPrice")} sx={styles.title} />
          <Text style={styles.description}>
            {t("applingFiltersTheAveragePriceIs", {
              AVERAGE_PRICE: 145,
              CURRENCY: "lei",
            })}
          </Text>
          <CustomRangeSlider
            range={range}
            min={0}
            max={5000}
            onValueChange={handleChange}
            sx={{ marginHorizontal: 12.5 }}
            sxHeader={{ marginHorizontal: 10 }}
            label={t("lei")}
          />
        </ScrollView>
        <Stack direction="row">
          <Button
            onPress={handleReset}
            title={t("delete")}
            sxBtn={{ flex: 1 }}
            variant="outlined"
            disabled={range[0] !== min && range[1] !== max}
          />
          <Button
            onPress={navigateToLocations}
            title={t("filter")}
            disabled={range[0] === min && range[1] === max}
            sxBtn={{ flex: 1, marginLeft: 15 }}
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  title: { fontSize: 22 },
  description: { color: grey0, fontSize: 15 },
});
