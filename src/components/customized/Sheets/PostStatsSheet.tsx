import { StyleSheet, Text, View } from "react-native";
import { Divider, Icon, Image } from "@rneui/themed";
import { memo } from "react";
import { Stack } from "../../core";
import theme from "../../../../assets/styles/theme";
import { HeaderSheet } from "../Layout/Headers/HeaderSheet";
import { ResizeMode, Video } from "expo-av";

const { black } = theme.lightColors || {};

type IProps = {
  images: any;
  onClose: () => void;
  counters: {
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    bookmarksCount: number;
  };
  postType: string;
};
type StatsProps = { counter: string; icon: string };

const StatsItem = ({ counter, icon }: StatsProps) => {
  return (
    <Stack>
      <Icon name={icon} type="feather" color="#ccc" />
      <Text style={styles.counter}>{counter}</Text>
    </Stack>
  );
};

const PostStatsSheet = ({ images, onClose, counters, postType }: IProps) => {
  const { viewsCount, likesCount, commentsCount, bookmarksCount } = counters;
  const imagesLength = images?.length;

  let icon;
  switch (true) {
    case imagesLength > 1:
      icon = (
        <View style={styles.iconContainer}>
          <Icon
            name="checkbox-multiple-blank"
            type="material-community"
            color="white"
            size={20}
          />
        </View>
      );
      break;
    case postType === "video":
      icon = (
        <View style={styles.iconContainer}>
          <Icon
            name="play-box-multiple"
            type="material-community"
            color="white"
            size={17}
          />
        </View>
      );
      break;
    default:
      icon = <></>;
  }

  const isPhoto = postType === "photo" || postType === "carousel";

  return (
    <View style={styles.container}>
      <HeaderSheet title="Statistici" onClose={onClose} />
      <Stack>
        <View style={styles.imageContainer}>
          {isPhoto ? (
            <Image
              source={{ uri: images[0]?.url }}
              containerStyle={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Video
              source={{ uri: images[0]?.url }}
              style={styles.image}
              resizeMode={ResizeMode.COVER}
              shouldPlay={false}
              isMuted={true}
            />
          )}
          {icon}
        </View>
      </Stack>
      <Divider color="#ddd" />
      <Stack direction="row" justify="around" sx={styles.statsContainer}>
        <StatsItem icon={isPhoto ? "eye" : "play"} counter={`${viewsCount}`} />
        <StatsItem icon="heart" counter={`${likesCount}`} />
        <StatsItem icon="message-circle" counter={`${commentsCount}`} />
        <StatsItem icon="bookmark" counter={`${bookmarksCount}`} />
      </Stack>
    </View>
  );
};

export default memo(PostStatsSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: 120,
    height: 150,
    marginVertical: 15,
    borderRadius: 2.5,
    backgroundColor: "#f1f1f1",
  },
  image: {
    width: undefined,
    height: undefined,
    borderRadius: 2.5,
    ...StyleSheet.absoluteFillObject,
  },
  iconContainer: { position: "absolute", top: 7.5, right: 7.5 },
  statsContainer: { marginHorizontal: 15, marginTop: 25 },
  counter: { marginTop: 10, fontWeight: "600", color: black },
});
