import { Pressable, SafeAreaView, StyleSheet, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { Icon } from "@rneui/themed";
import { Audio } from "expo-av";
import { Header, Stack } from "../components/core";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigation/rootStackParams";
import CustomAvatar from "../components/core/Avatars/CustomAvatar";
import { BookmarkButton } from "../components/customized";
import theme from "../../assets/styles/theme";

type IProps = NativeStackScreenProps<RootStackParams, "Sound">;
const { black } = theme.lightColors || {};

export const SoundScreen = ({ route }: IProps) => {
  const { soundUri, avatar } = route.params;
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = new Audio.Sound();

  const handlePlay = async () => {
    const status = await sound.getStatusAsync();

    if (!status.isLoaded) {
      await sound.loadAsync({ uri: soundUri }, { isLooping: true });
      await sound.playAsync();
    } else {
      await sound
        .unloadAsync()
        .then(() => setIsPlaying(false))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="" />
      <Stack align="start" sx={{ margin: 15 }}>
        <Stack direction="row">
          <Image
            source={{ uri: avatar }}
            style={{ width: 100, height: 100, borderRadius: 2.5 }}
          />
        </Stack>
        <Stack direction="row" sx={{ marginTop: 15 }}>
          <Pressable
            style={{ ...styles.button, marginRight: 10 }}
            onPress={handlePlay}
          >
            <Stack direction="row" justify="center">
              <Icon
                name={isPlaying ? "pause" : "play"}
                type="feather"
                color={black}
                size={17.5}
              />
              <Text style={styles.buttonText}>
                {isPlaying ? "Intrerupe" : "Previzualizeaza"}
              </Text>
            </Stack>
          </Pressable>
          <BookmarkButton type="sounds" typeId="" />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 12.5,
    borderRadius: 2.5,
    flex: 1,
  },
  buttonText: { color: black, fontWeight: "600", marginLeft: 10 },
});
