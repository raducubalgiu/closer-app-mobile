import { useRef, useMemo } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Colors } from "../../assets/styles/Colors";
import CardService from "../Cards/CardService";

const BottomSheetService = (props) => {
  const { t } = useTranslation();
  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ["60%", "10%", "85%"], []);

  return (
    <BottomSheet
      style={styles.bottomSheet}
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={props.onHandleSheetChange}
      handleIndicatorStyle={styles.indicatorStyle}
    >
      <BottomSheetView>
        <View>
          <Text style={styles.sheetHeading}>
            {props.results} {props.results > 19 ? "de rezultate" : "rezultate"}
          </Text>
          <Divider width={2} color="#f1f1f1" style={styles.divider} />
          <FlatList
            data={props.data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <>
                <CardService
                  id={item._id}
                  image={item.imageCover}
                  business={item.name}
                  distance={item.distance}
                  address={`${item.startLocation.address.street}, ${item.startLocation.address.number}, ${item.startLocation.address.county}`}
                  ratingsAverage={item.ratingsAverage}
                  ratingsQuantity={item.ratingsQuantity}
                  service={props.serviceName}
                />
                <Divider />
              </>
            )}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetService;

const styles = StyleSheet.create({
  sheetHeading: {
    paddingVertical: 5,
    paddingLeft: 15,
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 15,
    textAlign: "center",
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  divider: { paddingBottom: 5, marginBottom: 5 },
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
