import {
  StyleSheet,
  Pressable,
  View,
  useWindowDimensions,
  Text,
} from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Post } from "../../../../../models";
import GridVideo from "./GridVideo";

type IProps = {
  index: number;
  post: Post;
  onPress: () => void;
};

const GridVideoLitemItem = ({ index = 0, post, onPress }: IProps) => {
  const { postType, bookable, fixed, images, viewsCount } = post;
  const { width } = useWindowDimensions();
  const BOX_WIDTH = width / 3;
  const BOX_HEIGHT = width / 1.75;

  const videoBox = StyleSheet.create({
    box: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      paddingBottom: 1.25,
      paddingLeft: index % 3 !== 0 ? 1.25 : 0,
    },
  });

  return (
    <Pressable style={videoBox.box} onPress={onPress}>
      <LinearGradient
        colors={["#f1f1f1", "#d9d9d9"]}
        start={{ x: 1, y: 0.4 }}
        end={{ x: 1, y: 0.9 }}
        style={videoBox.box}
      >
        <GridVideo uri={images[0]?.url} />
        <View style={styles.bookable}>
          <Icon
            name="shopping"
            type="material-community"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
        <View style={styles.views}>
          <Icon
            name="play"
            type="feather"
            color="white"
            size={15}
            style={{ marginLeft: 5 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 12,
              marginLeft: 2.5,
              fontWeight: "500",
            }}
          >
            {viewsCount}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default memo(GridVideoLitemItem);

const styles = StyleSheet.create({
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
  views: {
    position: "absolute",
    zIndex: 10000,
    bottom: 7.5,
    left: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
});
