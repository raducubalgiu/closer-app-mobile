import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import theme from "../../../assets/styles/theme";
import { Stack, Button } from "../../core";

const { height } = Dimensions.get("window");
const { primary } = theme.lightColors || {};

type IProps = {
  children: any;
  onNext: () => void;
  headerTitle: string;
  headerDescription: string;
  footerExtraBtns?: boolean;
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
      <SafeAreaView style={styles.screen}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.mainHeading}>{headerTitle}</Text>
            <Text style={styles.mainHeading}>{headerDescription}</Text>
          </View>
          <View style={styles.body}>{children}</View>
        </View>
      </SafeAreaView>
      <Stack direction="row" sx={styles.footer}>
        {footerExtraBtns}
        <Button
          size="lg"
          onPress={onNext}
          title={btnTitle}
          disabled={disabled}
        />
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: primary,
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
