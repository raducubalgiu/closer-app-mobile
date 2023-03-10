import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Image } from "@rneui/themed";
import { memo } from "react";
import PostGradient from "../../Gradients/PostGradient";

type IProps = { uri: string; orientation: string };

const PostImage = ({ uri, orientation }: IProps) => {
  const { width } = useWindowDimensions();

  let height;

  switch (orientation) {
    case "portrait":
      height = 400;
      break;
    case "square":
      height = 300;
      break;
    default:
      height = 300;
  }

  return (
    <View style={{ width, height }}>
      <Image
        source={{ uri }}
        containerStyle={styles.image}
        resizeMode="cover"
        transition={true}
        PlaceholderContent={<PostGradient width={width} height={400} />}
      />
    </View>
  );
};

export default memo(PostImage);

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});
