import { StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { memo, useState } from "react";
import GridIcon from "./GridIcon";
import GridDiscount from "./GridDiscount";
import GridImage from "./GridImage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../../navigation/rootStackParams";
import { Post } from "../../../../../models";

type IProps = {
  index: number;
  post: any;
  expirationTime: string | null;
  discount: number;
  posts: Post[];
};

const GridImageListItem = ({
  index = 0,
  post,
  expirationTime,
  discount,
  posts,
}: IProps) => {
  const { postType, bookable, fixed, images } = post;
  const [opacity, setOpacity] = useState(1);
  const { width } = useWindowDimensions();
  const BOX_WIDTH = width / 3;
  const BOX_HEIGHT = width / 2.25;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const styles = StyleSheet.create({
    box: {
      width: BOX_WIDTH,
      height: BOX_HEIGHT,
      paddingBottom: 1.25,
      paddingLeft: index % 3 !== 0 ? 1.25 : 0,
    },
  });

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  return (
    <Pressable
      style={styles.box}
      onPress={() => {
        navigation.navigate("UserAllPosts", { post, posts, index });
        setOpacity(0);
      }}
    >
      <GridImage id={post.id} uri={post.images[0].url} opacity={opacity} />
      <GridIcon fixed={fixed} postType={postType} bookable={bookable} />
      {discount > 0 && (
        <GridDiscount discount={discount} expirationTime={expirationTime} />
      )}
    </Pressable>
  );
};

export default memo(GridImageListItem);
