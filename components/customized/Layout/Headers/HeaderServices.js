import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import theme from "../../../../assets/styles/theme";
import { Stack, ButtonFilter, IconBackButton } from "../../../core";
import { Icon, Switch, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export const HeaderServices = ({
  period,
  onToggleSwitch,
  serviceName,
  checked,
}) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const displayPeriod = (startDate, endDate) => {
    return "Calendar";
  };

  const toggleSwitch = () => onToggleSwitch();

  return (
    <Stack>
      <Stack direction="row" sx={styles.header}>
        <IconBackButton onPress={() => navigation.navigate("Home")} />
        <TouchableOpacity style={styles.search}>
          <Icon name="search" size={18} color={theme.lightColors.grey0} />
          <Text style={styles.service}>{serviceName},</Text>
          <Text style={styles.searchText}>
            {period?.code === 0
              ? displayPeriod(period?.startDate, period?.endDate)
              : period?.type}
          </Text>
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
    fontFamily: "Exo-Bold",
    marginLeft: 10,
    color: theme.lightColors.black,
  },
  searchText: {
    fontFamily: "Exo-Medium",
    marginLeft: 5,
    color: theme.lightColors.grey0,
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
