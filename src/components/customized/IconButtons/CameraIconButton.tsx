import { Pressable, View, StyleSheet } from "react-native";
import theme from "../../../../assets/styles/theme";

const { error } = theme.lightColors || {};
type IProps = { onPress: () => void; sx?: {}; type?: string };

export const CameraIconButton = ({ onPress, sx, type = "photo" }: IProps) => {
  const backgroundColor = type === "photo" ? "white" : error;

  return (
    <Pressable onPress={onPress} style={sx}>
      <View style={styles.container}>
        <View style={{ margin: 3 }}>
          <View style={{ ...styles.content, backgroundColor }} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { borderWidth: 4, borderColor: "white", borderRadius: 50 },
  content: {
    width: 62.5,
    height: 62.5,
    borderRadius: 50,
  },
});
