import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Divider, Icon } from "react-native-elements";
import HeaderReusable from "../components/Headers/HeaderReusable";
import { Colors } from "../assets/styles/Colors";
import { ProgressSteps } from "react-native-progress-steps";
import { useNavigation } from "@react-navigation/native";
import RegisterBusinessForm from "../components/Forms/RegisterBusinessForm";
import RegisterLocationForm from "../components/Forms/RegisterLocationForm";
import AddServicesForm from "../components/Forms/AddServicesForm";

const RegisterBusiness = () => {
  const [step, setStep] = useState(0);
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
            <Text style={{ fontFamily: "Exo-Medium", fontSize: 16 }}>
              Inregistrare Business
            </Text>
          }
          thirdBox={
            <Icon name="arrow-back-ios" type="material" color="white" />
          }
        />
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        <ProgressSteps
          activeStep={step}
          labelColor={Colors.textLight}
          activeLabelColor={Colors.textDark}
          activeStepIconBorderColor={Colors.primary}
          labelFontFamily="Exo-Medium"
          completedStepIconColor={Colors.primary}
          completedProgressBarColor={Colors.primary}
          completedLabelColor={Colors.textDark}
          nextButtonStyle={{ backgroundColor: Colors.primary }}
        >
          <RegisterBusinessForm onUpdateStep={() => setStep(1)} />
          <RegisterLocationForm onUpdateStep={() => setStep(2)} />
          <AddServicesForm />
        </ProgressSteps>
      </View>
    </SafeAreaView>
  );
};

export default RegisterBusiness;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
