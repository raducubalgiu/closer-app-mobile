import { StyleSheet, Text, View } from "react-native";
import { Skeleton } from "@rneui/themed";
import { Stack } from "../../core";

type IProps = { width: number };

export const VideoDetailsSkeleton = ({ width }: IProps) => {
  return (
    <Stack direction="row" sx={styles.content}>
      <Stack sx={{ flex: 1, width: "100%" }}>
        <Stack direction="row" align="start" sx={styles.userDetails}>
          <Stack direction="row">
            <Stack direction="row">
              <Stack align="start">
                <Stack direction="row">
                  <Skeleton circle width={20} height={10} animation="wave" />
                  <Skeleton
                    width={120}
                    height={10}
                    style={{ marginLeft: 7.5, backgroundColor: "#ddd" }}
                    animation="wave"
                  />
                </Stack>
                <Skeleton
                  width={150}
                  height={10}
                  style={{ marginTop: 7.5, backgroundColor: "#ddd" }}
                  animation="wave"
                />
              </Stack>
            </Stack>
          </Stack>
          <Skeleton width={175} height={30} animation="wave" />
        </Stack>
        <Stack align="start">
          <Skeleton
            width={width - 30}
            height={10}
            style={{ marginTop: 7.5, backgroundColor: "#ddd" }}
            animation="wave"
          />
          <Skeleton
            width={width / 2}
            height={10}
            style={{ marginTop: 7.5, backgroundColor: "#ddd" }}
            animation="wave"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    padding: 15,
  },
  userDetails: {
    width: "100%",
    marginBottom: 7.5,
    height: 50,
  },
  skeleton: { backgroundColor: "red" },
});
