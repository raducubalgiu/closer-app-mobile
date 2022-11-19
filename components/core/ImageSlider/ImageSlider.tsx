import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { Image } from "@rneui/themed";
import { IconBackButton } from "../IconButton/IconBackButton";

const viewConfigRef = { viewAreaCoveragePercentThreshold: 95 };

export const ImageSlider = ({
  images,
  height,
  width,
  withCounter,
  withBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<any>();

  const onViewRef = useRef(({ changed }) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const renderImages = ({ item }) => (
    <TouchableWithoutFeedback>
      <Image source={{ uri: item.url }} containerStyle={{ height, width }} />
    </TouchableWithoutFeedback>
  );

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        ref={(rf) => (ref.current = rf)}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
      />
      {withBack && <IconBackButton sx={styles.backBtn} />}
      {withCounter && (
        <View style={styles.dotsView}>
          <Text style={styles.counter}>
            {currentIndex + 1} / {images?.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotsView: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12.5,
    borderRadius: 5,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  counter: {
    color: "white",
    fontSize: 13,
  },
});
