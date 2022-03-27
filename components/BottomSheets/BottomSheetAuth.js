import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Divider, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../assets/styles/Colors";
import LoginForm from "../Forms/LoginForm";

const BottomSheetAuth = (props) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["15%", "90%"], []);
  const [open, setOpen] = useState(false);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
      />
    ),
    []
  );

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    setOpen(false);
  };

  useEffect(() => {
    handlePresentModalPress();
  });

  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={styles.indicatorStyle}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClosePress}>
                <Icon
                  name="close"
                  type="antdesign"
                  size={20}
                  color={Colors.textDark}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Conectează-te</Text>
              <Icon name="close" type="antdesign" color="white" size={20} />
            </View>
            <Divider />
            <LoginForm />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  indicatorStyle: {
    backgroundColor: "#ddd",
    width: 45,
    height: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: "Exo-SemiBold",
    fontSize: 17,
    color: Colors.textDark,
  },
});

export default BottomSheetAuth;
