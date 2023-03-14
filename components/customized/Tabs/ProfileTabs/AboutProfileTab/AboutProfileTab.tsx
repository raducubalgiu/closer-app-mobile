import { View, useWindowDimensions } from "react-native";
import { forwardRef, useCallback, memo, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { SheetModal } from "../../../../core";
import { useGet } from "../../../../../src/hooks";
import Animated from "react-native-reanimated";
import { User } from "../../../../../models";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AboutDescription from "./sections/AboutDescription";
import AboutInfo from "./sections/AboutInfo";
import MapStatic from "../../../Map/MapStatic";
import AboutProgram from "./sections/AboutProgram";
import SheetMap from "../../../Sheets/SheetMap";

type IProps = {
  user: User;
  onScroll: any;
  sharedProps: any;
};

const AboutProfileTab = forwardRef((props: IProps, ref: any) => {
  const { sharedProps, onScroll, user } = props;
  const { website, locationId, email, hours, description } = user;
  const sheetRef = useRef<BottomSheetModal>(null);
  const isFocused = useIsFocused();
  const { height, width } = useWindowDimensions();
  const SHEET_HEIGHT = height / 1.25;

  const { data: location, isLoading } = useGet({
    model: "location",
    uri: `/locations/${locationId}`,
    enabled: isFocused && !!locationId,
    enableId: locationId,
  });

  const { ownerId } = location || {};
  const loading = isLoading && locationId;

  const sections = [
    <AboutDescription description={description} />,
    <AboutInfo website={website} email={email} owner={ownerId} />,
    <MapStatic
      latitude={location?.address?.coordinates[0]}
      longitude={location?.address?.coordinates[1]}
      onOpenModal={() => sheetRef.current?.present()}
    />,
    <AboutProgram hours={hours} />,
  ];

  const renderSection = useCallback(
    ({ item }: any) => {
      return item;
    },
    [location]
  );

  const keyExtractor = useCallback(
    (_: any, index: number) => index.toString(),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        {...sharedProps}
        ref={ref}
        onScroll={onScroll}
        data={sections}
        renderItem={renderSection}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <SheetModal
        ref={sheetRef}
        snapPoints={[1, SHEET_HEIGHT]}
        enableContentPanningGesture={false}
        showIndicator={false}
      >
        <SheetMap
          latitude={location?.address?.coordinates[0]}
          longitude={location?.address?.coordinates[1]}
          height={SHEET_HEIGHT}
          width={width}
          onClose={() => sheetRef.current?.close()}
        />
      </SheetModal>
    </View>
  );
});

export default memo(AboutProfileTab);
