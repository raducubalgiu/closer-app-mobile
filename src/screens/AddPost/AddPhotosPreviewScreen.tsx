import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
  Pressable,
  Text,
} from "react-native";
import React, { useState } from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Button, Stack } from "../../components/core";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

type IProps = NativeStackScreenProps<RootStackParams, "AddPhotosPreview">;

export const AddPhotosPreviewScreen = ({ route }: IProps) => {
  const { uri } = route.params.photo;
  const { resizeMode } = route.params;
  const [resize, setResize] = useState(resizeMode);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={{ uri }} style={styles.image} resizeMode={resize} />
          <View style={StyleSheet.absoluteFill}>
            <Stack direction="row" sx={{ paddingVertical: 10 }}>
              <Pressable
                style={{ padding: 15 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back-ios" size={22.5} color="white" />
              </Pressable>
              <View style={{ padding: 15 }}>
                <Text style={{ color: "white" }}>Hello</Text>
              </View>
            </Stack>
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title={t("next")}
            onPress={() =>
              navigation.navigate("AddPost", {
                photo: route.params.photo,
                taggedUsers: [],
              })
            }
            sxBtn={{ width: width - 30 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageBox: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  image: {
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
