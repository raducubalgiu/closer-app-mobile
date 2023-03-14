import { StyleSheet, Text, View } from "react-native";
import { Switch } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  title: string;
  description: string;
  onSwitch: (checked: boolean) => void;
  checked: boolean;
};

export const FixedPeriodListItem = ({
  title,
  description,
  onSwitch,
  checked,
}: IProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch value={checked} onValueChange={onSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 25, flexDirection: "row" },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: black,
    marginBottom: 2.5,
  },
  description: { color: grey0, marginRight: 15 },
});
