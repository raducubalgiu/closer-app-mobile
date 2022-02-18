import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { Divider } from "react-native-elements";
import axios from "axios";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { DUMMY_RECOMMENDED } from "../../dummy-data/dummyRecomended";
import CardRecommended from "../Cards/CardRecommended";
import { Colors } from "../../assets/styles/Colors";

const BottomSheetRecommend = (props) => {
  const [locations, setLocations] = useState([]);
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const [sheetStep, setSheetStep] = useState(0);
  const height = Dimensions.get("window").height;

  const snapPoints = useMemo(() => [height / 2, height / 1.2], []);

  const handleSheetChange = useCallback((index) => {
    setSheetStep(index);
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://192.168.100.2:8000/api/v1/locations/get-recommended?latlng=26.100195,44.428286`
      )
      .then((resp) => {
        setLocations(resp.data.services);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={sheetStep[0]}
        appearsOnIndex={sheetStep[1]}
      />
    ),
    []
  );

  return (
    <BottomSheet
      style={styles.bottomSheet}
      backdropComponent={renderBackdrop}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleIndicatorStyle={{
        backgroundColor: "#ddd",
        width: 45,
        height: 5,
      }}
    >
      <BottomSheetView>
        <View>
          <Text style={styles.sheetHeading}>{t("nearYou")}</Text>
          <Divider
            width={2}
            color="#f1f1f1"
            style={{ paddingBottom: 5, marginBottom: 5 }}
          />
          <FlatList
            data={locations}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CardRecommended
                id={item._id}
                name={item.name}
                image={item.imageCover}
                title={item.title}
                street={item.startLocation.address.street}
                number={item.startLocation.address.number}
                county={item.startLocation.address.county}
                distance={item.distance}
                ratingsAverage={item.ratingsAverage}
                ratingsQuantity={item.ratingsQuantity}
                availableSeats={item.availableSeats}
              />
            )}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetRecommend;

const styles = StyleSheet.create({
  sheetHeading: {
    paddingVertical: 5,
    paddingLeft: 15,
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
  },
  bottomSheet: {
    shadowColor: "#c9c5c5",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 11,
  },
});
