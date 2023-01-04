import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  View,
  ListRenderItemInfo,
} from "react-native";
import { useCallback } from "react";
import { Header } from "../components/core";
import CardPost from "../components/customized/Cards/CardPost/CardPost";
import { useGet } from "../hooks";
import { useTranslation } from "react-i18next";
import { Post } from "../models/post";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";

const { width, height } = Dimensions.get("window");
type IProps = NativeStackScreenProps<RootStackParams, "Post">;

export const PostScreen = ({ route }: IProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Header title={t("posts")} divider />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: 500,
  },
});
