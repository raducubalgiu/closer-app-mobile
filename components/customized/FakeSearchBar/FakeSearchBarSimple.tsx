import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";
import { Stack } from "../../core";

const { grey0 } = theme.lightColors || {};
type IProps = { onPress: () => void; sx?: {} };

const FakeSearchBarSimple = ({ onPress, sx = {} }: IProps) => {
  return (
    <TouchableOpacity style={{ ...styles.container, ...sx }} onPress={onPress}>
      <Stack direction="row">
        <Stack direction="row">
          <Icon type="antdesign" name="search1" size={18} color={grey0} />
          <Text style={styles.text}>Cauta</Text>
        </Stack>
      </Stack>
    </TouchableOpacity>
  );
};

export default FakeSearchBarSimple;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  text: {
    marginLeft: 15,
    color: grey0,
  },
});
