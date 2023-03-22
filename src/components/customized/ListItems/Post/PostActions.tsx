import { StyleSheet, Text, Pressable, Share } from "react-native";
import { memo, useMemo, useRef } from "react";
import { Icon, Divider } from "@rneui/themed";
import {
  Stack,
  LikeButton,
  BookmarkIconButton,
  ShareIButton,
  SheetModal,
} from "../../../core";
import theme from "../../../../../assets/styles/theme";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import PostStats from "../../Sheets/PostStats";

const { black } = theme.lightColors || {};
type IProps = {
  postId: string;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  images: any;
  counters: {
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    bookmarksCount: number;
  };
  postType: string;
};

const PostActions = ({
  likesCount,
  postId,
  isLiked,
  isBookmarked,
  images,
  counters,
  postType,
}: IProps) => {
  const { t } = useTranslation("common");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 400], []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Trimite catre",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error?.message);
    }
  };

  const goToLikes = () => {
    navigation.navigate("Likes", { postId });
  };

  return (
    <>
      <Divider color="#ddd" style={styles.divider} />
      <Stack direction="row" sx={styles.container}>
        <Pressable onPress={goToLikes}>
          <Stack direction="row">
            <Text style={styles.likesCount}>
              {likesCount} {t("likes")}
            </Text>
          </Stack>
        </Pressable>
        <Stack direction="row">
          <LikeButton
            model="posts"
            modelId={postId}
            isLiked={isLiked}
            onAddLike={() => {}}
            onRemoveLike={() => {}}
            sx={styles.button}
          />
          <BookmarkIconButton
            isBookmarked={isBookmarked}
            type="posts"
            typeId={postId}
            sx={styles.button}
          />
          <ShareIButton onPress={onShare} sx={styles.button} />
          <Pressable
            style={{ paddingLeft: 15, paddingVertical: 5 }}
            onPress={() => sheetRef.current?.present()}
          >
            <Icon name="bar-chart" type="feather" />
          </Pressable>
        </Stack>
      </Stack>
      <Divider color="#ddd" style={styles.divider} />
      <SheetModal
        ref={sheetRef}
        snapPoints={snapPoints}
        animationConfig={{ duration: 150 }}
        showIndicator={false}
        enableContentPanningGesture={false}
      >
        <PostStats
          images={images}
          onClose={() => sheetRef.current?.close()}
          counters={counters}
          postType={postType}
        />
      </SheetModal>
    </>
  );
};

export default memo(PostActions);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, paddingVertical: 2.5 },
  likesCount: {
    color: black,
    fontWeight: "bold",
    textTransform: "lowercase",
    marginLeft: 2.5,
  },
  button: { marginLeft: 15 },
  divider: { marginHorizontal: 15 },
});
