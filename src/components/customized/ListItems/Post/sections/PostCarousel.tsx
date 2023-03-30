import { StyleSheet, Dimensions, View, Text } from "react-native";
import { memo, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "@rneui/themed";
import PostGradient from "../../../Gradients/PostGradient";

type IProps = { images: any };
const { width } = Dimensions.get("window");

const PostCarousel = ({ images }: IProps) => {
  const renderImage = useCallback(({ item, index }: any) => {
    return (
      <View style={{ width, height: 500 }}>
        <Image
          source={{ uri: item.url }}
          containerStyle={styles.image}
          resizeMode="cover"
          PlaceholderContent={<PostGradient width={width} height={400} />}
        />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: any) => item.url, []);

  return (
    <View style={{ height: 500 }}>
      <FlashList
        horizontal
        data={images}
        keyExtractor={keyExtractor}
        renderItem={renderImage}
        estimatedItemSize={500}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
    </View>
  );
};

export default memo(PostCarousel);

const styles = StyleSheet.create({
  image: {
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
  },
});
