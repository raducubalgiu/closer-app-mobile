import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import React from "react";
import { Image, Icon } from "@rneui/themed";
import theme from "../../../assets/styles/theme";

const { width, height } = Dimensions.get("window");
const { black } = theme.lightColors || {};

type IProps = {
  index: number;
  image: string;
  bookable?: boolean;
  fixed?: boolean | null;
  postType?: string | null;
  onPress: () => void;
  col?: number;
};

export const CardPostImage = ({
  index = 0,
  image,
  bookable = false,
  fixed = false,
  postType = "photo",
  onPress,
  col = 3,
}: IProps) => {
  let borderBox;

  if (index % col !== 0) {
    borderBox = { paddingLeft: 1.25 };
  } else {
    borderBox = { paddingLeft: 0 };
  }

  const imageBox = StyleSheet.create({
    box: {
      width: width / col,
      height: width / col,
      paddingBottom: 1.25,
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
    backgroundColor: "#f1f1f1",
  },
  bookable: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fixed: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    backgroundColor: "white",
    opacity: 0.8,
    paddingHorizontal: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fixedText: {
    fontSize: 12,
    color: black,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
