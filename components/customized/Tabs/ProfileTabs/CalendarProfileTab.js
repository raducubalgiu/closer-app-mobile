import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NotFoundContent from "../../NotFoundContent/NotFoundContent";

export const CalendarProfileTab = () => {
  return (
    <NotFoundContent
      iconName="calendar"
      iconType="antdesign"
      title="Calendarul tau"
      description="In functie de specificul business-ului tau, iti vei putea gestiona calendarul"
    />
  );
};

const styles = StyleSheet.create({});
