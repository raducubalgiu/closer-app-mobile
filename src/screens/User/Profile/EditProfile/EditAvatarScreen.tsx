import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";
import { Avatar } from "@rneui/themed";
import { Button, Stack } from "../../../../components/core";
import { useNavigation } from "@react-navigation/native";
import { CloseIconButton } from "../../../../components/customized";
import theme from "../../../../../assets/styles/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
const { black } = theme.lightColors || {};

const { width } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "EditAvatar">;

export const EditAvatarScreen = ({ route }: IProps) => {
  const { photo } = route.params;
  const navigation = useNavigation();

  const handleAvatar = async () => {};

  return (
    <SafeAreaView style={styles.screen}>
      <Stack direction="row" sx={{ padding: 15, width: "100%" }}>
        <CloseIconButton
          size={25}
          color={black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Decupeaza</Text>
        <View style={{ width: 20 }} />
      </Stack>
      <Avatar size={300} source={{ uri: photo.uri }} rounded />
      <Button
        title="Salveaza"
        size="lg"
        sxBtn={{ width: width - 30 }}
        onPress={handleAvatar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: black,
    marginRight: 10,
    fontWeight: "700",
  },
});
