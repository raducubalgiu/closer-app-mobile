import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack, Button } from "../../core";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");
const { primary } = theme.lightColors || {};

type IProps = {
  children: any;
  onNext: () => void;
  headerTitle: string;
  headerDescription: string;
  footerExtraBtns?: any;
  btnTitle: string;
  disabled?: boolean;
};

export const FiltersContainer = ({
  children,
  onNext,
  headerTitle,
  headerDescription,
  footerExtraBtns = false,
  btnTitle,
  disabled = false,
}: IProps) => {
  return (
    <>
      <LinearGradient
        colors={["#fe9934", "#f2f2f2"]}
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 0.5, y: 0.5 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.screen}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <Text style={styles.mainHeading}>{headerTitle}</Text>
              <Text style={styles.mainHeading}>{headerDescription}</Text>
            </View>
            <View style={styles.body}>{children}</View>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <Stack direction="row" sx={styles.footer}>
        {footerExtraBtns}
        <Button
          size="lg"
          onPress={onNext}
          title={btnTitle}
          disabled={disabled}
          sxBtn={{ width: 120 }}
        />
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    //backgroundColor: primary,
    flex: 1,
  },
  header: { height: height / 8, margin: 25 },
  mainHeading: { color: "white", fontSize: 28, fontWeight: "700" },
  body: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  footer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingHorizontal: 15,
    width: "100%",
  },
});
