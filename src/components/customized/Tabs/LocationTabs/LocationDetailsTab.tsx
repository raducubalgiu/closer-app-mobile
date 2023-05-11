import {
  StyleSheet,
  Text,
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
  View,
} from "react-native";
import { useCallback, useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Divider } from "@rneui/themed";
import MapStatic from "../../Map/MapStatic";
import { useAuth } from "../../../../hooks";
import { AddressFormat } from "../../../../utils";
import { UserListItemSimple } from "../../ListItems/User/UserListItemSimple";
import { User, Location } from "../../../../ts";
import { Button, Heading, SheetModal, Spinner } from "../../../core";
import theme from "../../../../../assets/styles/theme";
import SheetMap from "../../Sheets/SheetMap";

const { grey0 } = theme.lightColors || {};
type IProps = { location: Location | undefined; loading: boolean };

export const LocationDetailsTab = ({ location, loading }: IProps) => {
  const { user } = useAuth();
  const { t } = useTranslation("common");
  const { width, height } = useWindowDimensions();
  const SHEET_HEIGHT = height / 1.2;
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, SHEET_HEIGHT], []);

  const employees = location?.employees.filter((emp) => emp.id !== user?.id);

  const renderEmployee = useCallback(
    ({ item }: ListRenderItemInfo<User>) => (
      <UserListItemSimple
        title={item.name}
        description={item?.profession?.name}
        checkmark={item.checkmark}
        avatar={item?.avatar}
        sx={{ marginHorizontal: 15, marginBottom: 20 }}
        arrowRight
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: User) => item.id, []);

  return (
    <View style={styles.container}>
      {!loading && (
        <FlatList
          ListHeaderComponent={
            <View style={{ flex: 1, width: "100%" }}>
              <View>
                {location?.address && (
                  <MapStatic
                    longitude={location?.address?.coordinates[1]}
                    latitude={location?.address?.coordinates[0]}
                    onOpenModal={() => sheetRef.current?.present()}
                  />
                )}
                <View style={{ marginHorizontal: 15 }}>
                  <Heading title={t("address")} />
                  <Text style={{ color: grey0, fontSize: 15 }}>
                    {AddressFormat(location?.address)}
                  </Text>
                  <Button
                    variant="outlined"
                    title={t("edit")}
                    onPress={() => {}}
                  />
                  <Divider style={{ marginTop: 15 }} />
                </View>
                <View style={{ margin: 15 }}>
                  <Heading title={t("employees")} />
                </View>
              </View>
            </View>
          }
          data={employees}
          keyExtractor={keyExtractor}
          renderItem={renderEmployee}
        />
      )}
      {loading && <Spinner />}
      <SheetModal
        snapPoints={snapPoints}
        ref={sheetRef}
        showIndicator={false}
        enableContentPanningGesture={false}
        duration={500}
      >
        {location?.address && (
          <SheetMap
            latitude={location?.address?.coordinates[0]}
            longitude={location?.address?.coordinates[1]}
            height={SHEET_HEIGHT}
            width={width}
            onClose={() => sheetRef.current?.close()}
          />
        )}
      </SheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
