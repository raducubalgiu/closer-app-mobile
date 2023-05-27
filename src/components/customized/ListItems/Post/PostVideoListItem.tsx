import { StyleSheet, View } from "react-native";
import {
  memo,
  useRef,
  useMemo,
  useState,
  forwardRef,
  ForwardedRef,
} from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Post } from "../../../../ts";
import { fromNow } from "../../../../utils/date-utils";
import PostHeader from "./sections/PostHeader";
import PostBookable from "./sections/PostBookable";
import PostActions from "./sections/PostActions";
import PostDescription from "./sections/PostDescription";
import PostVideo from "./sections/PostVideo";
import ConfirmModal from "../../Modals/ConfirmModal";
import { SheetModal } from "../../../core";
import { PostInfoSheet } from "../../Sheets/PostInfoSheet";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { useAuth, useDelete } from "../../../../hooks";
import { Video } from "expo-av";

type IProps = {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  isVisible: boolean;
  onDelete: () => void;
};

const PostVideoListItem = forwardRef(
  (
    { post, isLiked, isBookmarked, isVisible, onDelete }: IProps,
    ref: ForwardedRef<Video>
  ) => {
    const { user } = useAuth();
    const { id, userId, bookable, images, product, serviceId } = post;
    const { createdAt, description, postType } = post;
    const { viewsCount, likesCount, commentsCount, bookmarksCount } = post;
    const { avatar, username, name, checkmark, settings } = userId;
    const sheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => [1, 250], []);
    const [visibleModal, setVisibleModal] = useState(false);
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const { t } = useTranslation("common");

    const goToComments = () => navigation.navigate("Comments", { post });

    const { mutate } = useDelete({
      uri: `/users/${user?.id}/posts/${id}`,
      onSuccess: () => {
        setVisibleModal(false);
        onDelete();
      },
    });

    return (
      <View style={styles.container}>
        <View>
          <PostVideo uri={images[0]?.url} isVisible={isVisible} />
          <View style={styles.header}>
            <PostHeader
              avatar={avatar}
              username={username}
              checkmark={checkmark}
              postType={postType}
              onOpenSheet={() => sheetRef.current?.present()}
            />
          </View>
        </View>
        {bookable !== "none" && (
          <PostBookable
            product={product}
            isVisible={isVisible}
            expirationTime={post.expirationTime}
            serviceId={serviceId}
            ownerId={post.userId}
          />
        )}
        <PostActions
          postId={id}
          likesCount={likesCount}
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          images={images}
          counters={{ viewsCount, likesCount, commentsCount, bookmarksCount }}
          postType={postType}
          settings={settings}
          userId={userId.id}
        />
        <PostDescription
          description={description}
          date={fromNow(createdAt)}
          onGoToComments={goToComments}
        />
        <ConfirmModal
          visible={visibleModal}
          onClose={() => setVisibleModal(false)}
          title={t("deletePost")}
          description={t("deletePostDescription")}
          action={t("delete")}
          onAction={mutate}
        />
        <SheetModal ref={sheetRef} snapPoints={snapPoints}>
          <PostInfoSheet
            onDelete={() => {
              sheetRef.current?.close();
              setVisibleModal(true);
            }}
          />
        </SheetModal>
      </View>
    );
  }
);

export default memo(PostVideoListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: { position: "absolute", top: 0, left: 0, right: 0 },
});
