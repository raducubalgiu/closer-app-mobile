import { useCallback, useState } from "react";
import DisplayComment from "./DisplayComment";
import { useGetMutate } from "../../../hooks";
import { RelatedComments } from "../../../ts";

type IProps = {
  item: any;
  onReply: (text: string, commentId: string) => void;
  creatorId: string;
};

export const CommentListItem = ({ item, onReply, creatorId }: IProps) => {
  const [relatedComments, setRelatedComments] = useState<RelatedComments[]>([]);

  const { mutate, isLoading } = useGetMutate({
    uri: `/comments/${item.id}/related-comments?page=1&limit=5`,
    onSuccess: (res) => {
      setRelatedComments(res.data.results);
    },
  });

  return (
    <DisplayComment
      item={item}
      creatorId={creatorId}
      onReply={onReply}
      onHandleRelated={useCallback(() => mutate(), [])}
      relatedComments={relatedComments}
      loadingRelated={isLoading}
    />
  );
};
