import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import theme from "../../../../assets/styles/theme";
import { Stack, ButtonFilter, IconBackButton } from "../../../core";
import { Icon, Switch } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDates } from "../../../../hooks";

const { grey0, black } = theme.lightColors;

export const HeaderServices = ({
  onToggleSwitch,
  serviceName,
  checked,
  period,
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { SHORT_DATE } = useDates();

  const displayPeriod = (period) => {
    switch (period.code) {
      case 0:
        return t("anytime");
      case 1:
        return t("now");
      case 2:
        return `${SHORT_DATE(period.startDate)} - ${SHORT_DATE(
          period.endDate
        )}`;
      default:
        return "-";
    }
  };

  const toggleSwitch = () => onToggleSwitch();

  return (
    <Stack>
      <Stack direction="row" sx={styles.header}>
        <IconBackButton onPress={() => navigation.navigate("Home")} />
        <TouchableOpacity style={styles.search}>
          <Icon name="search" size={18} color={grey0} />
          <Text style={styles.service}>{serviceName},</Text>
          <Text style={styles.searchText}>{displayPeriod(period)}</Text>
        </TouchableOpacity>
      </Stack>
      <ScrollView
        horizontal
        contentContainerStyle={styles.filters}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <Switch
          value={checked}
          onValueChange={toggleSwitch}
          color="#f1f1f1"
          style={styles.item}
        />
        <ButtonFilter sx={styles.item} title={t("price")} onPress={() => {}} />
        <ButtonFilter
          sx={styles.item}
          title={t("distance")}
          onPress={() => {}}
        />
        <ButtonFilter
          sx={styles.item}
          title={t("ratings")}
          onPress={() => {}}
        />
      </ScrollView>
    </Stack>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    marginBottom: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingVertical: 12.5,
    paddingHorizontal: 15,
    flex: 1,
    marginLeft: 20,
  },
  service: {
    marginLeft: 10,
    color: black,
  },
  searchText: {
    marginLeft: 5,
    color: grey0,
  },
  filters: {
    paddingHorizontal: 5,
    paddingBottom: 15,
    overflow: "scroll",
  },
  item: {
    marginRight: 5,
  },
});
