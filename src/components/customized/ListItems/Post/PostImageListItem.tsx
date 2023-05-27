import { StyleSheet, View } from "react-native";
import { memo, useRef, useMemo, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostHeader from "./sections/PostHeader";
import PostImage from "./sections/PostImage";
import PostBookable from "./sections/PostBookable";
import PostActions from "./sections/PostActions";
import PostDescription from "./sections/PostDescription";
import { RootStackParams } from "../../../../navigation/rootStackParams";
import { useAuth, useDelete } from "../../../../hooks";
import ConfirmModal from "../../Modals/ConfirmModal";
import { PostInfoSheet } from "../../Sheets/PostInfoSheet";
import { Post } from "../../../../ts";
import { fromNow } from "../../../../utils/date-utils";
import { SheetModal } from "../../../core";

type IProps = {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  isVisible: boolean;
  onDelete: () => void;
};

const PostImageListItem = ({
  post,
  isLiked,
  isBookmarked,
  isVisible,
  onDelete,
}: IProps) => {
  const { user } = useAuth();
  const { id, userId, bookable, images, product, serviceId } = post;
  const { createdAt, description, postType } = post;
  const { viewsCount, likesCount, commentsCount, bookmarksCount } = post;
  const { avatar, username, checkmark, settings } = userId;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [1, 250], []);
  const [visibleModal, setVisibleModal] = useState(false);
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
      <PostHeader
        avatar={avatar}
        username={username}
        checkmark={checkmark}
        postType={postType}
        onOpenSheet={() => sheetRef.current?.present()}
      />
      <PostImage id={post.id} uri={images[0]?.url} />
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
};

export default memo(PostImageListItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
