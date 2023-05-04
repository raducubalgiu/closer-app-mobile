import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Heading, Stack } from "../../core";
import HeaderSheet from "../Layout/Headers/HeaderSheet";
import { Icon, Slider } from "@rneui/themed";
import theme from "../../../../assets/styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigation/rootStackParams";
import { CameraType } from "expo-camera";

const { grey0, black, primary } = theme.lightColors || {};

type IProps = { onClose: () => void; cameraType: CameraType };

export const CameraTimerSheet = ({ onClose, cameraType }: IProps) => {
  const [sequence, setSequence] = useState(30);
  const [counter, setCounter] = useState(3);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const navigateToTimer = () => {
    onClose();
    navigation.navigate("CameraTimer", { counter, sequence, cameraType });
  };

  return (
    <View style={styles.container}>
      <HeaderSheet title="Cronometru" onClose={onClose} />
      <View style={{ padding: 15, justifyContent: "space-between", flex: 1 }}>
        <View>
          <Stack direction="row">
            <Stack direction="row">
              <Text style={{ color: "#bbb", fontSize: 15 }}>0.0s</Text>
              <Icon
                name="arrow-right"
                style={{ marginHorizontal: 15 }}
                color={black}
              />
              <Text style={{ fontSize: 15, color: black, fontWeight: "500" }}>
                {sequence.toFixed(1)}s
              </Text>
            </Stack>
            <Pressable
              onPress={() => setCounter((counter) => (counter === 3 ? 10 : 3))}
            >
              <Stack
                justify="center"
                direction="row"
                sx={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 5,
                  width: 80,
                  height: 35,
                }}
              >
                <Icon
                  name="timer"
                  type="material-community"
                  size={20}
                  color="#bbb"
                />
                <Text
                  style={{ color: black, fontWeight: "700", marginLeft: 5 }}
                >
                  {counter}s
                </Text>
              </Stack>
            </Pressable>
          </Stack>
          <Slider
            value={sequence}
            minimumValue={0.1}
            maximumValue={30}
            step={0.1}
            onValueChange={(value) => setSequence(value)}
            trackStyle={{
              height: 50,
              backgroundColor: "transparent",
            }}
            thumbStyle={{
              height: 50,
              width: 7.5,
              backgroundColor: primary,
              borderRadius: 0,
            }}
            maximumTrackTintColor="#eee"
            minimumTrackTintColor="#d9d9d9"
            style={{ marginVertical: 30 }}
            allowTouchTrack={true}
          />
          <Text
            style={{ color: grey0, marginVertical: 10, textAlign: "center" }}
          >
            {t("slideForSelectSequenceDuration")}
          </Text>
        </View>
        <Button
          title={t("setDuration")}
          onPress={navigateToTimer}
          sxBtn={{ marginBottom: insets.bottom }}
        />
      </View>
    </View>
  );
};

export default CameraTimerSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
