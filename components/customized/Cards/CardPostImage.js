import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import React from "react";
import { Image, Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { width, height } = Dimensions.get("window");

export const CardPostImage = ({
  index,
  image,
  bookable,
  fixed,
  postType,
  onPress,
}) => {
  let borderBox;

  if (index % 3 !== 0) {
    borderBox = { paddingLeft: 1.25 };
  } else {
    borderBox = { paddingLeft: 0 };
  }

  const imageBox = StyleSheet.create({
    box: {
      width: width / 3,
      height: width / 3,
      marginBottom: 1.25,
      backgroundColor: "#f1f1f1",
    },
  });

  return (
    <Pressable style={{ ...imageBox.box, ...borderBox }} onPress={onPress}>
      <Image source={{ uri: `${image}` }} containerStyle={styles.image} />
      {bookable && (
        <View style={styles.bookable}>
          <Icon
            name="shopping"
            type="material-community"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
      {fixed && (
        <View style={styles.fixed}>
          <Text style={styles.fixedText}>Fixat</Text>
        </View>
      )}
      {fixed && postType === "video" && (
        <View style={styles.type}>
          <Icon
            name="video"
            type="feather"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  bookable: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
  },
  fixed: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    backgroundColor: "white",
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  fixedText: {
    fontSize: 12,
    color: theme.lightColors.black,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
  },
});
