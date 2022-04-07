import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NotFoundContent from "../../../components/customized/NotFoundContent/NotFoundContent";

const CalendarProfileScreen = () => {
  return (
    <NotFoundContent
      iconName="calendar"
      iconType="antdesign"
      title="Calendarul tau"
      description="In functie de specificul business-ului tau, iti vei putea gestiona calendarul"
    />
  );
};

export default CalendarProfileScreen;

const styles = StyleSheet.create({});
