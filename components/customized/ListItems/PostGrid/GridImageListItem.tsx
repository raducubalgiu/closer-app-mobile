import { StyleSheet, Dimensions, View, Text, Pressable } from "react-native";
import { memo } from "react";
import { Icon, Image } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import PostGradient from "../../Gradients/PostGradient";

const { width } = Dimensions.get("window");
const { black } = theme.lightColors || {};

type IProps = {
  index: number;
  uri: string;
  bookable?: boolean;
  orientation: string;
  fixed?: boolean | null;
  postType?: string | null;
  onPress: () => void;
};

const GridImageListItem = ({
  index = 0,
  uri,
  bookable = false,
  fixed = false,
  postType = "photo",
  orientation,
  onPress,
}: IProps) => {
  const PORTRAIT_WIDTH = width / 2;
  const SQUARE_WIDTH = width / 3;

  const imageBox = StyleSheet.create({
    box: {
      width: SQUARE_WIDTH,
      height: orientation === "portrait" ? PORTRAIT_WIDTH : SQUARE_WIDTH,
      paddingBottom: 1.25,
      paddingLeft: index % 3 !== 0 ? 1.25 : 0,
    },
  });

  return (
    <Pressable style={imageBox.box} onPress={onPress}>
      <Image
        source={{ uri }}
        containerStyle={{ width: undefined, height: undefined, flex: 1 }}
        transition={true}
        PlaceholderContent={
          <PostGradient width={width / 3} height={width / 3} />
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
