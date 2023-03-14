import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../assets/styles/theme";
import Stack from "../Stack/Stack";
import { IconBackButton } from "../IconButton/IconBackButton";

const { black, grey0 } = theme.lightColors || {};

type IProps = {
  hideBtnLeft?: boolean;
  title: any;
  subtitle?: string;
  actionBtn?: React.ReactElement<any>;
  divider?: boolean;
  sx?: {};
};

export const Header = ({
  hideBtnLeft = false,
  title = "",
  subtitle = "",
  actionBtn,
  divider = false,
  sx,
}: IProps) => {
  const navigation = useNavigation();
  const handleBack = () => navigation.goBack();

  return (
    <View style={[styles.container, sx]}>
      <Stack direction="row">
        <TouchableOpacity onPress={handleBack}>
          <IconBackButton color={!hideBtnLeft ? black : "white"} />
        </TouchableOpacity>
        <Stack>
          <Text style={styles.title}>{title}</Text>
          {subtitle?.length > 0 && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </Stack>
        {actionBtn && actionBtn}
        {!actionBtn && <Icon name="arrow-back-ios" color="white" />}
      </Stack>
      {divider && <Divider color="#ddd" style={{ marginTop: 5 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 100000,
    backgroundColor: "white",
  },
  title: {
    fontSize: 16,
    color: black,
    marginRight: 10,
    fontWeight: "700",
  },
  subtitle: { marginTop: 1, color: grey0, fontSize: 15 },
  description: {
    color: grey0,
    fontSize: 15,
  },
});
