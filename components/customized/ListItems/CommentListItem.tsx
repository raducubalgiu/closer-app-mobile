import { useState } from "react";
import { DisplayComment } from "./DisplayComment";
import { useGetMutate } from "../../../hooks";
import { RelatedComments } from "../../../models/relatedComments";

type IProps = {
  item: any;
  onReply: () => void;
  creatorId: string;
};

export const CommentListItem = ({ item, onReply, creatorId }: IProps) => {
  const [relatedComments, setRelatedComments] = useState<RelatedComments[]>([]);

  const { mutate, isLoading } = useGetMutate({
    uri: `/comments/${item?._id}/related-comments?page=0&limit=20`,
    onSuccess: (res) => setRelatedComments(res.data.data),
  });

  return (
    <DisplayComment
      item={item}
      creatorId={creatorId}
      onReply={onReply}
      onHandleRelated={mutate}
      relatedComments={relatedComments}
      loadingRelated={isLoading}
    />
  );
};
