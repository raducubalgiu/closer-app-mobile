import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Divider, Icon } from "react-native-elements";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../assets/styles/Colors";
import HeaderReusable from "../Headers/HeaderReusable";

const OrderStepper = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ paddingHorizontal: 10 }}>
        <HeaderReusable
          firstBox={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-ios" type="material" size={20} />
            </TouchableOpacity>
          }
          secondBox={
            <Text style={styles.stepHeaderLabel}>{props.headerLabel}</Text>
          }
          thirdBox={
            <Icon
              name="arrow-back-ios"
              type="material"
              color="white"
              size={20}
            />
          }
        />
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        <ProgressSteps
          activeStep={props.activeStep}
          labelColor={Colors.textLight}
          activeLabelColor={Colors.textDark}
          activeStepIconBorderColor={Colors.primary}
          labelFontFamily="Exo-Medium"
          completedStepIconColor={Colors.primary}
          completedProgressBarColor={Colors.primary}
          completedLabelColor={Colors.textDark}
        >
          {props.steps.map((step, i) => (
            <ProgressStep key={i} removeBtnRow={true}>
              {step}
            </ProgressStep>
          ))}
        </ProgressSteps>
      </View>
    </SafeAreaView>
  );
};

export default OrderStepper;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  stepHeaderLabel: { fontFamily: "Exo-Medium", fontSize: 16 },
});
