import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import NotificationFollow from "../../ListItems/NotificationFollow";

const DUMMY_NOTIFICATIONS = [
  {
    _id: "1",
    user: "Raducu Balgiu",
    avatar: [
      {
        url: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FPNKdnbHo-wAX8diWR9&_nc_ht=scontent.fotp3-1.fna&oh=00_AT8CD3iIe6kTwD0LfuSOO46qWvEuaZxv3W6wVistXRMlvg&oe=6282677F",
      },
    ],
    notification: "a inceput sa te urmareasca",
    action: "follow",
    checkmark: false,
    date: "1s",
  },
  {
    _id: "2",
    user: "Cristiano Ronaldo",
    avatar: [
      {
        url: "https://scontent.fotp3-2.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YJJVBYuB8A4AX89I8uz&tn=2wrnkfWHcUGVFPFJ&_nc_ht=scontent.fotp3-2.fna&oh=00_AT8vPpUCz9Ijy8bRrO5igA__XsoJPmw_EBz1Tyaub-rwRw&oe=62819700",
      },
    ],
    notification: "a inceput sa te urmareasca",
    action: "follow",
    checkmark: true,
    date: "1s",
  },
];

const NotificationsTab = () => {
  return (
    <View style={styles.screen}>
      <FlatList
        data={DUMMY_NOTIFICATIONS}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <NotificationFollow
            name={item?.user}
            notification={item?.notification}
            avatar={item?.avatar[0]?.url}
            date={item?.date}
            checkmark={item?.checkmark}
            followingId={item?._id}
          />
        )}
      />
    </View>
  );
};

export default NotificationsTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
