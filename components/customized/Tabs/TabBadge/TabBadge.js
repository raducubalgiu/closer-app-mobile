import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon, Badge } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { primary } = theme.lightColors;

export const TabBadge = ({ value }) => {
  return (
    <View>
      <Icon name="shopping-bag" type="feather" />
      <Badge
        value={value}
        containerStyle={styles.containerStyle}
        badgeStyle={styles.badgeStyle}
        textStyle={styles.textStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: "absolute",
    top: -10,
    left: 15,
  },
  badgeStyle: {
    backgroundColor: primary,
    width: 22.5,
    height: 21,
    borderRadius: 50,
  },
  textStyle: {
    fontFamily: "Exo-SemiBold",
    fontSize: 10.5,
  },
});
