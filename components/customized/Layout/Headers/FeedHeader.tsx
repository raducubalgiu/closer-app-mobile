import { StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import FakeSearchBarSimple from "../../FakeSearchBar/FakeSearchBarSimple";
import { Icon, Divider } from "@rneui/themed";
import { Stack } from "../../../core";
import theme from "../../../../assets/styles/theme";
import { FeedLabelButton } from "../../../core";
import { useNavigation } from "@react-navigation/native";

const FeedHeader = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <Stack direction="row" sx={{ marginHorizontal: 15 }}>
        <FakeSearchBarSimple onPress={() => {}} />
        <TouchableOpacity style={styles.bookmark}>
          <Icon
            name="bookmark-o"
            type="font-awesome"
            size={25}
            color={theme.lightColors.black}
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
            color={theme.lightColors.black}
            size={20}
          />
          <Text style={styles.exploreText}>Exploreaza</Text>
        </Stack>
        <Divider orientation="vertical" style={{ marginHorizontal: 10 }} />
        <FeedLabelButton
          isActive={props.state.activeAll}
          text="Toate"
          onPress={() => {
            props.dispatch({ type: "FETCH_ALL" });
            props.fetchAllPosts();
          }}
        />
        <FeedLabelButton
          isActive={props.state.activeFollowings}
          text="Urmaresti"
          onPress={() => {
            props.dispatch({ type: "FETCH_FOLLOWINGS" });
            props.fetchFollowings();
          }}
        />
        <FeedLabelButton
          isActive={props.state.activeLastMinute}
          text="Oferte Last Minute"
          onPress={() => {
            props.dispatch({ type: "FETCH_LAST_MINUTE" });
          }}
        />
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
    backgroundColor: "white",
  },
  bookmark: { padding: 5, marginLeft: 10 },
  explore: {
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingHorizontal: 12.5,
    backgroundColor: "#f1f1f1",
  },
  exploreText: {
    color: theme.lightColors.black,
    marginLeft: 5,
  },
});
