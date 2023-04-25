import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/rootStackParams";
import { Button, IconBackButton } from "../../components/core";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

type IProps = NativeStackScreenProps<RootStackParams, "AddPhotosPreview">;

export const AddPhotosPreviewScreen = ({ route }: IProps) => {
  const { uri } = route.params.photo;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={{ uri }} style={styles.image} resizeMode="contain" />
          <View style={StyleSheet.absoluteFill}>
            <View style={{ left: 0 }}>
              <IconBackButton />
            </View>
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
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
