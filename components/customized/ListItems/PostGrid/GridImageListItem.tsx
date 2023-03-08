import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { memo } from "react";
import { Icon, Image } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import PostGradient from "../../Gradients/PostGradient";

const { black } = theme.lightColors || {};

type IProps = {
  index: number;
  onPress: () => void;
  item: any;
};

const GridImageListItem = ({ index = 0, onPress, item }: IProps) => {
  const { postType, bookable, fixed } = item;

  const { width } = useWindowDimensions();

  const imageBox = StyleSheet.create({
    box: {
      width: width / 3,
      height: width / 2.25,
      paddingBottom: 1.25,
      paddingLeft: index % 3 !== 0 ? 1.25 : 0,
    },
  });

  return (
    <Pressable style={imageBox.box} onPress={onPress}>
      <Image
        source={{ uri: item.images[0].url }}
        containerStyle={{ width: undefined, height: undefined, flex: 1 }}
        transition={true}
        PlaceholderContent={
          <PostGradient width={width / 3} height={width / 2.25} />
        }
      />
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

export default memo(GridImageListItem);

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
