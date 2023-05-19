import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Text,
  TextInput,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HeaderSheet from "../../components/customized/Layout/Headers/HeaderSheet";
import { Button, Heading } from "../../components/core";
import { RootStackParams } from "../../navigation/rootStackParams";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../components/core";
import { RangeSlider } from "@sharcoux/slider";

const { grey0, primary, black } = theme.lightColors || {};
type IProps = NativeStackScreenProps<RootStackParams, "LocationFilterDistance">;

export const LocationFilterDistanceScreen = ({ route }: IProps) => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();
  const { min, max } = route.params.distance;

  const THUMB_SIZE = 12.5;

  const [range, setRange] = useState<[number, number]>([min, max]);

  // const handleChange = useCallback((range: number[]) => {
  //   setRange(range);
  // }, []);

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
        distance: {
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
          <Heading title={t("filterDistance")} sx={styles.title} />
          <Text style={styles.description}>
            Distanţele sunt exprimate in kilometri. Poti gasi servicii pe o
            distanta de maximum 50 de km.
          </Text>
          <Stack
            direction="row"
            sx={{ marginHorizontal: 5, marginTop: 30, marginBottom: 10 }}
          >
            <Text style={{ color: grey0 }}>{range[0]}</Text>
            <Text style={{ color: grey0 }}>{range[1]}</Text>
          </Stack>
          <RangeSlider
            range={range} // set the current slider's value
            minimumValue={0} // Minimum value
            maximumValue={50} // Maximum value
            step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
            crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
            outboundColor="#E4E4E4" // The track color outside the current range value
            inboundColor={primary} // The track color inside the current range value
            thumbTintColor={primary} // The color of the slider's thumb
            thumbStyle={{
              width: THUMB_SIZE * 2,
              height: THUMB_SIZE * 2,
              borderRadius: THUMB_SIZE,
              borderWidth: 1.5,
              borderColor: "#ffffff",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: -1 },
              shadowOpacity: 0.16,
              shadowRadius: 3,
            }} // Override the thumb's style
            trackStyle={undefined} // Override the tracks' style
            minTrackStyle={undefined} // Override the tracks' style for the minimum range
            midTrackStyle={undefined} // Override the tracks' style for the middle range
            maxTrackStyle={undefined} // Override the tracks' style for the maximum range
            vertical={false} // If true, the slider will be drawn vertically
            inverted={false} // If true, min value will be on the right, and max on the left
            enabled={true} // If false, the slider won't respond to touches anymore
            trackHeight={5} // The track's height in pixel
            thumbSize={15} // The thumb's size in pixel
            thumbImage={undefined} // An image that would represent the thumb
            slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
            onValueChange={handleChange} // Called each time the value changed. The type is (range: [number, number]) => void
            onSlidingStart={undefined} // Called when the slider is pressed. The type is (range: [number, number]) => void
            onSlidingComplete={undefined} // Called when the press is released. The type is (range: [number, number]) => void
            CustomThumb={undefined} // Provide your own component to render the thumb. The type is a component: ({ value: number, thumb: 'min' | 'max' }) => JSX.Element
            style={{ marginHorizontal: 12.5 }}
          />
        </ScrollView>
        <Stack direction="row">
          <Button
            onPress={handleReset}
            title={t("delete")}
            sxBtn={{ width: width / 2 - 30 }}
            variant="outlined"
            disabled={range[0] !== min && range[1] !== max}
          />
          <Button
            onPress={navigateToLocations}
            title={t("filter")}
            disabled={range[0] === min && range[1] === max}
            sxBtn={{ width: width / 2 - 30 }}
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
