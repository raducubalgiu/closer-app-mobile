import { StyleSheet } from "react-native";
import React from "react";
import OrderStepper from "../components/customized/Steppers/OrderStepper";
import RegisterUser from "../components/Forms/Order/RegisterUser";
import AddBusinessDetails from "../components/Forms/Order/AddBusinessDetails";
import AddBusinessAddress from "../components/Forms/Order/AddBusinessAddress";
import AddServices from "../components/Forms/Order/AddServices";

const steps = [
  <RegisterUser />,
  <AddBusinessDetails />,
  <AddBusinessAddress />,
  <AddServices />,
];

const OrderScreen = (props) => {
  const { activeStep, headerLabel } = props.route.params;

  return (
    <OrderStepper
      steps={steps}
      activeStep={activeStep}
      headerLabel={headerLabel}
    />
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
