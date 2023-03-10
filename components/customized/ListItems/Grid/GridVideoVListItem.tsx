import { StyleSheet, Dimensions, Pressable, View } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

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
    <Pressable style={borderBox} onPress={onPress}>
      <LinearGradient
        colors={["#f1f1f1", "#d9d9d9"]}
        start={{ x: 1, y: 0.4 }}
        end={{ x: 1, y: 0.9 }}
        style={imageBox.box}
      >
        <Video
          style={{
            width: undefined,
            height: undefined,
            flex: 1,
          }}
          source={{ uri }}
          useNativeControls={false}
          shouldPlay={true}
          isMuted={true}
          isLooping={true}
          resizeMode={ResizeMode.COVER}
        />
        <View style={styles.bookable}>
          <Icon
            name="shopping"
            type="material-community"
            color="white"
            size={20}
            style={{ marginLeft: 5 }}
          />
        </View>
      </LinearGradient>
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
});
