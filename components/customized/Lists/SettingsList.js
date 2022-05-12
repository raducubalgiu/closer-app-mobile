import { StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon } from "@rneui/themed";
import { useAuth } from "../../../context/auth";
import theme from "../../../assets/styles/theme";

export const SettingsList = (props) => {
  const navigation = useNavigation();
  const { setUser } = useAuth();
  const auth = getAuth();

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
      title: "Panoul de bord",
      iconName: "airplay",
      iconType: "feather",
      navigation: "MyBusiness",
    },
    {
      _id: "2",
      title: "Setari",
      iconName: "setting",
      iconType: "antdesign",
      navigation: "Settings",
    },
    {
      _id: "3",
      title: "Programarile tale",
      iconName: "bars",
      iconType: "antdesign",
      navigation: "Schedules",
    },
    {
      _id: "4",
      title: "Discounturi",
      iconName: "gift",
      iconType: "antdesign",
      navigation: "Discounts",
    },
    {
      _id: "5",
      title: "Raporteaza o problema",
      iconName: "exclamationcircleo",
      iconType: "antdesign",
      navigation: "Discounts",
    },
    {
      _id: "6",
      title: "Distribuie profile",
      iconName: "sharealt",
      iconType: "antdesign",
    },
    {
      _id: "7",
      title: "Logout",
      iconName: "logout",
      iconType: "antdesign",
      action: handleLogout,
    },
  ];

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={
        item?.navigation
          ? () => navigation.navigate(item?.navigation)
          : item?.action
      }
      containerStyle={{
        paddingLeft: 0,
        backgroundColor: theme.lightColors.white,
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
  );

  return (
    <BottomSheetFlatList
      data={items}
      contentContainerStyle={{ marginHorizontal: 20 }}
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
  },
});
