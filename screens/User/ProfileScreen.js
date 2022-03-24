import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { Colors } from "../../assets/styles/Colors";
import HeaderSimple from "../../components/Headers/HeaderSimple";
import TabsProfile from "../../components/Tabs/TabsProfile/TabsProfile";
import TabViewProfile from "../../components/Tabs/TabsProfile/TabViewProfile";
import ProfileAvatarSection from "../../components/ProfileAvatarSection.tsx/ProfileAvatarSection";
import BottomSheetGeneral from "../../components/BottomSheets/BottomSheetGeneral";

const user = {
  _id: "1",
  name: "Raducu Balgiu",
  avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  job: "Stylist",
  followersCount: 0,
  followingCount: 0,
  ratingsCount: 0,
  products: [
    {
      _id: "1",
      name: "Tuns scurt",
      description: "Pachetul include spalat, aranjat",
      price: "50",
      options: [
        {
          name: "Barbati",
        },
      ],
    },
    {
      _id: "2",
      name: "Tuns lung",
      description: "Pachetul include spalat, aranjat",
      price: "70",
      options: [
        {
          name: "Barbati",
        },
      ],
    },
    {
      _id: "3",
      name: "Tuns chelie",
      description: "Pachetul include spalat, aranjat",
      price: "30",
      options: [
        {
          name: "Barbati",
        },
      ],
    },
  ],
};

const ProfileScreen = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <View style={styles.screen}>
        <HeaderSimple onPress={() => {}} />
        <ScrollView>
          <ProfileAvatarSection user={user} />
          <View>
            <TabsProfile index={index} onSetIndex={(e) => setIndex(e)} />
            <TabViewProfile
              index={index}
              onSetIndex={(e) => setIndex(e)}
              products={user.products}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
