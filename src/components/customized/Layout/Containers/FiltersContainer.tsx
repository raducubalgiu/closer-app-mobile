import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../../../../assets/styles/theme";
import { Icon } from "@rneui/themed";
import { Stack, Button, IconBackButton, IconButton } from "../../../core";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");
const { grey0, black } = theme.lightColors || {};

type IProps = {
  children: any;
  onNext: () => void;
  mainHeading: string;
  secondHeading: string;
  headerTitle: string;
  headerDescription: any;
  footerExtraBtns?: any;
  btnTitle: string;
  disabled?: boolean;
  loading?: boolean;
  closeBtn?: boolean;
};

export const FiltersContainer = ({
  children,
  onNext,
  mainHeading,
  secondHeading,
  headerTitle,
  headerDescription,
  footerExtraBtns = false,
  btnTitle,
  disabled = false,
  loading = false,
  closeBtn = false,
}: IProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
              <Text style={styles.mainHeading}>{mainHeading}</Text>
              <Text style={styles.mainHeading}>{secondHeading}</Text>
            </View>
            <View style={styles.body}>
              <Stack direction="row" justify="center" sx={styles.sheetOverview}>
                {!closeBtn && <IconBackButton size={20} />}
                <Stack sx={{ flex: 1 }}>
                  <Text style={styles.title}>{headerTitle}</Text>
                  <Text style={styles.description}>{headerDescription}</Text>
                </Stack>
                {!closeBtn && (
                  <Icon name="chevron-back" type="ionicon" color="white" />
                )}
              </Stack>
              {children}
            </View>
          </View>
          {closeBtn && (
            <View style={{ ...styles.closeBtn, top: insets.top + 10 }}>
              <IconButton
                name="close"
                type="ionicon"
                color={black}
                size={20}
                onPress={() => navigation.goBack()}
              />
            </View>
          )}
        </SafeAreaView>
      </LinearGradient>
      <Stack
        direction="row"
        sx={styles.footer}
        justify={!footerExtraBtns ? "end" : "between"}
      >
        {footerExtraBtns}
        <Button
          size="lg"
          onPress={onNext}
          title={btnTitle}
          disabled={disabled}
          loading={loading}
          sxBtn={{
            width: footerExtraBtns ? 120 : "100%",
          }}
        />
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { height: height / 8, margin: 25 },
  mainHeading: { color: "white", fontSize: 28, fontWeight: "700" },
  body: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  sheetOverview: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: grey0,
    marginTop: 5,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 15,
    fontWeight: "500",
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
  closeBtn: {
    position: "absolute",
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 2.5,
  },
});
