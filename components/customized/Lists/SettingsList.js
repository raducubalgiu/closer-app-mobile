import { StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon } from "@rneui/themed";
import { useAuth } from "../../../hooks/auth";
import theme from "../../../assets/styles/theme";
import { MAIN_ROLE, SECOND_ROLE, THIRD_ROLE } from "@env";
import { Protected } from "../../core";
import { useTranslation } from "react-i18next";

export const SettingsList = ({ onCloseModal }) => {
  const navigation = useNavigation();
  const { user, setUser } = useAuth();
  const auth = getAuth();
  const { t } = useTranslation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const items = [
    {
      _id: "1",
      title: t("myBusiness"),
      iconName: "airplay",
      iconType: "feather",
      navigation: "MyBusiness",
      roles: [MAIN_ROLE, SECOND_ROLE],
    },
    {
      _id: "2",
      title: t("settings"),
      iconName: "setting",
      iconType: "antdesign",
      navigation: "Settings",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE],
    },
    {
      _id: "3",
      title: "Programarile tale",
      iconName: "bars",
      iconType: "antdesign",
      navigation: "Schedules",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE],
    },
    {
      _id: "4",
      title: "Discounturi",
      iconName: "gift",
      iconType: "antdesign",
      navigation: "Discounts",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE],
    },
    {
      _id: "5",
      title: "Raporteaza o problema",
      iconName: "exclamationcircleo",
      iconType: "antdesign",
      navigation: "Discounts",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE],
    },
    {
      _id: "6",
      title: "Distribuie profile",
      iconName: "sharealt",
      iconType: "antdesign",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE],
    },
    {
      _id: "7",
      title: t("logout"),
      iconName: "logout",
      iconType: "antdesign",
      roles: [MAIN_ROLE, SECOND_ROLE, THIRD_ROLE],
    },
  ];

  const handleNavigate = (item) => {
    if (item.navigation) {
      navigation.navigate(item?.navigation);
      onCloseModal();
    } else {
      handleLogout();
    }
  };

  const renderItem = ({ item }) => (
    <Protected userRole={user?.role} roles={item?.roles}>
      <ListItem
        onPress={() => handleNavigate(item)}
        containerStyle={{
          paddingLeft: 0,
          backgroundColor: theme.lightColors.white,
          borderBottomWidth: 0.5,
          borderBottomColor: "#ddd",
        }}
      >
        <Icon
          name={item?.iconName}
          type={item?.iconType}
          color={theme.lightColors.black}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.text}>{item?.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </Protected>
  );

  return (
    <BottomSheetFlatList
      data={items}
      contentContainerStyle={{ marginHorizontal: 20, marginTop: 10 }}
      keyExtractor={(item) => item?._id}
      renderItem={renderItem}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Exo-Medium",
    color: theme.lightColors.black,
    fontSize: 14.5,
    paddingVertical: 2.5,
  },
});
