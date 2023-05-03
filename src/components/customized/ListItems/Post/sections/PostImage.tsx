import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Image } from "@rneui/themed";
import { memo } from "react";
import PostGradient from "../../../Gradients/PostGradient";
import { SharedElement } from "react-navigation-shared-element";

type IProps = { uri: string; id: string };

const PostImage = ({ uri, id }: IProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, height: 500 }}>
      <SharedElement id={id} style={{ flex: 1 }}>
        <Image
          source={{ uri }}
          containerStyle={styles.image}
          resizeMode="cover"
          PlaceholderContent={<PostGradient width={width} height={500} />}
        />
      </SharedElement>
    </View>
  );
};

export default memo(PostImage);

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
  },
});
