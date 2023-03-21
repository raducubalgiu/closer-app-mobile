import { StyleSheet, useWindowDimensions, View, Text } from "react-native";
import { Stack } from "../../../core";
import { Icon, Image } from "@rneui/themed";
import { memo } from "react";
import PostGradient from "../../Gradients/PostGradient";
import { SharedElement } from "react-navigation-shared-element";
import theme from "../../../../../assets/styles/theme";

type IProps = { uri: string; id: string };
const { error, secondary } = theme.lightColors || {};

const PostImage = ({ uri, id }: IProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, height: 500 }}>
      <SharedElement id={id} style={{ flex: 1 }}>
        <Image
          source={{ uri }}
          containerStyle={styles.image}
          resizeMode="cover"
          PlaceholderContent={<PostGradient width={width} height={400} />}
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
