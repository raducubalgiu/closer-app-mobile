import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { Stack } from "../../core";
import { useTranslation } from "react-i18next";

const { grey0, black } = theme.lightColors || {};
type IProps = { onPress: () => void; sx?: {} };

const FakeSearchBarSimple = ({ onPress, sx = {} }: IProps) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={{ ...styles.container, ...sx }} onPress={onPress}>
      <Stack direction="row">
        <Stack direction="row">
          <Icon type="ionicon" name="ios-search" size={20} color={black} />
          <Text style={styles.text}>{t("search")}</Text>
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
    paddingHorizontal: 7.5,
    paddingVertical: 7.5,
  },
  text: {
    marginLeft: 10,
    color: grey0,
    fontSize: 15,
  },
});
