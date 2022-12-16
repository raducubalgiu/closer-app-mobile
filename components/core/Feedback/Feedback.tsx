import { Dimensions } from "react-native";
import Toast from "react-native-root-toast";
import theme from "../../../assets/styles/theme";

const { black } = theme.lightColors || {};
const { width } = Dimensions.get("window");

type IProps = {
  message: string;
  bgColor?: string;
  short?: boolean;
  position?: number;
};

const Feedback = ({ message, bgColor, short, position }: IProps) => {
  const toast = Toast.show(message, {
    duration: short ? Toast.durations.SHORT : Toast.durations.LONG,
    position: position ? position : 50,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    backgroundColor: bgColor ? bgColor : black,
    containerStyle: { width: width - 30 },
  });

  return toast;
};

export default Feedback;
