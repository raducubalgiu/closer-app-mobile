import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Stack, IconButton, Checkmark } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { RootStackParams } from "../../../../models/navigation/rootStackParams";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../../../hooks";
import { showToast } from "../../../../utils";
import { useTranslation } from "react-i18next";

const { black } = theme.lightColors || {};

type IProps = {
  username: string;
  checkmark: boolean;
  onGoToFindFriends: () => void;
  onOpenSettings: () => void;
};

export const HeaderProfile = ({
  username,
  checkmark,
  onGoToFindFriends,
  onOpenSettings,
}: IProps) => {
  const { setUser } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const auth = getAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(() => showToast({ message: t("somethingWentWrong") }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", zIndex: 1000 }}>
      <Stack direction="row" sx={styles.container}>
        <Stack direction="row">
          <IconButton
            onPress={handleLogout}
            name="adduser"
            type="antdesign"
            size={27}
          />
          <Icon
            style={{ marginLeft: 15 }}
            size={30}
            type="ionicon"
            name="add-circle-outline"
            color="white"
          />
        </Stack>
        <Stack direction="row">
          <Text style={styles.name}>@{username}</Text>
          {checkmark && <Checkmark sx={{ marginLeft: 5 }} />}
        </Stack>
        <Stack direction="row">
          <IconButton
            onPress={() => navigation.navigate("AddPost")}
            size={30}
            name="add-circle-outline"
            type="ionicon"
            color={black}
          />
          <IconButton
            onPress={onOpenSettings}
            size={30}
            name="menu-outline"
            type="ionicon"
            color={black}
            sx={{ marginLeft: 15 }}
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  name: { fontSize: 15.5, color: black, fontWeight: "600" },
});
