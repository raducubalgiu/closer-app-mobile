import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { ResizeMode, Video } from "expo-av";

const { width } = Dimensions.get("window");

type IProps = {
  index: number;
  uri: string;
  bookable: boolean;
  onPress: () => void;
};

const GridVideoVLitemItem = ({ index = 0, uri, bookable, onPress }: IProps) => {
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
        shouldPlay={true}
        isMuted={true}
        isLooping={false}
        resizeMode={ResizeMode.COVER}
      />
      {bookable && (
        <View style={styles.bookable}>
          <Icon
            name="bolt"
            type="font-awesome-5"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
    </Pressable>
  );
};

export default memo(GridVideoVLitemItem);

const styles = StyleSheet.create({
  bookable: {
    position: "absolute",
    zIndex: 10000,
    top: 5,
    right: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  type: {
    position: "absolute",
    zIndex: 10000,
    bottom: 5,
    left: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
