import { StyleSheet, Text, View, Pressable } from "react-native";
import { Stack } from "../../core";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import ProgramList from "../Lists/ProgramList";

type IProps = { username: string; hours: any; onClose: () => void };
const { black, primary } = theme.lightColors || {};

const ProgramSheet = ({ hours, onClose }: IProps) => {
  return (
    <View style={styles.container}>
      <Stack direction="row">
        <Stack align="center" direction="row" sx={styles.icon}>
          <Icon name="calendar" type="feather" color={primary} />
          <Text style={styles.title}>Program</Text>
        </Stack>
        <Pressable style={styles.icon} onPress={onClose}>
          <Icon name="close" color={black} size={22.5} />
        </Pressable>
      </Stack>
      <ProgramList hours={hours} />
    </View>
  );
};

export default ProgramSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: { paddingVertical: 25, paddingHorizontal: 20 },
  title: {
    fontWeight: "700",
    color: black,
    fontSize: 15.5,
    marginLeft: 10,
  },
});
