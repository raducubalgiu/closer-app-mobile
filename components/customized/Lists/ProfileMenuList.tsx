import { ListRenderItemInfo, StyleSheet, Text } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import { MAIN_ROLE, SECOND_ROLE, SUPERADMIN_ROLE, THIRD_ROLE } from "@env";
import { Protected, ListItem } from "../../core";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../models/navigation/rootStackParams";
import { showToast } from "../../../utils";

const { black } = theme.lightColors || {};

type IProps = { onCloseSheet: () => void };
type Item = {
  id: string;
  title: string;
  iconName: string;
  iconType: string;
  navigation?: any;
  roles: string[];
};

export const ProfileMenuList = ({ onCloseSheet }: IProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, setUser } = useAuth();
  const auth = getAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(() => showToast({ message: t("somethingWentWrong") }));
  };

  const items = [
    {
      id: "1",
      title: t("myBusiness"),
      iconName: "airplay",
      iconType: "feather",
      navigation: "MyBusiness",
      roles: [MAIN_ROLE, SECOND_ROLE],
    },
    {
      id: "2",
      title: t("settingsAndPrivacy"),
      iconName: "settings",
      iconType: "feather",
      navigation: "Settings",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE],
    },
    {
      id: "6",
      title: t("shareProfile"),
      iconName: "share-2",
      iconType: "feather",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE],
    },
    // {
    //   id: "4",
    //   title: t("discounts"),
    //   iconName: "gift",
    //   iconType: "feather",
    //   navigation: "Discounts",
    //   roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE],
    // },
    // {
    //   id: "5",
    //   title: t("reportAProblem"),
    //   iconName: "info",
    //   iconType: "feather",
    //   navigation: "Discounts",
    //   roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE],
    // },
    // {
    //   id: "7",
    //   title: t("logout"),
    //   iconName: "log-out",
    //   iconType: "feather",
    //   roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE, SUPERADMIN_ROLE],
    // },
  ];

  const handleNavigate = (item: Item) => {
    if (item.navigation) {
      navigation.navigate(item?.navigation);
      onCloseSheet();
    } else {
      handleLogout();
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <Protected userRole={user?.role} roles={item?.roles}>
      <ListItem onPress={() => handleNavigate(item)} sx={styles.listItem}>
        <Icon
          name={item?.iconName}
          type={item?.iconType}
          color={black}
          size={22.5}
        />
        <Text style={styles.text}>{item?.title}</Text>
      </ListItem>
    </Protected>
  );

  return (
    <BottomSheetFlatList
      data={items}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => item?.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: 17.5, marginTop: 10, flex: 1 },
  listItem: {
    paddingLeft: 0,
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 12.5,
  },
  text: {
    color: black,
    paddingVertical: 2.5,
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 14,
  },
});
