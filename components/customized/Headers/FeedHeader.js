import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import FakeSearchBarSimple from "../FakeSearchBar/FakeSearchBarSimple";
import { Icon, Divider } from "react-native-elements";
import { Stack } from "../../core";
import { Colors } from "../../../assets/styles/Colors";
import FeedLabelButton from "../Buttons/FeedLabelButton";
import { useNavigation } from "@react-navigation/native";

const FeedHeader = () => {
  const navigation = useNavigation();

  return (
    <>
      <Stack
        direction="row"
        sx={{
          marginHorizontal: 15,
        }}
      >
        <FakeSearchBarSimple onPress={() => {}} />
        <TouchableOpacity
          style={{ padding: 5, marginLeft: 10 }}
          onPress={() => navigation.navigate("Saved")}
        >
          <Icon
            name="bookmark-o"
            type="font-awesome"
            size={25}
            color={Colors.textDark}
          />
        </TouchableOpacity>
      </Stack>
      <Divider style={{ marginTop: 10 }} />
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        <Stack direction="row" sx={styles.explore}>
          <Icon
            name="find"
            type="antdesign"
            color={Colors.textDark}
            size={20}
          />
          <Text style={styles.exploreText}>Exploreaza</Text>
        </Stack>
        <Divider orientation="vertical" style={{ marginHorizontal: 10 }} />
        <FeedLabelButton isActive={true} text="Toate" />
        <FeedLabelButton isActive={false} text="Urmaresti" />
        <FeedLabelButton isActive={false} text="Oferte Last Minute" />
      </ScrollView>
      <Divider />
    </>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 7.5,
    marginHorizontal: 15,
  },
  explore: {
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
  },
  exploreText: {
    fontFamily: "Exo-Medium",
    color: Colors.textDark,
    marginLeft: 5,
  },
});
