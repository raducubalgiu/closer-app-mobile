import { StyleSheet, Dimensions, Pressable } from "react-native";
import { ResizeMode, Video } from "expo-av";

const { width } = Dimensions.get("window");

type IProps = {
  index: number;
  uri: string;
  onPress: () => void;
};

export const GridVideoVLitemItem = ({ index = 0, uri, onPress }: IProps) => {
  let borderBox;

  if (index % 3 !== 0) {
    borderBox = { paddingLeft: 1.25 };
  } else {
    borderBox = { paddingLeft: 0 };
  }

  const imageBox = StyleSheet.create({
    box: {
      width: width / 3,
      height: width / 2,
      paddingBottom: 1.25,
    },
  });

  return (
    <Pressable style={{ ...imageBox.box, ...borderBox }} onPress={onPress}>
      <Video
        style={{
          width: undefined,
          height: undefined,
          flex: 1,
          backgroundColor: "#f1f1f1",
        }}
        source={{ uri }}
        useNativeControls={false}
        shouldPlay={false}
        isMuted={true}
        isLooping={false}
        resizeMode={ResizeMode.COVER}
      />
    </Pressable>
  );
};
