import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image, Avatar, Icon } from "react-native-elements";
import { Colors } from "../../../assets/styles/Colors";
import React from "react";
import Stack from "../../core/Containers/Stack";

const CardPost = (props) => {
  return (
    <View style={styles.container}>
      <Stack direction="row" sx={styles.cardHeader}>
        <Stack direction="row" sx={styles.avatarContainer}>
          <Avatar
            size={35}
            rounded
            source={{
              uri: `${props.avatar}`,
            }}
          />
          <Stack align="start">
            <Stack direction="row">
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.job}>{props.job}</Text>
            </Stack>
            <Text style={styles.date}>{props.date}</Text>
          </Stack>
        </Stack>
        <Stack direction="row">
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followBtnText}>Urmareste</Text>
          </TouchableOpacity>
          <Icon
            type="entypo"
            name="dots-three-horizontal"
            style={{ marginRight: 10 }}
            size={20}
          />
        </Stack>
      </Stack>
      <Image
        source={{
          uri: `${props.image}`,
        }}
        style={styles.image}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <Text style={styles.description}>{props.description}</Text>
      </View>
      <Stack direction="row" sx={styles.actionBtns}>
        <Text style={styles.likes}>{props.likes} aprecieri</Text>
        <Stack direction="row">
          <TouchableOpacity>
            <Icon
              type="feather"
              name="bookmark"
              style={{ marginRight: 25 }}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              type="antdesign"
              name="sharealt"
              style={{ marginRight: 25 }}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              type="antdesign"
              name="message1"
              style={{ marginRight: 25 }}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon type="antdesign" name="hearto" size={22} />
          </TouchableOpacity>
        </Stack>
      </Stack>
    </View>
  );
};

export default CardPost;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  cardHeader: {
    paddingVertical: 5,
  },
  avatarContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  name: { fontFamily: "Exo-SemiBold", marginLeft: 10 },
  job: {
    marginBottom: 5,
    marginLeft: 5,
    fontFamily: "Exo-SemiBold",
    color: Colors.primary,
  },
  date: { marginLeft: 10, color: Colors.textLight },
  followBtn: {
    marginRight: 15,
    backgroundColor: "#eee",
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  followBtnText: {
    color: Colors.textDark,
    fontFamily: "Exo-SemiBold",
    fontSize: 13,
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    height: 300,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  likes: { fontFamily: "Exo-SemiBold", color: Colors.textDark },
  description: { fontFamily: "Exo-Regular" },
  actionBtns: {
    paddingVertical: 17,
    paddingHorizontal: 15,
  },
});
