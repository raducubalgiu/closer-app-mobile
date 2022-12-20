import { StyleSheet, View } from "react-native";
import { Icon, Badge } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { primary } = theme.lightColors || {};

export const TabBadge = ({ value, color }: { value: number; color: any }) => {
  return (
    <View>
      <Icon name="shopping-bag" type="feather" size={22} color={color} />
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
    fontSize: 10.5,
  },
});
