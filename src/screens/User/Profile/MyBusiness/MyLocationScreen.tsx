import { Divider } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Header,
  Heading,
  IconButtonEdit,
  SheetModal,
  Stack,
} from "../../../../components/core";
import MapStatic from "../../../../components/customized/Map/MapStatic";
import theme from "../../../../../assets/styles/theme";
import { useAuth, useGet } from "../../../../hooks";
import { AddressFormat, showToast } from "../../../../utils";
import { useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SheetMap from "../../../../components/customized/Sheets/SheetMap";

const { grey0 } = theme.lightColors || {};

export const MyLocationScreen = () => {
  const { width, height } = useWindowDimensions();
  const SHEET_HEIGHT = height / 1.2;
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, SHEET_HEIGHT], []);

  const { data } = useGet({
    model: "myLocation",
    uri: `/users/${user?.id}/locations/${user?.locationId}`,
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const { coordinates } = data?.address || {};

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myLocation")}
        actionBtn={<IconButtonEdit onPress={() => {}} />}
      />
      <Stack sx={{ flex: 1 }}>
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView>
            <MapStatic
              longitude={coordinates[1]}
              latitude={coordinates[0]}
              onOpenModal={() => sheetRef.current?.present()}
            />
            <View style={{ marginHorizontal: 15 }}>
              <Heading title="Adresa" sx={{ fontSize: 15 }} />
              <Text style={{ color: grey0, fontSize: 15 }}>
                {AddressFormat(data.address)}
              </Text>
              <Divider style={{ marginVertical: 15 }} />
            </View>
          </ScrollView>
        </View>
      </Stack>
      <SheetModal
        snapPoints={snapPoints}
        ref={sheetRef}
        showIndicator={false}
        enableContentPanningGesture={false}
      >
        <SheetMap
          latitude={coordinates[0]}
          longitude={coordinates[1]}
          height={SHEET_HEIGHT}
          width={width}
          onClose={() => sheetRef.current?.close()}
        />
      </SheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  map: {
    marginTop: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    position: "absolute",
    right: 15,
  },
});
