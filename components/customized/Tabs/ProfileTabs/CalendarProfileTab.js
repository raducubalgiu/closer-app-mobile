import { FlatList, StyleSheet, Text } from "react-native";
import React, { useState, useCallback } from "react";
import { Button } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { CardAvailableHour } from "../../Cards/CardAvailableHour";

const AVAILABLE_HOURS = [
  {
    _id: "1",
    date: "23 Ianuarie",
    hour: "16:30 - 17: 00",
  },
  {
    _id: "2",
    date: "24 Ianuarie",
    hour: "10:00 - 10: 30",
  },
  {
    _id: "3",
    date: "25 Ianuarie",
    hour: "16:30 - 17: 00",
  },
];

export const CalendarProfileTab = ({ services }) => {
  const [activeService, setActiveService] = useState(services[0]?._id);

  const handleChangeService = useCallback(
    (service) => setActiveService(service),
    []
  );

  const activeStyle = { ...styles.button, ...styles.activeBtn };
  const activeTxtStyle = { ...styles.btnText, ...styles.activeBtnText };

  const renderService = useCallback(
    ({ item }) => (
      <Button
        sx={item._id === activeService ? activeStyle : styles.button}
        onPress={() => handleChangeService(item?._id)}
      >
        <Text
          style={item._id === activeService ? activeTxtStyle : styles.btnText}
        >
          {item.name}
        </Text>
      </Button>
    ),
    [activeService]
  );

  const renderHeader = (
    <FlatList
      horizontal
      data={services}
      keyExtractor={(item) => item?._id}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{ marginTop: 15, marginBottom: 10 }}
      renderItem={renderService}
    />
  );

  const renderAvailable = useCallback(
    ({ item }) => <CardAvailableHour date={item.date} hour={item.hour} />,
    []
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      bounces={false}
      data={AVAILABLE_HOURS}
      keyExtractor={(item) => item?._id}
      renderItem={renderAvailable}
      contentContainerStyle={{ marginHorizontal: 15 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    marginRight: 15,
  },
  activeBtn: {
    backgroundColor: theme.lightColors.primary,
  },
  btnText: {
    fontFamily: "Exo-SemiBold",
  },
  activeBtnText: { color: "white" },
});
