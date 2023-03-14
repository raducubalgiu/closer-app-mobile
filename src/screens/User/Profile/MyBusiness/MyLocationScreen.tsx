import { Divider, Icon } from "@rneui/themed";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, ScrollView, View } from "react-native";
import {
  CModal,
  Header,
  Heading,
  IconButton,
  IconButtonEdit,
  Spinner,
  Stack,
} from "../../../../components/core";
import MapStatic from "../../../../components/customized/Map/MapStatic";
import theme from "../../../../../assets/styles/theme";
import { useAuth, useGet } from "../../../../hooks";
import { AddressFormat, showToast } from "../../../../utils";
import { useState } from "react";

const { grey0 } = theme.lightColors || {};

export const MyLocationScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  const { data, isLoading, isFetching } = useGet({
    model: "myLocation",
    uri: `/users/${user?.id}/locations/${user?.locationId}`,
    onError: () => showToast({ message: t("somethingWentWrong") }),
  });

  const { coordinates } = data?.address || {};
  const isLoadingLoc = isLoading || isFetching;

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myLocation")}
        actionBtn={<IconButtonEdit onPress={() => {}} />}
      />
      <Stack sx={{ flex: 1 }}>
        <View style={{ flex: 1, width: "100%" }}>
          {!isLoadingLoc && (
            <ScrollView>
              <Stack sx={styles.map}>
                <MapStatic
                  height={200}
                  longitude={coordinates && coordinates[1]}
                  latitude={coordinates && coordinates[0]}
                  minZoom={15}
                  isModal={false}
                />
                <IconButton
                  name="maximize-2"
                  size={20}
                  onPress={() => setVisible(true)}
                  sx={{ ...styles.button, bottom: 15 }}
                />
              </Stack>
              <View style={{ marginHorizontal: 15 }}>
                <Heading title="Adresa" sx={{ fontSize: 15 }} />
                <Text style={{ color: grey0, fontSize: 15 }}>
                  {AddressFormat(data.address)}
                </Text>
                <Divider style={{ marginVertical: 15 }} />
              </View>
            </ScrollView>
          )}
          {isLoadingLoc && <Spinner />}
        </View>
      </Stack>
      <CModal
        visible={visible}
        size="xl"
        onCloseModal={() => setVisible(false)}
        header={false}
      >
        <MapStatic
          height={"100%"}
          longitude={coordinates && coordinates[1]}
          latitude={coordinates && coordinates[0]}
          zoomEnabled={true}
          scrollEnabled={true}
          sx={{ borderRadius: 5 }}
          isModal={true}
        />
        <IconButton
          name="close"
          type="material"
          onPress={() => setVisible(false)}
          size={20}
          sx={{ top: 15, ...styles.button }}
        />
      </CModal>
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
