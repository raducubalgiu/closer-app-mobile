import { StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { memo } from "react";
import GridImage from "./GridImage";
import GridIcon from "./GridIcon";
import GridDiscount from "./GridDiscount";

type IProps = {
  index: number;
  onPress: () => void;
  item: any;
  expirationTime: string | null;
  discount: number;
};

const GridImageListItem = ({
  index = 0,
  onPress,
  item,
  expirationTime,
  discount,
}: IProps) => {
  const { postType, bookable, fixed, images } = item;
  const { width } = useWindowDimensions();
  const BOX_WIDTH = width / 3;
  const BOX_HEIGHT = width / 2.25;

  const imageBox = StyleSheet.create({
    box: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      paddingBottom: 1.25,
      paddingLeft: index % 3 !== 0 ? 1.25 : 0,
    },
  });

  return (
    <Pressable style={imageBox.box} onPress={onPress}>
      <GridImage uri={images[0]?.url} />
      <GridIcon fixed={fixed} postType={postType} bookable={bookable} />
      {discount > 0 && (
        <GridDiscount discount={discount} expirationTime={expirationTime} />
      )}
    </Pressable>
  );
};

export default memo(GridImageListItem);
