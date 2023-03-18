import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useRef } from "react";
import {
  IconBackButton,
  IconButton,
  Stack,
  Checkmark,
  SheetModal,
} from "../../../core";
import theme from "../../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ProgramSheet from "../../Sheets/ProgramSheet";

const { black, success } = theme.lightColors || {};

type IProps = {
  username: string;
  onOpenSettings: () => void;
  checkmark: boolean;
  hours: any;
};

export const HeaderProfileGeneral = ({
  username,
  onOpenSettings,
  checkmark,
  hours,
}: IProps) => {
  const { t } = useTranslation("common");
  let open = true;
  const snapPoints = useMemo(() => [1, 450], []);
  const sheetRef = useRef<BottomSheetModal>(null);

  return (
    <SafeAreaView style={{ backgroundColor: "white", zIndex: 1000 }}>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <IconBackButton sx={{ marginRight: 15 }} />
        </Stack>
        <Stack direction="row">
          {/* <Text style={styles.name}>@{username}</Text> */}
          <Pressable onPress={() => sheetRef.current?.present()}>
            <Stack direction="row">
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 50,
                  backgroundColor: open ? success : "#ddd",
                  marginRight: 15,
                }}
              />
              <Text style={styles.name}>
                {open ? "Deschis" : "Închis acum"}
              </Text>
              <Icon name="keyboard-arrow-down" />
            </Stack>
          </Pressable>
          {/* {checkmark && <Checkmark sx={{ marginLeft: 5 }} />} */}
        </Stack>
        <Stack direction="row">
          <IconButton
            onPress={onOpenSettings}
            name="more-horizontal"
            color={black}
            sx={{ marginLeft: 15 }}
          />
        </Stack>
      </Stack>
      <SheetModal
        snapPoints={snapPoints}
        ref={sheetRef}
        animationConfig={{ duration: 300 }}
        showIndicator={false}
        enableContentPanningGesture={false}
      >
        <ProgramSheet
          username={username}
          hours={hours}
          onClose={() => sheetRef.current?.close()}
        />
      </SheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 7.5,
  },
  name: { fontSize: 15, color: black, fontWeight: "600" },
});
