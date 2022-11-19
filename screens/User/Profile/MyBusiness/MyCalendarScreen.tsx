import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Header, CFAB } from "../../../../components/core";
import { NoFoundMessage } from "../../../../components/customized";
import { useAuth, useSheet } from "../../../../hooks";

const { black } = theme.lightColors;

export const MyCalendarScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [schedules, setSchedules] = useState({});

  const sheetContent = <Text>Hello World</Text>;
  const { BOTTOM_SHEET, SHOW_BS } = useSheet(["25%", "60%"], sheetContent);

  const noFoundData = (
    <NoFoundMessage
      title="Nu mai sunt locuri"
      description="Se pare ca nu mai sunt locuri pentru ziua selectata"
      iconName="calendar-clock"
      iconType="material-community"
      iconSize={60}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={t("myCalendar")}
        actionBtn={
          <Pressable onPress={SHOW_BS}>
            <Icon name="info" type="feather" color={black} size={27.5} />
          </Pressable>
        }
      />

      <CFAB
        onPress={() => {}}
        icon={{ name: "post-add", type: "material", color: "white" }}
      />
      {BOTTOM_SHEET}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
  },
  slot: {
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 13,
  },
});
