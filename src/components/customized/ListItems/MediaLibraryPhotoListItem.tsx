import { StyleSheet, View, useWindowDimensions, Pressable } from "react-native";
import { Image } from "@rneui/themed";
import PostGradient from "../Gradients/PostGradient";
import { memo, useEffect, useState } from "react";
import theme from "../../../../assets/styles/theme";
import { showToast } from "../../../utils";

type IProps = {
  index: number;
  uri: string;
  onUpdateSelectedPhotos: (action: string, uri: string) => void;
  selectedPhotos: string[];
  selectMany: boolean;
};
const { primary } = theme.lightColors || {};

const MediaLibraryPhotoListItem = ({
  index,
  uri,
  onUpdateSelectedPhotos,
  selectedPhotos,
  selectMany,
}: IProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const { width } = useWindowDimensions();

  const onSelectPhoto = (uri: string) => {
    setIsSelected((isSelected) => !isSelected);
    onUpdateSelectedPhotos(isSelected ? "REMOVE" : "ADD", uri);
  };

  const styles = StyleSheet.create({
    container: {
      height: width / 3,
      width: width / 3,
      marginBottom: 1.25,
      marginLeft: index % 3 !== 0 ? 1.25 : 0,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: undefined,
      height: undefined,
    },
    select: {
      width: 22.5,
      height: 22.5,
      borderRadius: 50,
      borderWidth: 1.25,
      backgroundColor: isSelected ? primary : `rgba(240, 240, 240, 0.7)`,
      borderColor: isSelected ? "white" : primary,
      position: "absolute",
      top: 7.5,
      right: 7.5,
    },
  });

  return (
    <Pressable
      disabled={selectedPhotos.length > 9 && !isSelected}
      onPress={() => onSelectPhoto(uri)}
      style={styles.container}
    >
      <Image
        source={{ uri }}
        containerStyle={styles.image}
        resizeMode="cover"
        PlaceholderContent={
          <PostGradient width={width / 3} height={width / 3} />
        }
      />
      {selectMany && <View style={styles.select} />}
    </Pressable>
  );
};

export default memo(MediaLibraryPhotoListItem);
