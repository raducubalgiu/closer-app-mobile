import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Stack, IconButton } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const { black, grey0, success } = theme.lightColors || {};

type IProps = {
  name: string;
  status: string;
  onSetUserRegion: () => void;
};

export const HeaderMap = ({ name, status, onSetUserRegion }: IProps) => {
  const navigation = useNavigation();

  return (
    <Stack direction="row" justify="between" sx={styles.container}>
      <IconButton
        sx={styles.btn}
        name="chevron-back"
        type="ionicon"
        onPress={() => navigation.goBack()}
      />
      {/* <Stack
        direction="row"
        sx={{
          ...styles.btn,
          paddingHorizontal: 20,
          paddingVertical: 12.5,
          borderRadius: 20,
        }}
        align="center"
      >
        <View
          style={{
            ...styles.bullet,
            marginLeft: 0,
            backgroundColor: "white",
          }}
        />
        <Stack align="start" sx={{ width: 160 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>{status}</Text>
        </Stack>
        <View style={styles.bullet} />
      </Stack> */}
      <IconButton sx={styles.btn} name="navigation" onPress={onSetUserRegion} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    width: width - 30,
  },
  name: {
    marginBottom: 2.5,
    color: black,
    fontWeight: "700",
    fontSize: 14.5,
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    borderColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  status: {
    fontSize: 13.5,
    color: grey0,
    fontWeight: "500",
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: success,
  },
});
