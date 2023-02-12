import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { Audio } from "expo-av";
import { Header } from "../components/core";
import { useNavigation } from "@react-navigation/native";

type IProps = { uri: string };

export const SoundScreen = ({ route }: any) => {
  const { uri } = route.params;
  const navigation = useNavigation();
  const sound = new Audio.Sound();

  async function playSound() {
    await sound.loadAsync({ uri });
    await sound.playAsync();
  }

  async function pauseSound() {
    await sound.unloadAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Sound" />
      <Pressable
        onPress={playSound}
        style={{
          padding: 40,
          alignItems: "center",
          backgroundColor: "red",
          marginBottom: 10,
        }}
      >
        <Text>Play Spund</Text>
      </Pressable>
      <Pressable
        onPress={pauseSound}
        style={{ padding: 40, alignItems: "center", backgroundColor: "blue" }}
      >
        <Text>Pause Spund</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
