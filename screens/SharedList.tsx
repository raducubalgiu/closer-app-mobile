import {
  Image,
  FlatList,
  Dimensions,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useGetPaginate } from "../hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../models/navigation/rootStackParams";
import { Header } from "../components/core";
import { MasonryFlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const SharedList = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useGetPaginate({
    model: "allPosts",
    uri: `/posts/get-all-posts`,
    limit: "20",
  });

  const { pages } = data || {};
  const allPosts = pages?.map((page) => page.results).flat();
  const [opacity, setOpacity] = useState(1);

  const styles = StyleSheet.create({
    container: {
      width: width / 3,
      height: width / 3,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      width: undefined,
      height: undefined,
      resizeMode: "cover",
      opacity,
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    }, [])
  );

  const renderPost = useCallback(({ item, index }) => {
    const { orientation } = item;

    return (
      <Pressable
        style={{
          height: orientation === "portrait" ? width / 1.5 : width / 3,
          width: width / 3,
          paddingBottom: 1.5,
          paddingLeft: index % 3 !== 0 ? 1.5 : 0,
        }}
        onPress={() => {
          setOpacity(0);
          navigation.push("SharedDetail", { item, allPosts, index });
        }}
      >
        <SharedElement id={item._id} style={{ flex: 1 }}>
          <Image
            source={{ uri: item.images[0].url }}
            style={styles.image}
            resizeMode="cover"
          />
        </SharedElement>
      </Pressable>
    );
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ paddingBottom: -insets.bottom }}>
        <Header title="Posts List" />
      </SafeAreaView>
      <MasonryFlashList
        data={allPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item._id}
        numColumns={3}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
