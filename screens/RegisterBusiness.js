import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { ProgressSteps } from "react-native-progress-steps";
import RegisterBusinessForm from "../components/Forms/RegisterBusinessForm";
import RegisterLocationForm from "../components/Forms/RegisterLocationForm";
import AddServicesForm from "../components/Forms/AddServicesForm";
import { Colors } from "../assets/styles/Colors";
import Header from "../components/customized/Headers/Header";

const RegisterBusiness = (props) => {
  const [step, setStep] = useState(0);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Inregistrare business" />
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
