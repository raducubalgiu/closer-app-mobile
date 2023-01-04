import { StyleSheet, Dimensions, View, Text } from "react-native";
import { memo } from "react";
import { Icon } from "@rneui/themed";
import { ResizeMode, Video } from "expo-av";
import { Stack } from "../../../core";

const { width } = Dimensions.get("window");

type IProps = { uri: string; avatar: any };

const PostVideoOverviewListItem = ({ uri, avatar }: IProps) => {
  return (
    <View>
      <Video
        style={{
          width: width / 3,
          height: width / 1.75,
          marginRight: 6,
          borderRadius: 5,
          backgroundColor: "#f1f1f1",
        }}
        source={{ uri }}
        useNativeControls={false}
        //onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay={true}
        isMuted={true}
        isLooping={true}
        resizeMode={ResizeMode.COVER}
      />
      {/* <Stack direction="row" sx={{ position: "absolute", bottom: 5, left: 5 }}>
        <Icon name="play" type="feather" size={15} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 13.5,
            marginLeft: 5,
            fontWeight: "500",
          }}
        >
          1k
        </Text>
      </Stack> */}
    </View>
  );
};

export default memo(PostVideoOverviewListItem);

const styles = StyleSheet.create({});
