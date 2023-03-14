import { StyleSheet, Text, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Stack, IconButton } from "../../../core";
import theme from "../../../../../assets/styles/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";

const { black, grey0 } = theme.lightColors || {};

type IProps = { search: string };

export const HeaderSearchAll = ({ search }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Stack direction="row" justify="start" sx={styles.container}>
      <IconButton
        name="arrow-back-ios"
        type="material"
        size={21}
        onPress={() => navigation.navigate("SearchPosts", { search })}
        sx={{ padding: 5 }}
      />
      <Pressable
        style={styles.fakeSearchbar}
        onPress={() => navigation.goBack()}
      >
        <Stack direction="row">
          <Stack direction="row">
            <Icon name="search" type="ionicon" color={black} size={20} />
            <Text style={styles.text}>{search}</Text>
          </Stack>
          <Icon name="closecircle" type="antdesign" size={16} color="#bbb" />
        </Stack>
      </Pressable>
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, height: 60 },
  fakeSearchbar: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 2.5,
  },
  text: {
    fontSize: 15,
    color: grey0,
    marginLeft: 7.5,
  },
});
