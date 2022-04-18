import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { Stack } from "../../../core";
import FakeSearchBarSimple from "../../FakeSearchBar/FakeSearchBarSimple";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import MessageItem from "../../ListItems/MessageItem";

const DUMMY_MESSAGES = [
  {
    _id: "7",
    user: "Cristiano Ronaldo",
    avatar: [
      {
        url: "https://scontent.fotp3-2.fna.fbcdn.net/v/t1.6435-9/190108336_322648402555040_2100790391455013605_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YJJVBYuB8A4AX89I8uz&tn=2wrnkfWHcUGVFPFJ&_nc_ht=scontent.fotp3-2.fna&oh=00_AT8vPpUCz9Ijy8bRrO5igA__XsoJPmw_EBz1Tyaub-rwRw&oe=62819700",
      },
    ],
    lastMessage: "hey buddy, i just looking for..",
    checkmark: true,
  },
  {
    _id: "1",
    user: "Raducu Balgiu",
    avatar: [
      {
        url: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/71498148_2594599870570594_298053640667529216_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FPNKdnbHo-wAX8diWR9&_nc_ht=scontent.fotp3-1.fna&oh=00_AT8CD3iIe6kTwD0LfuSOO46qWvEuaZxv3W6wVistXRMlvg&oe=6282677F",
      },
    ],
    lastMessage: "Am fost acasa la mama..",
    checkmark: false,
  },
  {
    _id: "2",
    user: "Oprea Laurentiu",
    avatar: [
      {
        url: "https://scontent.fotp3-1.fna.fbcdn.net/v/t39.30808-6/277119871_5184777008219619_7984067483386815490_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Pbj7PyoWIgIAX-law_e&_nc_ht=scontent.fotp3-1.fna&oh=00_AT8zrA4Cm-34ZOJyP_-tAWE0wdbIovLcX7DqNdaucuxDmA&oe=62636B8B",
      },
    ],
    lastMessage: "Da, a fost foarte misto meciul..",
    checkmark: false,
  },
  {
    _id: "3",
    user: "Mihai Gindac",
    avatar: [
      {
        url: "https://scontent.fotp3-1.fna.fbcdn.net/v/t39.30808-6/274156129_5262864287079875_7209862326088554118_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=EkiJVU0zOA4AX9kQKx4&_nc_ht=scontent.fotp3-1.fna&oh=00_AT_CtiL5A4TxROOAOqxiy2MAMnkxbTwrCIJf5sxC0WO-fw&oe=6262BE87",
      },
    ],
    lastMessage: "Ai vazut cat de mult a crescut...",
    checkmark: false,
  },
  {
    _id: "4",
    user: "georgianaandreea27",
    //avatar: [{ url: "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg" }],
    lastMessage: "da iubi, te astept acasa",
    checkmark: false,
  },
  {
    _id: "5",
    user: "Romina Andreea",
    avatar: [
      {
        url: "https://scontent.fotp3-3.fna.fbcdn.net/v/t1.6435-9/100924623_3061871610555218_7764548019235586048_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=kPRGiKpa_IcAX-Kil6x&_nc_ht=scontent.fotp3-3.fna&oh=00_AT9SF0kR84RBylsVr5zTrv9xlLyScyZbXRa_tik-ghgZXg&oe=6281EF74",
      },
    ],
    lastMessage: "hey buddy, i just looking for..",
    checkmark: false,
  },
  {
    _id: "6",
    user: "Clipcea Daniel",
    avatar: [
      {
        url: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/118698168_3381945361864874_77731135614597547_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=S850s8SqTTMAX85jpKG&_nc_ht=scontent.fotp3-1.fna&oh=00_AT_asWZz5pqqa9o28h29j1L2ztiawhYXKYq8ILc_3eLykQ&oe=628376C7",
      },
    ],
    lastMessage: "hey buddy, i just looking for..",
    checkmark: false,
  },
  {
    _id: "8",
    user: "Marin Valentin",
    avatar: [
      {
        url: "https://scontent.fotp3-1.fna.fbcdn.net/v/t1.6435-9/100985370_1139836413027751_7274777024273580032_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=QP_md1DgF3AAX_M6IWm&_nc_ht=scontent.fotp3-1.fna&oh=00_AT--kHfLjkyqkBhK6FfiDXmEQ0fH7Mi8ExARBsCx7dlTlQ&oe=6282B807",
      },
    ],
    lastMessage: "hey buddy, i just looking for..",
    checkmark: false,
  },
  {
    _id: "9",
    user: "the_best_Stylist",
    //avatar: [{ url: "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg" }],
    lastMessage: "hey buddy, i just looking for..",
    checkmark: false,
  },
];

const MessagesTab = () => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Stack
        direction="row"
        sx={{
          paddingTop: 5,
          paddingBottom: 10,
        }}
      >
        <FakeSearchBarSimple />
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Icon name="edit" type="feather" />
        </TouchableOpacity>
      </Stack>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={DUMMY_MESSAGES}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <MessageItem
            user={item?.user}
            avatar={
              item?.avatar !== undefined ? item?.avatar[0]?.url : undefined
            }
            checkmark={item?.checkmark}
            message={item?.lastMessage}
            date={"15s"}
          />
        )}
      />
    </View>
  );
};

export default MessagesTab;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
});
