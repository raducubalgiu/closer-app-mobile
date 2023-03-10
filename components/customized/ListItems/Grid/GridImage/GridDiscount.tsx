import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "../../../../../assets/styles/theme";
import { trimFunc } from "../../../../../utils";

type IProps = { discount: number; expirationTime: string | null };
const { error, secondary } = theme.lightColors || {};

const GridDiscount = ({ discount, expirationTime }: IProps) => {
  const bgColor = expirationTime ? error : secondary;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[`${bgColor}`, `${bgColor}`]}
        start={{ x: 0.4, y: 1 }}
        end={{ x: 1.3, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.discount}>-{discount}%</Text>
      </LinearGradient>
    </View>
  );
};

export default memo(GridDiscount);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 7.5,
    left: 6.25,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 2.5,
  },
  discount: {
    fontSize: 11,
    fontWeight: "700",
    color: "white",
  },
});
