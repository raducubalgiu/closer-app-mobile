import { useWindowDimensions } from "react-native";
import { memo } from "react";
import { Image } from "@rneui/themed";
import PostGradient from "../../../Gradients/PostGradient";

type IProps = { uri: string };

const GridImage = ({ uri }: IProps) => {
  const { width } = useWindowDimensions();
  const IMAGE_WIDTH = width / 3;
  const IMAGE_HEIGHT = width / 2.25;

  return (
    <Image
      source={{ uri }}
      containerStyle={{
        width: undefined,
        height: undefined,
        flex: 1,
      }}
      transition={true}
      PlaceholderContent={
        <PostGradient width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
      }
    />
  );
};

export default memo(GridImage);
