import { StyleSheet, useWindowDimensions } from "react-native";
import { memo } from "react";
import { Image } from "@rneui/themed";
import PostGradient from "../../../Gradients/PostGradient";
import { SharedElement } from "react-navigation-shared-element";

type IProps = { uri: string; id: string; opacity: number };

const GridImage = ({ uri, id, opacity }: IProps) => {
  const { width } = useWindowDimensions();
  const IMAGE_WIDTH = width / 3;
  const IMAGE_HEIGHT = width / 2.25;

  return (
    <SharedElement id={id} style={{ flex: 1 }}>
      <Image
        source={{ uri }}
        containerStyle={{
          ...StyleSheet.absoluteFillObject,
          width: undefined,
          height: undefined,
          opacity,
        }}
        transition={true}
        PlaceholderContent={
          <PostGradient width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
        }
      />
    </SharedElement>
  );
};

export default memo(GridImage);
