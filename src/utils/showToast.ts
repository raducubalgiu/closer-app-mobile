import Toast from "react-native-root-toast";
import { Dimensions } from "react-native";
import theme from "../../assets/styles/theme";

const { width } = Dimensions.get("window");
const { black } = theme.lightColors || {};

type IProps = {
  message: string;
  bgColor?: string;
  short?: boolean;
  position?: any;
};

export const showToast = ({
  message,
  bgColor,
  short = false,
  position,
}: IProps) => {
  return Toast.show(message, {
    duration: short ? Toast.durations.SHORT : Toast.durations.LONG,
    position: position ? position : 50,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    backgroundColor: bgColor ? bgColor : black,
    containerStyle: { width: width - 30 },
    textStyle: { fontSize: 14.5 },
  });
};
